// lib/auth.ts
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import { compare } from "bcrypt";

const prisma = new PrismaClient();

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
  if (!credentials?.username || !credentials?.password) {
    console.log("❌ Credentials manquants :", credentials);
    return null;
  }

  try {
    console.log("🔍 Tentative de connexion avec :", credentials.username);

    const admin = await prisma.admin.findUnique({
      where: { username: credentials.username },
    });

    if (!admin) {
      console.log("❌ Utilisateur introuvable :", credentials.username);
      return null;
    }

    console.log("✅ Utilisateur trouvé :", admin.username);

    const isValidPassword = await compare(credentials.password, admin.password);

    if (!isValidPassword) {
      console.log("❌ Mot de passe invalide pour :", credentials.username);
      return null;
    }

    console.log("✅ Mot de passe correct, connexion réussie :", admin.username);

    return { id: admin.id, username: admin.username };

  } catch (error) {
    console.error("💥 Erreur pendant authorize :", error);
    return null;
  }
}


    })
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.username = user.username;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.username = token.username;
      }
      return session;
    },
  },
  pages: {
    signIn: '/login',
  },
  secret: process.env.NEXTAUTH_SECRET,
};
