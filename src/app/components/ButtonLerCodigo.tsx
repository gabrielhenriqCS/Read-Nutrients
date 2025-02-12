"use client";
import React, { useEffect, useState } from "react";
import BarcodeReader from "react-barcode-reader";
import { NutrientData } from "../interface/NutritionData";
import { postBarCode } from "../services/api";

export function ButtonLerCodigo() {
    const [barcode, setBarcode] = useState("");
    const [nutritionData, setNutritionData] = useState<NutrientData | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [isScanning, setIsScanning] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            if (barcode) {
                setLoading(true);
                setError(null);
                try {
                    const data = await postBarCode(barcode);
                    setNutritionData(data);
                } catch (err: unknown) {
                    console.error("Erro na requisição:", err);
                    if (err instanceof Error) {
                        setError(err.message);
                    } else if (typeof err === "string") {
                        setError(err);
                    } else {
                        setError("Erro desconhecido na requisição.");
                    }
                } finally {
                    setLoading(false);
                }
            } else {
                setNutritionData(null);
            }
        };

        fetchData();
    }, [barcode]);

    const handleButtonClick = () => {
        setIsScanning(true);
        setBarcode("");
        setNutritionData(null);
        setError(null);
        setLoading(false);
    };

    const handleScan = (data: string) => {
        setBarcode(data);
        setIsScanning(false);
        setLoading(true);
    };

    return (
        <div className="flex flex-col items-center">
            <input
                type="text"
                value={barcode}
                onChange={(e) => setBarcode(e.target.value)}
                className="bg-gray-60 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-96 p-3 shadow-lg shadow-black-60/6"
            />
            <button
                className="ml-2 bg-green-100 py-3 px-6 mt-5 z-10 rounded font-semibold text-base w-24 hover:bg-green-600 hover:text-white active:bg-green-900 shadow-lg shadow-black-60/6"
                onClick={handleButtonClick}
            >
                Ler Código
            </button>

            {isScanning && (
                <BarcodeReader
                    onScan={handleScan}
                    onError={(err: unknown) => {
                        console.error("Erro ao ler o código de barras:", err);
                        if (err instanceof Error) {
                            setError(`Erro no escaner: ${err.message}`);
                        } else if (typeof err === "string") {
                            setError(`Erro no escaner: ${err}`);
                        } else {
                            setError("Erro desconhecido no escaner.");
                        }
                    }}
                />
            )}

            {loading && <p>Carregando...</p>}
            {error && <p className="absolute font-bold mt-40 text-md text-red-600 bg-red-200 p-2 rounded">{error}</p>}

            {nutritionData && nutritionData.dados && ( // Condicional para dados.dados
                <div>
                    <h2>Valores Nutricionais:</h2>
                    <p>Calorias: {nutritionData.dados.calorias || "N/D"}</p>
                    <p>Proteinas: {nutritionData.dados.proteinas || "N/D"}</p>
                    <p>Carboidratos: {nutritionData.dados.carboidratos || "N/D"}</p>
                    <p>Gorduras: {nutritionData.dados.gorduras || "N/D"}</p>
                    <p>Fibras: {nutritionData.dados.fibras || "N/D"}</p>
                </div>
            )}
        </div>
    );
}