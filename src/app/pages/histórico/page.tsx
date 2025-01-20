import HistoricoLists from "@/app/components/HistoricoLists";

export default function Historico() {
    return <><h1>Historico</h1><p>Veja todas as consultas feitas:</p>
        <HistoricoLists titulo="Consulta 1" dados="Dados" data={[]} />
    </>
    
}