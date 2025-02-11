"use client"
import React, { useEffect, useRef, useState } from "react";
import BarcodeReader from "react-barcode-reader";
import { NutrientData } from "../interface/NutritionData";
import { postBarCode } from "../services/api";

export function ButtonLerCodigo() {
  const [barcode, setBarcode] = useState('');
  const [nutritionData, setNutritionData] = useState<NutrientData | null>(null);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    if (barcode) {
      postBarCode(barcode)
        .then((data: NutrientData) => {
          setNutritionData(data);
        })
        .catch((err) => {
          setError(err.message);
        });
    }
  }, [barcode]);

  return (
    <div className="text-center">
      <button
        className="ml-2 bg-green-100 py-3 px-6 mt-5 z-10 rounded font-semibold text-base w-24 hover:bg-green-600 hover:text-white active:bg-green-900"
        onClick={() => setBarcode('')}
      >
        Ler Código
      </button>

      <BarcodeReader
        onError={(err: any) => setError(err.message)}
        onScan={(data: string) => setBarcode(data)}
      />

      {error && <p className="text-red-600">{error}</p>}

      {nutritionData && (
        <div>
          <h2>Valores Nutricionais:</h2>
          <p>Calorias: {nutritionData.dados.calorias}</p>
          <p>Prote nas: {nutritionData.dados.proteinas}</p>
          <p>Carboidratos: {nutritionData.dados.carboidratos}</p>
        </div>
      )}
    </div>
  );
}
