"use client";
import { useEffect, useState } from "react";
import { deleteConsults, getHistorico } from "@/app/services/api";
import { NutrientData } from "@/app/interface/NutritionData";


export default function Historico() {
    const [nutrientsData, setNutrientsData] = useState<NutrientData[]>([]);
    const [loading] = useState(true);
    const [error] = useState<string | null>(null);

    useEffect(() => {
        async function updateHistoric() {
            try {
                const data = await getHistorico();
                
                console.log("Dados recebidos:", data); 

                setNutrientsData(data);
            } catch (err) {
                console.error("Erro ao carregar histórico:", err);
            } 
        }
    
        updateHistoric();
    }, []);

    if (loading) {
        return <div className="flex items-center justify-center mt-4">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-gray-900"></div>
    </div>;
    }

    const handleDelete = async (id: number) => {
        const sucess = await deleteConsults(id);
        if (sucess) {
            localStorage.removeItem("nutrientsData");
            setNutrientsData(nutrientsData.filter((item) => item.id !== id));
            localStorage.clear();
            alert("Consulta excluida com sucesso!");
        } else {
            alert("Erro ao deletar consulta.");
        }   
    }
    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Histórico de Consultas</h1>

            {error && <p className="text-red-600">{error}</p>}

            {nutrientsData.length === 0 ? (
                <p className="text-gray-600">Nenhuma consulta recente.</p>
            ) : (
                <ul className="list-disc pl-5">
                    {nutrientsData.map((item) => (
                        <li key={item.id} className="mt-2 bg-gray-200 p-2 rounded-lg">
                            <p><strong>{item.titulo}</strong></p>
                            <p>Calorias: {item.dados.calorias || "N/A"}</p>
                            <p>Proteínas: {item.dados.proteinas || "N/A"}</p>
                            <p>Carboidratos: {item.dados.carboidratos || "N/A"}</p>
                            <p>Gorduras: {item.dados.gorduras || "N/A"}</p>
                            <p>Fibra: {item.dados.fibras || "N/A"}</p>
                            <button className="bg-red-500 text-white px-2 py-1 rounded mt-2" onClick={() => handleDelete(item.id)}>
                                Excluir
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}