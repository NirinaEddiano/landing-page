// lib/auth.ts
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import { compare } from "bcryptjs"; // bcryptjs est une alternative pure JS à bcrypt

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
          console.log("Authorize: Missing credentials");
          return null;
        }

        try {
          const admin = await prisma.admin.findUnique({
            where: { username: credentials.username }
          });

          if (!admin) {
            console.log(`Authorize: User not found - ${credentials.username}`);
            return null;
          }

          const isValidPassword = await compare(credentials.password, admin.password);

          if (!isValidPassword) {
            console.log(`Authorize: Invalid password for user ${credentials.username}`);
            return null;
          }
          
          // Authentification réussie
          return { id: admin.id, username: admin.username };

        } catch (error) {
          console.error("Authorize Error:", error);
          return null; // Retourne null en cas d'erreur de base de données
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
      if (token && session.user) {
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