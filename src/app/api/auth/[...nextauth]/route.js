// app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth";
import { authOptions } from '../../../../lib/auth';

const handler = NextAuth(authOptions);

// Exporter les méthodes GET et POST séparément avec une gestion d'erreurs
export async function GET(req, res) {
  try {
    return await handler(req, res);
  } catch (error) {
    console.error("NextAuth GET Error:", error);
    // En cas d'erreur, retourner une réponse JSON et un statut 500
    return new Response(
      JSON.stringify({ error: "Internal Server Error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

export async function POST(req, res) {
  try {
    return await handler(req, res);
  } catch (error) {
    console.error("NextAuth POST Error:", error);
    // En cas d'erreur, retourner une réponse JSON et un statut 500
    return new Response(
      JSON.stringify({ error: "Internal Server Error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}