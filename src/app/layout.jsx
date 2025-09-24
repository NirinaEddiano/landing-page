
import { GeistSans } from "geist/font/sans";
import { Mada } from "next/font/google";
import "./globals.css";
import "./responsive.css";
import NextAuthProvider from "./providers";

const mada = Mada({
  subsets: ['latin'],
  weight: ['300', '600'], 
  variable: '--font-mada',
});

export const metadata = {
  title: "MuntuLabs - Agence Digitale",
  description: "Solutions digitales 360° : création de sites, apps mobiles, automatisations et closing.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr" >
      <body className={`${GeistSans.className}  ${mada.variable} antialiased `}>
       <NextAuthProvider>
          {children}
        </NextAuthProvider>
      </body>
    </html>
  );
}
