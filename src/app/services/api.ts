import { ApiResponse, Consults, NutrientData } from "../interface/NutritionData";

const API_URL = 'http://localhost:5000/home';

export async function getHistorico(): Promise<NutrientData[]> {
    try {
        const response = await fetch(`${API_URL}/consultadenutrientes/historic/`);
        if (!response.ok) {
            throw new Error(`Erro carregando dados: ${response.status} ${response.statusText} `);
        }

        const data: ApiResponse = await response.json();

        if (!Array.isArray(data)) {
            throw new Error("API response não é um array.");
        }

        const cleanData = data.map((item: any) => {
            const dados = { ...item.dados };
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
        const response = await fetch(`${API_URL}/consultarnutrientes/`, {
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

        if (!res_data.sucess || !res_data.message || !res_data.data) {
            throw new Error("Estrutura de dados inválida recebida pela API.")
        }

        return res_data.data ; 
    } catch (error) {
        throw new Error("Carregamento de dados do código de barras falhou. Tente novamente");
    }
}