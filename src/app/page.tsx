
import { NavBar } from "@/app/components/NavBar";
import { ButtonLerCodigo } from "@/app/components/ButtonLerCodigo";


export default function HomePage() {
  return (
    <div className="flex flex-col justify-center">
    <header className="flex justify-center items-center p-4">
      <NavBar />
    </header>
    <main className="flex flex-col justify-center items-center py-0 my-52">
      <ButtonLerCodigo />
      </main>
      </div>
  )
}
