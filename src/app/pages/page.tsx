import { BlocoHistorico } from "@/app/components/HistoricoLists"
import historicoData from "../consultas.json"

export default function Historico() {
    return <>
    <div>
        {historicoData.map((item, index) => (
            <BlocoHistorico key={index} data={item.data} titulo={item.titulo} dados={item.dados} />
        ))}
    </div>
    </>
    
}