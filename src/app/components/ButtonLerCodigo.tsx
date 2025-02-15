"use client";
import React, { useEffect, useState } from "react";
import BarcodeReader from "react-barcode-reader";
import { NutrientData } from "@/app/interface/NutritionData";
import { postBarCode } from "@/app/services/api";

export function ButtonLerCodigo() {
    const [barcode, setBarcode] = useState("");
    const [nutritionData, setNutritionData] = useState<NutrientData | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [isScanning, setIsScanning] = useState(false);

    useEffect(() => {
        if (!barcode) return;
    
        setLoading(true);
        setError(null);
    
        const timeout = setTimeout(async () => {
            try {
                const data = await postBarCode(barcode);
                setNutritionData(data);
            } catch (err: unknown) {
                console.error("Erro na requisição:", err);
                setError(err instanceof Error ? err.message : "Erro desconhecido.");
            } finally {
                setLoading(false);
            }
        }, 500); 
    
        return () => clearTimeout(timeout); 
    }, [barcode]);

    const handleButtonClick = () => {
        setIsScanning(true);
        setBarcode("");
        setNutritionData(null);
        setError(null);
    };

    const handleScan = (data: string) => {
        setIsScanning(false);
        setBarcode(data);
    };

    const handleScanError = (err: unknown) => {
        console.error("Erro ao ler o código de barras:", err);
        setError(err instanceof Error ? `Erro no escaner: ${err.message}` : "Erro desconhecido no escaner.");
    };

    return (
        <div className="flex flex-col items-center">
            <h1 className="text-[35px] font-bold mb-8">Consultar Nutrientes</h1>
            
            <input
                type="text"
                value={barcode}
                onChange={(e) => setBarcode(e.target.value)}
                className="bg-gray-60 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-72 p-1.5 md:w-96 md:p-3 shadow-lg shadow-black-60/6"
            />
            
            <button
                className="ml-2 bg-green-100 py-3 px-1 md:py-3 md:px-6 mt-5 z-10 rounded font-semibold text-base w-24 hover:bg-green-600 hover:text-white active:bg-green-900 shadow-lg shadow-black-60/6"
                onClick={handleButtonClick}
            >
                Ler Código
            </button>

            {isScanning && <><BarcodeReader onScan={handleScan} onError={handleScanError} /></>}

            {loading && <span className="loading loading-spinner loading-lg"></span>}

            {error && <p className="font-bold z-10 text-md text-red-600 bg-red-200 p-2 rounded">{error}</p>}

            {nutritionData?.dados && (
                <div className="mt-4 bg-gray-100 p-4 rounded-lg shadow">
                    <h2 className="font-semibold text-lg">Valores Nutricionais:</h2>
                    <p>Calorias: {nutritionData.dados.calorias || "N/A"}</p>
                    <p>Proteínas: {nutritionData.dados.proteinas || "N/A"}</p>
                    <p>Carboidratos: {nutritionData.dados.carboidratos || "N/A"}</p>
                    <p>Gorduras: {nutritionData.dados.gorduras || "N/A"}</p>
                    <p>Fibras: {nutritionData.dados.fibras || "N/A"}</p>
                </div>
            )}
        </div>
    );
}
