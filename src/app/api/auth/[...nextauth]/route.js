import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaClient } from '@prisma/client';
import { compare } from 'bcrypt';

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
        // ... (cette partie ne change pas)
        if (!credentials?.username || !credentials?.password) return null;
        const admin = await prisma.admin.findUnique({ where: { username: credentials.username } });
        if (!admin) return null;
        const isValidPassword = await compare(credentials.password, admin.password);
        if (!isValidPassword) return null;
        // On retourne bien l'id et le username
        return { id: admin.id, username: admin.username };
      }
    })
  ],
  session: {
    strategy: "jwt",
  },
  // ==========================================================
  // AJOUT DE CETTE SECTION "CALLBACKS"
  // ==========================================================
  callbacks: {
    async jwt({ token, user }) {
      // Si on a un objet "user" (au moment de la connexion), on l'ajoute au token
      if (user) {
        token.id = user.id;
        token.username = user.username;
      }
      return token;
    },
    async session({ session, token }) {
      // On ajoute les informations du token à la session
      if (token) {
        session.user.id = token.id;
        session.user.username = token.username;
      }
      return session;
    },
  },
  // ==========================================================
  pages: {
    signIn: '/login',
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };