"use client";
import { useEffect, useState } from "react";
import { getHistorico } from "@/app/services/api";
import { NutrientData } from "@/app/interface/NutritionData";

export default function Historico() {
    const [nutrientsData, setNutrientsData] = useState<NutrientData[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const data = await getHistorico();
                
                console.log("Dados recebidos:", data); // Depuração
                
                if (!Array.isArray(data)) {
                    throw new Error("A resposta da API não é um array.");
                }

                setNutrientsData(data);
            } catch (err) {
                console.error("Erro ao carregar histórico:", err);
            } finally {
                setLoading(false);
            }
        }
    
        fetchData();
    }, []);

    if (loading) {
        return <p>Carregando...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div>
            <h1>Histórico de consultas</h1>
            <ul>
                {nutrientsData.map((item) => (
                    <li key={item.data || item.id}>
                        <h2>{item.titulo}</h2>
                        <p>Data: {new Date(item.data).toLocaleString('pt-BR')}</p>
                        <p>Calorias: {item.dados.calorias.toFixed(2)}</p>
                        <p>Proteínas: {item.dados.proteinas.toFixed(2)}</p>
                        <p>Carboidratos: {item.dados.carboidratos.toFixed(2)}</p>
                        <p>Gorduras: {item.dados.gorduras.toFixed(2)}</p>
                        <p>Fibras: {item.dados.fibras.toFixed(2)}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}