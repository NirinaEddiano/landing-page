// app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth";
import { authOptions } from '../../../../lib/auth';

const handler = NextAuth(authOptions);

export async function GET(req, res) {
  try {
    return await handler(req, res);
  } catch (error) {
    console.error("NextAuth GET Error:", error);

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

    return new Response(
      JSON.stringify({ error: "Internal Server Error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}