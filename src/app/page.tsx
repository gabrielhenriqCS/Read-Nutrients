import Image from "next/image";
import CellFood from "./assets/apontandocelular.png"
import { ConsultarNutrientes } from "./pages/consultarnutri";
import { NavBar } from "./components/NavBar";

export default function Home() {
  return (
    <div className="flex flex-col justify-center">
    <header className="flex justify-center items-center p-4">
      <NavBar />
    </header>
    <main className="flex flex-col justify-center items-center py-0 my-52">
        <ConsultarNutrientes />
      <Image className="absolute bottom-0 z-0 float-right" src={CellFood} alt="logo" width={700} />
      </main>
      </div>
  )
}
