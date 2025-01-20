interface HistoricoListsProps {
    data: number[];
    titulo: string;
    dados: string;
}

function ExibirData() {
    return new Date().toLocaleDateString('pt-BR');
}

export default function HistoricoLists({data, titulo, dados}: HistoricoListsProps) {
    return (
        <>
        <div>
            <h1>{titulo}</h1>
            <p>{dados}</p>
            <p>Data: {ExibirData()}</p>
            <ul>
                {data.map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
            </ul>
        </div>
        </>
    )
}