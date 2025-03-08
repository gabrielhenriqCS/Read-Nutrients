"use client";
import React, { useEffect, useState } from "react";
import { NutritionConsults } from "@/app/services/api";
import { NutrientData } from "../interface/NutritionData";

export function ButtonLerCodigo() {
  const [barcode, setBarcode] = useState<string>(""); 
  const [nutritionData, setNutritionData] = useState<NutrientData | null>(null); 
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!barcode.trim()) return; // Ignora se o código de barras estiver vazio

    const fetchData = async () => {
      setLoading(true);
      setError(null);
      setNutritionData(null); // Limpa dados anteriores

      try {
        const response = await NutritionConsults.CriarConsulta(barcode.trim());
        const data = response.data; // Extrai os dados da resposta da API

        if (!data || Object.keys(data).length === 0) {
          setError("Nenhum alimento encontrado.");
        } else {
          setNutritionData(data);
        }
      } catch {
          setError("Erro ao buscar os dados. Verifique o código de barras.");
        setLoading(false);
      }
    };

    const timeout = setTimeout(fetchData, 500); // Debounce de 500ms

    return () => clearTimeout(timeout); // Limpa timeout ao mudar o código de barras
  }, [barcode]);

  const handleLerCodigo = () => {
    if (!barcode.trim()) {
      setError("Por favor, insira um código de barras válido.");
      return;
    }
    setBarcode(barcode.trim()); // Atualiza o estado com o código de barras sem espaços
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-[35px] font-bold mb-8">Consultar Nutrientes</h1>

      <input
        type="text"
        value={barcode}
        onChange={(e) => setBarcode(e.target.value)}
        placeholder="Digite o código de barras..."
        className="bg-gray-60 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-72 p-1.5 md:w-96 md:p-3 shadow-lg shadow-black-60/6"
      />

      <button
        className="ml-2 bg-green-100 py-3 px-1 md:py-3 md:px-9 md:flex md:items-center mt-5 z-10 rounded font-semibold text-base w-30 hover:bg-green-600 hover:text-white active:bg-green-900 shadow-lg shadow-black-60/6 disabled:opacity-50"
        onClick={handleLerCodigo}
        disabled={loading || !barcode.trim()} // Desabilita o botão durante o carregamento ou se o código de barras estiver vazio
      >
        {loading ? "Buscando..." : "Ler Código"}
      </button>

      {loading && <span className="loading loading-spinner loading-lg mt-4"></span>}

      {error && (
        <p className="text-red-600 bg-red-200 p-2 rounded mt-4 font-bold">
          {error}
        </p>
      )}

      {nutritionData && (
        <div className="mt-4 bg-gray-100 p-4 rounded-lg shadow w-72 md:w-96">
          <h2 className="font-semibold text-lg mb-2">Valores Nutricionais:</h2>
          <p>Calorias: {nutritionData.dados.calorias || "N/A"} kcal</p>
          <p>Proteínas: {nutritionData.dados.proteinas || "N/A"} g</p>
          <p>Carboidratos: {nutritionData.dados.carboidratos || "N/A"} g</p>
          <p>Gorduras: {nutritionData.dados.gorduras || "N/A"} g</p>
          <p>Fibras: {nutritionData.dados.fibras || "N/A"} g</p>
        </div>
      )}
    </div>
  );
}