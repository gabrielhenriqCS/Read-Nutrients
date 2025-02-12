import { NutrientData } from "../interface/NutritionData";

const API_URL = 'http://localhost:5000/home';

interface ApiResponse<T> { 
    sucess: boolean;
    message: string;
    data: T;
}

export async function getHistorico(): Promise<NutrientData[]> {
    try {
        const response = await fetch(`${API_URL}/nutriconsults/historic/`);
        if (!response.ok) {
            const errorData = await response.json(); 
            const errorMessage = errorData.message || response.statusText;
            throw new Error(`Erro carregando dados: ${response.status} - ${errorMessage}`);
        }

        const data: ApiResponse<NutrientData[]> = await response.json(); // Tipagem mais precisa

        if (!Array.isArray(data.data)) { 
            throw new Error("API response não é um array.");
        }

        const cleanData = data.data.map(({ data: jsonData, id, titulo }) => {
            const dataString = typeof jsonData === 'string' ? jsonData : JSON.stringify(jsonData);
            return {
              data: jsonData,
              id,
              titulo,
              dados: { ...JSON.parse(dataString) },
            };
          });

        return cleanData;
    } catch (error: unknown) { 
        console.error("Carregamento do histórico falhou:", error);
        if (error instanceof Error) {
            throw new Error(`Carregamento do histórico falhou: ${error.message}`); 
        } else {
            throw new Error("Carregamento do histórico falhou. Tente novamente.");
        }
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
            const errorData = await response.json(); 
            const errorMessage = errorData.message || response.statusText;
            throw new Error(`Erro na requisição: ${response.status} - ${errorMessage}`);
        }

        const res_data: ApiResponse<NutrientData> = await response.json(); // Tipagem mais precisa

        // Verifica tipos e se res_data.data existe
        if (typeof res_data.sucess !== 'boolean' || typeof res_data.message !== 'string' || !res_data.data) {
            throw new Error("Estrutura de dados inválida recebida pela API.");
        }

        return res_data.data;
    } catch (error: unknown) {
        console.error("Carregamento de dados do código de barras falhou:", error);
        if (error instanceof Error) {
            throw new Error(`Carregamento de dados do código de barras falhou: ${error.message}`);
        } else {
            throw new Error("Carregamento de dados do código de barras falhou. Tente novamente.");
        }
    }
}


export async function deleteConsults(id: number): Promise<boolean> {
    try {
        const delete_history = await fetch(`${API_URL}/consults/${id}`, {
            method: "DELETE",
        });

        if (!delete_history.ok) {
            const errorData = await delete_history.json(); // Tenta obter detalhes do erro em JSON
            const errorMessage = errorData.message || delete_history.statusText;
            throw new Error(`Erro ao deletar consultas: ${delete_history.status} - ${errorMessage}`);
        }

        console.log("Consultas deletadas com sucesso."); // Mensagem mais clara
        return true;
    } catch (error: unknown) { // Tipo unknown para erros
        console.error("Erro ao deletar consultas:", error);
        return false;
    }
}