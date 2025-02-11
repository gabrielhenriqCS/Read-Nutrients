import {  NutrientData } from "../interface/NutritionData";

const API_URL = 'http://localhost:5000/home';

interface ApiResponse {
    sucess: boolean;
    message: string;
    data: NutrientData;
}

export async function getHistorico(): Promise<NutrientData[]> {
    try {
        const response = await fetch(`${API_URL}/nutriconsults/historic/`);
        if (!response.ok) {
            throw new Error(`Erro carregando dados: ${response.status} ${response.statusText} `);
        }

        const data: ApiResponse = await response.json();

        if (!Array.isArray(data)) {
            throw new Error("API response não é um array.");
        }

        const cleanData = data.map((item: any) => {
            const dados = { ...item.data };
            return {
                data: item.data,
                id: item.id,
                titulo: item.titulo,
                dados: dados,
            };
        });

        return cleanData;
    } catch (error) {
        throw new Error("Carregamento do histórico falhou. Tente novamente."); 
    }
}

export async function postBarCode(barcode: string): Promise<NutrientData> {
    try {
        const response = await fetch(`${API_URL}/nutriconsults/`, {
            method: "POST", 
            headers: {
                "Content-Type": "application/json",
            },
              body: JSON.stringify({ code: barcode }),
        });

        if (!response.ok) {
            throw new Error(`Erro no carregamento de dados: ${response.status} ${response.statusText}`);
        }

        const res_data: ApiResponse = await response.json();
        console.dir(res_data, { depth: null })
        if (typeof res_data.sucess !== 'boolean' || typeof res_data.message !== 'string' || !res_data.data) {
            throw new Error("Estrutura de dados inválida recebida pela API.");
        }

        return res_data.data ; 
    } catch (error) {
        throw new Error("Carregamento de dados do código de barras falhou. Tente novamente");
    }
}

export async function deleteConsults(id: number): Promise<boolean> {
    try {
        const delete_history = await fetch(`${API_URL}/consults/${id}`, {
            method: "DELETE",
        })

        if (!delete_history.ok) {
            throw new Error(`Erro ao deletar consultas: ${delete_history.status} ${delete_history.statusText}`);
        }

        console.log("Deletando consultas...");
        return true;
    } catch (error) {
        console.error("Erro ao deletar consultas:", error);
        return false;
    }
}