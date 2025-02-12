import Link from "next/link";

export default function NotFound() {
    return (
        <>
        <h1 className="">404 Não encontrado</h1>
        <p>Pagina não encontrada</p>
        <Link href="/notfound">
            Voltar        
        </Link>
        </>
    )
}