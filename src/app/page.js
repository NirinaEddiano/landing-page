// Fichier: app/page.tsx

import { PrismaClient } from '@prisma/client';
import HomeClient from './HomeClient'; // On importe le composant qui s'occupera de l'affichage

// On peut initialiser Prisma ici car c'est un composant serveur
const prisma = new PrismaClient();

// Fonction pour récupérer les posts, elle est bien async
async function getPostsForCarousel() {
  try {
    const posts = await prisma.post.findMany({
      where: { published: true },
      orderBy: { createdAt: 'desc' },
      take: 7,
    });
    return posts;
  } catch (error) {
    console.error("Erreur lors de la récupération des posts:", error);
    return []; // Retourner un tableau vide en cas d'erreur
  }
}

// La page elle-même est une fonction async
export default async function HomePage() {
  // On récupère les données ici, sur le serveur
  const posts = await getPostsForCarousel();
  
  // On passe les données "posts" comme une simple propriété (prop)
  // au composant client. Le composant client n'aura pas besoin d'être async.
  return <HomeClient posts={posts} />;
}