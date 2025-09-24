// Fichier: app/page.tsx
import { PrismaClient } from '@prisma/client';
import HomePageClient from './HomePageClient';

const prisma = new PrismaClient();

// Fonction pour récupérer les articles côté serveur
async function getPosts() {
  try {
    const posts = await prisma.post.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      // Vous pouvez ajouter un 'take' pour limiter le nombre d'articles sur la page d'accueil
      // take: 6, 
    });
    // La sérialisation est cruciale pour passer des données du serveur au client.
    // Les objets Date ne sont pas directement sérialisables en JSON.
    return posts.map(post => ({
      ...post,
      createdAt: post.createdAt.toISOString(),
      updatedAt: post.updatedAt.toISOString(),
    }));
  } catch (error) {
    console.error("Failed to fetch posts:", error);
    return []; // Retourner un tableau vide en cas d'erreur
  }
}

// La page est maintenant un Composant Serveur async
export default async function Page() {
  const posts = await getPosts();

  // On passe les articles récupérés en props au composant client
  return <HomePageClient posts={posts} />;
}