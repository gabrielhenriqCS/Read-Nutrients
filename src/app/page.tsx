import Image from "next/image";
import { ConsultarNutrientes } from "./pages/consultarnutri";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-between p-24">
      <ConsultarNutrientes />
    </main>
  )
}
