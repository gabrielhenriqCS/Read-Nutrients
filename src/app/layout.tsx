import type { Metadata } from "next";
import "./globals.css";


export const metadata: Metadata = {
  title: "Leitura de Nutrientes",
  description: "Created by Gabriel Henrique",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-br">
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
}
