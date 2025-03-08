import axios, { AxiosResponse } from 'axios';
import { NutrientData } from '../interface/NutritionData';

export const api = axios.create({
  baseURL: process.env.BACKEND_URL,
});

export class NutritionConsults {
  // Método para buscar o histórico de consultas
  static async MostrarHistorico(): Promise<AxiosResponse<NutrientData[]>> {
    try {
      const response = await api.get('/nutritionconsults/historic');
      return response;
    } catch {
      throw new Error('Erro ao buscar histórico de consultas.');
    }
  }

  // Método para criar uma nova consulta
  static async CriarConsulta(barcode: string): Promise<AxiosResponse<NutrientData>> {
    try {
      const response = await api.post("/nutritionconsults", { barcode });
      return response;
    } catch {
      throw new Error('Erro ao criar consulta. Verifique o código de barras.');
    }
  }

  // Método para deletar uma consulta
  static async DeletarConsulta(id: number): Promise<AxiosResponse<void>> {
    try {
      const response = await api.delete(`/nutritionconsults/${id}`);
      return response;
    } catch {
      throw new Error('Erro ao deletar consulta.');
    }
  }
}
