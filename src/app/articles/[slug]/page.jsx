import { PrismaClient } from '@prisma/client';
import Image from 'next/image';
import { notFound } from 'next/navigation';

const prisma = new PrismaClient();

async function getPost(slug) {
  const post = await prisma.post.findUnique({
    where: { slug },
  });
  return post;
}

export async function generateStaticParams() {
  const posts = await prisma.post.findMany({ select: { slug: true } });
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }) {
  const post = await getPost(params.slug); 
  if (!post) {
    return { title: 'Article non trouvé' };
  }
  return {
    title: post.title,
    description: post.description,
  };
}

export default async function ArticleDetailPage({ params }) {
  const post = await getPost(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div className="mx-auto max-w-3xl text-base leading-7 text-gray-700">
        <p className="text-base font-semibold leading-7 text-indigo-600">
          Publié le {new Date(post.createdAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{post.title}</h1>
        <p className="mt-6 text-xl leading-8">{post.description}</p>
        <div className="mt-10 max-w-2xl">
           <Image 
             src={post.heroImage}
             alt={post.title}
             width={1200}
             height={800}
             className="w-full rounded-2xl mb-10"
           />
          <div
            className="prose lg:prose-xl"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>
      </div>
    </div>
  );
}