import { NutrientData } from "../interface/NutritionData";

const API_URL = 'http://localhost:5000/home';

export async function getHistorico(): Promise<any> {
    try {
        const response = await fetch(`${API_URL}/`);
    if (!response.ok) {
        const errotText = await response.text();
        throw new Error(`Erro ao carregar dados: ${response.status} ${response.statusText} - ${errotText}`);

    }
    const data = await response.json();

    if (!Array.isArray(data)) {
        throw new Error('A resposta da API não é um array');
        
    }
    return data;
    } catch (error) {
        throw new Error('Erro ao carregar dados da consulta');
    }
}


export async function postHistorico(datas: NutrientData[]): Promise<any> {
    const body = {
        data: new Date().toLocaleTimeString("pt-BR"),
        titulo: 'Consulta de nutrientes',
        dados: datas
    }
    const response = await fetch(`${API_URL}/fazer-consulta`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    });
    if (!response.ok) {
        throw new Error(`Erro ao enviar dados: ${response.status} ${response.statusText}`);
    }
    
    return response.json();
}

export async function postBarCode(barcode: string): Promise<any> {
    const response = await fetch(`${API_URL}/ler-codigo`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({code: barcode})
    });
    if (!response.ok) {
        throw new Error(`Erro ao enviar dados: ${response.status} ${response.statusText}`);
    }
    
    return response.json();
}

