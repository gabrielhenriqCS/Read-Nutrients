export interface NutrientData {
    data: string;
    id: number;
    titulo: string;
    dados: {
        calorias: number;
        proteinas: number;
        carboidratos: number;
        gorduras: number;
        fibras: number;
    };
}

export interface Consults extends NutrientData {
    date: Date;
}

export interface ApiResponse {
    sucess: boolean,
    message: string,
    data: NutrientData;
}