export interface NutrientData {
    id: number;
    titulo: string;
    barcode: string;
    dados: {
        calorias: number;
        proteinas: number;
        carboidratos: number;
        gorduras: number;
        fibras: number;
    };
    data?: string;
}


