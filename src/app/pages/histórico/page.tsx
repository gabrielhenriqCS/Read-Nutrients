"use client";
import { useEffect, useState } from "react";
import { deleteConsults, getHistorico } from "@/app/services/api";
import { NutrientData } from "@/app/interface/NutritionData";


export default function Historico() {
    const [nutrientsData, setNutrientsData] = useState<NutrientData[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            try {
                const data = await getHistorico();
                
                console.log("Dados recebidos:", data); // Depuração
                
                if (!Array.isArray(data)) {
                    throw new Error("A resposta da API não é um array.");
                }

                const dataWithId = data.map((item) => {
                    if (item.id) {
                        return item;
                    } else if (item.hasOwnProperty("id")) {
                        return item;
                    } else {
                        return { ...item, id: Math.floor(Math.random() * 1000) };
                    }
                });

                setNutrientsData(dataWithId);
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

    const handleDelete = async (id: number) => {
        const sucess = await deleteConsults(id);
        if (sucess) {
            setNutrientsData(nutrientsData.filter((item) => item.id !== id));
        } else {
            console.error("ID inválido");
        }   
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
                        <hr />
                        <button onClick={handleDelete.bind(null, item.id)} >Excluir</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}