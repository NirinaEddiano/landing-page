import { PrismaClient } from '@prisma/client';
import Image from 'next/image';
import Link from 'next/link';

const prisma = new PrismaClient();

export default async function ArticlesPage() {
  const posts = await prisma.post.findMany({
    where: { published: true },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="bg-gray-50">
     <main className="py-14 sm:py-12">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <div className="mb-8">
              
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Nos Articles & Conseils</h2>
            <p className="mt-2 text-lg leading-8 text-gray-600">
              Découvrez nos analyses, astuces et actualités pour booster votre activité digitale.
            </p>
          </div>

          {posts.length === 0 ? (
            <p className="text-center mt-16 text-gray-500">Aucun article à afficher pour le moment.</p>
          ) : (
            <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
              {posts.map((post) => (
                <article key={post.id} className="flex flex-col items-start justify-between">
                  <Link href={`/articles/${post.slug}`} className="w-full">
                    <div className="relative w-full">
                      <Image
                        src={post.heroImage}
                        alt={post.title}
                        width={800}
                        height={600}
                        className="aspect-[16/9] w-full rounded-2xl bg-gray-100 object-cover sm:aspect-[2/1] lg:aspect-[3/2] transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
                    </div>
                  </Link>
                  <div className="max-w-xl">
                    <div className="mt-8 flex items-center gap-x-4 text-xs">
                      <time dateTime={post.createdAt.toISOString()} className="text-gray-500">
                        {new Date(post.createdAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
                      </time>
                    </div>
                    <div className="group relative">
                      <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                        <Link href={`/articles/${post.slug}`}>
                          <span className="absolute inset-0" />
                          {post.title}
                        </Link>
                      </h3>
                      <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">{post.description}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}