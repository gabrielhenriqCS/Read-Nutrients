import Link from "next/link";

export function NavBar() {
    return (
        <nav className=" p-4"> {/* Adicionei uma cor de fundo e padding */}
            <ul className="flex flex-row gap-10 font-bold text-2xl justify-center">
                <li>
                    <Link href="/home" className=" hover:text-white hover:p-4 transition-colors py-2 px4 rounded hover:bg-green-700 font-bold mb-8">
                        Início
                    </Link>
                </li>
                <li>
                    <Link href="/historico" className=" hover:text-white hover:p-4 transition-colors py-2 px4 rounded hover:bg-green-700">
                        Histórico
                    </Link>
                </li>
            </ul>
        </nav>
    );
}