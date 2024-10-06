export function NavBar() {
    return (
        <>
            <ul className="flex flex-row gap-4 font-bold text-2xl">
                <li><a href="/dashboard">Início</a></li>
                <li><a href="/histórico">Histórico</a></li>
            </ul>
        </>
    )
}