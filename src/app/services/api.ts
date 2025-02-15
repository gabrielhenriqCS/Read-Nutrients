import { NutrientData } from "@/app/interface/NutritionData";

const API_URL = 'http://localhost:5000';

interface ApiResponse<T> { 
    success: true;
    message: string;
    data: T;
}

export async function getHistorico(): Promise<NutrientData[]> {
    try {
        const response = await fetch(`${API_URL}/home/nutritionconsults/historic/`);
        if (!response.ok) {
            throw new Error(`Erro carregando dados: ${response.status}`);
        }

        const data: ApiResponse<NutrientData> = await response.json(); 

        if (!data || !Array.isArray(data.data)) { 
            throw new Error("API response não é um array.");
        }

        const cleanData = data.data.map((item) => {
            const dataString = typeof item.data === "string" ? JSON.parse(item.data) : item.data;
            return {
              data: item.data,
              id: item.id,
              titulo: item.titulo,
              dados: dataString,
            };
          });

        return cleanData;
    } catch (parseError: unknown) { 
        console.error("Carregamento do histórico falhou:", parseError);
        if (parseError instanceof Error) {
            throw new Error(`Carregamento do histórico falhou: ${parseError.message}`); 
        } else {
            throw new Error("Carregamento do histórico falhou. Tente novamente.");
        }
    }
}

async function apiRequest<T>(url: string, options?: RequestInit): Promise<T> {
    try {
        const response = await fetch(url, options);

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || `Erro ${response.status}`);
        }

        return response.json();
    } catch (error) {
        console.error(`Erro na requisição para ${url}:`, error);
        throw new Error("Erro na comunicação com o servidor.");
    }
} 

export async function postBarCode(code: string): Promise<NutrientData> {
    return apiRequest<NutrientData>(`${API_URL}/home/nutritionconsults/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ code }),
    });
}


export async function deleteConsults(id: number): Promise<boolean> {
    return apiRequest<boolean>(`${API_URL}/home/nutritionconsults/${id}`, {
        method: "DELETE",
    });
}