export interface NutrientData {
    data: string | number;
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


