"use client"
import React, { useEffect, useRef, useState } from "react";
import BarcodeReader from "react-barcode-reader";
import { NutrientData } from "../interface/NutritionData";
import { postBarCode } from "../services/api";

export function ButtomLerCodigo() {
    const [barcode, setBarcode] = useState('');
    const previousBarcodeRef = useRef('');
    const [nutrition, setNutrition] = useState<NutrientData | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (barcode && barcode !== previousBarcodeRef.current) {
            previousBarcodeRef.current = barcode;
            postBarCode(barcode)
                .then((data: NutrientData) => {
                    setNutrition(data);
                    setError(null);
                })
                .catch((err) => {
                    setError(err.message);
                    console.error(err);
                });
        }
    }, [barcode]);

    return (
        <div className="text-center">
            <button className="ml-2 bg-green-100 py-3 px-6 mt-5 z-10 rounded font-semibold text-base w-24 hover:bg-green-600 hover:text-white active:bg-green-900">
                Ler Código
            </button>

            <BarcodeReader
                onError={(err: any) => setError(err.message)}
                onScan={(data: string) => setBarcode(data)}
            />
            {error && <p className="text-red-600">{error}</p>}

            {nutrition && (
                <div>
                    <h2>Valores Nutricionais:</h2>
                    <p>Titulo: {nutrition.titulo}</p>
                    <p>Calorias: {nutrition.dados.calorias}</p>
                    <p>Proteínas: {nutrition.dados.proteinas}</p>
                    <p>Carboidratos: {nutrition.dados.carboidratos}</p>
                </div>
            )}
        </div>
    );
}
