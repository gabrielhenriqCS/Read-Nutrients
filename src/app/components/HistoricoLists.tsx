import React from "react";

interface DadosNutricionais {
    calorias: number;   
    carboidratos: number;
    gorduras: number;
    proteinas: number;
}

interface HistoricoLists {
    id: number;
    data: number[];
    titulo: string;
    dados: DadosNutricionais;
}

interface HistoricoListsProps {
    data: string;
    titulo: string;
    dados: DadosNutricionais;
}

export const BlocoHistorico: React.FC<HistoricoListsProps> = ({data, titulo, dados}) => {
    return (
        <div>
            <h1>{titulo}</h1>
            <p>{data}</p>
            <div>
                <p>Calorias: {dados.calorias} kcal</p>
                <p>Proteínas: {dados.proteinas} g</p>
                <p>Carboidratos: {dados.carboidratos}</p>
                <p>Gorduras: {dados.gorduras} g</p>
            </div>
        </div>
    )
}

