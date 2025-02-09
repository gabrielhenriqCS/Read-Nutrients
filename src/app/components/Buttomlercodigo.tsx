"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import BarcodeReader from "react-barcode-reader";
import { NutrientData } from "../interface/NutritionData";

export function ButtomLerCodigo() {
  const [barcode, setBarcode] = useState('');
  const previousBarcodeRef = useRef('');
  const [nutrition, setNutrition] = useState<NutrientData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const barcodeReaderRef = useRef<typeof BarcodeReader>(null);

  const handleScan = (data: string) => {
    setBarcode(data);
  };

  const handleError = (err: any) => {
    setError('Erro ao ler o código de barras.');
    console.error(err);
  };

  const fetchNutritionData = async (barcode: string) => {
    try {
      const response = await fetch('/home/consultarnutrientes/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ barcode }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erro na requisição.');
      }

      const data: { data: NutrientData } = await response.json(); 
      setNutrition(data.data);
      setError(null);
    } catch (error: any) {
      setError(error.message);
      console.error(error);
    } finally {
      setBarcode('');
      previousBarcodeRef.current = '';
    }
  };

  useEffect(() => {
    if (barcode && barcode !== previousBarcodeRef.current) {
      fetchNutritionData(barcode);
      previousBarcodeRef.current = barcode;
    }
  }, [barcode]); // Executa o efeito quando o barcode mudar

  const handleButtonClick = useCallback(() => {
    barcodeReaderRef.current.open();
  }, [])
  return (
    <div className="text-center">
      <button className="ml-2 bg-green-100 py-3 px-6 mt-5 z-10 rounded font-semibold text-base w-24 hover:bg-green-600 hover:text-white active:bg-green-900" onClick={handleButtonClick}>Ler Código</button> 

      <BarcodeReader
        ref={barcodeReaderRef}
        onError={handleError}
        onScan={handleScan}
      />
      {error && <p className="text-red-600">{error}</p>}

      {nutrition && (
        <div>
          <h2>Valores Nutricionais:</h2>
          <p>Nome: {nutrition.titulo}</p>
          <p>Calorias: {nutrition.dados.calorias}</p>
          <p>Proteínas: {nutrition.dados.proteinas}</p>
          <p>Carboidratos: {nutrition.dados.carboidratos}</p>
          <p>Gorduras: {nutrition.dados.gorduras}</p>
          <p>Fibras: {nutrition.dados.fibras}</p>
        </div>
      )}
    </div>
  );
}
