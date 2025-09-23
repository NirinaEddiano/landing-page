import { PrismaClient } from '@prisma/client';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import Link from 'next/link';

const prisma = new PrismaClient();

async function getPost(slug) {
  const post = await prisma.post.findUnique({ where: { slug } });
  return post;
}

// ... (gardez vos fonctions generateStaticParams et generateMetadata)
export async function generateStaticParams() {
  const posts = await prisma.post.findMany({ select: { slug: true } });
  return posts.map((post) => ({ slug: post.slug }));
}
export async function generateMetadata({ params }) {
  const post = await getPost(params.slug); 
  if (!post) { return { title: 'Article non trouvé' }; }
  return { title: post.title, description: post.description };
}

export default async function ArticleDetailPage({ params }) {
  const post = await getPost(params.slug);
  if (!post) { notFound(); }

  return (
    <div className="bg-white">
      {/* Navbar */}
      <main className="pt-8 pb-16 lg:pt-16 lg:pb-24 bg-white antialiased">
        <div className="flex justify-between px-4 mx-auto max-w-screen-xl ">
          <article className="mx-auto w-full max-w-2xl format format-sm sm:format-base lg:format-lg format-blue">
            <header className="mb-4 lg:mb-6 not-format">
              <Link href="/articles" className="text-sm font-medium text-indigo-600 hover:underline mb-4 inline-block">← Retour à tous les articles</Link>
              <h1 className="mb-4 text-3xl font-extrabold leading-tight text-gray-900 lg:mb-6 lg:text-4xl">{post.title}</h1>
              <p className="text-lg text-gray-500">{post.description}</p>
              <time dateTime={post.createdAt.toISOString()} className="text-sm text-gray-500 mt-4 block">
                Publié le {new Date(post.createdAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
              </time>
            </header>

            <figure className="my-8">
              <Image 
                src={post.heroImage}
                alt={post.title}
                width={1200}
                height={675}
                className="w-full rounded-lg shadow-md"
              />
            </figure>

            <div
              className="prose prose-lg max-w-none prose-indigo"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </article>
        </div>
      </main>
      {/* Footer */}
    </div>
  );
}