// Fichier: app/providers.tsx
"use client";

import { SessionProvider } from "next-auth/react";

// On crée un composant client qui fournit le contexte de session
export default function NextAuthProvider({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      {children}
    </SessionProvider>
  );
}