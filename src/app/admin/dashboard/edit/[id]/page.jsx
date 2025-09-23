import { PrismaClient } from '@prisma/client';
import { notFound } from 'next/navigation';
import EditPostForm from './EditPostForm'; // Nous créons ce composant juste après

const prisma = new PrismaClient();

async function getPost(id) {
  const post = await prisma.post.findUnique({
    where: { id },
  });
  return post;
}

export default async function EditPostPage({ params }) {
  const post = await getPost(params.id);

  if (!post) {
    notFound();
  }

  return (
    <div className="p-4 sm:p-8">
      <h1 className="text-3xl font-bold mb-8">Modifier l'article</h1>
      {/* On passe les données de l'article au formulaire client */}
      <EditPostForm post={post} />
    </div>
  );
}