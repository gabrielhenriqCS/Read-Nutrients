"use client";
import { useEffect, useState } from "react";
import { getHistorico } from "@/app/services/api";

interface NutrientData {
    data: string;
    titulo: string;
    dados: {
        calorias: number;
        proteinas: number;
        carboidratos: number;
        gorduras: number;
    };
}

export default function Historico() {
    const [nutrientsData, setNutrientsData] = useState<NutrientData[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const data = await getHistorico();
                setNutrientsData(data);
            } catch {
                setError("Erro ao carregar dados da consulta");
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
                {nutrientsData.map((item, index) => (
                    <li key={index}>
                        <h2>{item.titulo}</h2>
                        <p>Data: {new Date(item.data).toLocaleString()}</p>
                        <p>Calorias: {item.dados.calorias.toFixed(2)}</p>
                        <p>Proteínas: {item.dados.proteinas.toFixed(2)}</p>
                        <p>Carboidratos: {item.dados.carboidratos.toFixed(2)}</p>
                        <p>Gorduras: {item.dados.gorduras.toFixed(2)}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}