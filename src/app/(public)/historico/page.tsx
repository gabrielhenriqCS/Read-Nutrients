"use client";
import { useEffect, useState } from "react";
import { NutritionConsults } from "@/app/services/api";
import { NutrientData } from "@/app/interface/NutritionData";


export default function Historico() {
    const [historico, setHistorico] = useState<NutrientData[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);;

    useEffect(() => {
        const fetchHistorico = async () => {
            setLoading(true);
            setError(null);
    
            try {
                const response = await NutritionConsults.MostrarHistorico();
                setHistorico(response.data);
            } catch {
                setError("Falha ao buscar o histórico de consultas.");
            } finally {
                setLoading(false);
            }
        };
    
        fetchHistorico();
    }, []);
    
    if (loading) return <p>Carregando...</p>;
    if (error) return <p>Erro: {error}</p>;
    
    return (
        <div>
            <h1 className="flex justify-center items-center text-[35px] mt-12 font-bold">Histórico de Consultas</h1>
            <ul>
                {historico.map((consulta) => (
                    <li key={consulta.id}>
                        <h2>{consulta.titulo}</h2>
                        <p>Código de Barras: {consulta.barcode}</p>
                        <p>Calorias: {consulta.dados.calorias} kcal</p>
                        <p>Proteínas: {consulta.dados.proteinas} g</p>
                        <p>Carboidratos: {consulta.dados.carboidratos} g</p>
                        <p>Gorduras: {consulta.dados.gorduras} g</p>
                        <p>Fibras: {consulta.dados.fibras} g</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}