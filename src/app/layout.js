// 1. On importe la police directement depuis le paquet que nous avons installé.
import { GeistSans } from "geist/font/sans";
import "./globals.css";

export const metadata = {
  title: "Votre Nom d'Entreprise - Landing Page",
  description: "Description concise de votre service ou produit.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      {/* 2. On applique directement la classe de la police sur le body.
             Plus besoin de créer de variable. */ }
      <body className={`${GeistSans.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}