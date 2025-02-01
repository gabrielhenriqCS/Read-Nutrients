import Link from "next/link";

export function NavBar() {
    return (
        <nav className="bg-gray-800 p-4"> {/* Adicionei uma cor de fundo e padding */}
            <ul className="flex flex-row gap-4 font-bold text-2xl justify-center">
                <li>
                    <Link href="/" className="text-white hover:text-gray-400 transition-colors">
                        Início
                    </Link>
                </li>
                <li>
                    <Link href="/historico" className="text-white hover:text-gray-400 transition-colors">
                        Histórico
                    </Link>
                </li>
            </ul>
        </nav>
    );
}