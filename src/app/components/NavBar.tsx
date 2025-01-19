import Link from "next/link";

export function NavBar() {
    return (
        <nav className="bg- flex justify-center">
            <ul className="flex flex-row gap-4 font-bold text-2xl">
                <li><Link href="/">Início</Link></li>
                <li><Link href="/histórico">Histórico</Link></li>
            </ul>
        </nav>
    )
}