
import { GeistSans } from "geist/font/sans";
import { Mada } from "next/font/google";
import "./globals.css";

const mada = Mada({
  subsets: ['latin'],
  weight: ['300', '600'], 
  variable: '--font-mada',
});

export const metadata = {
  title: "Votre Nom d'Entreprise - Landing Page",
  description: "Description concise de votre service ou produit.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body className={`${GeistSans.className}  ${mada.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
