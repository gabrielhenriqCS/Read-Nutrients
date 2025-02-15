import { NavBar } from "../components/NavBar";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
    return (
      <div className="flex flex-col justify-center mt-3">
        <NavBar />
        {children}
      </div>
    );
  }