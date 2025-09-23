import { PrismaClient } from '@prisma/client';
import Image from 'next/image';
import Link from 'next/link';

const prisma = new PrismaClient();

// Icône de flèche (vous pouvez la garder ou la changer)
const ArrowRightIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>;

export default async function ArticlesPage() {
  const posts = await prisma.post.findMany({
    where: { published: true },
    orderBy: { createdAt: 'desc' },
  });

  // Sépare le premier article des autres
  const featuredPost = posts[0];<div className="mb-8">
              <Link href="/" className="text-sm font-medium text-indigo-600 hover:underline">
                ← Retour à l'accueil
              </Link>
            </div>
  const otherPosts = posts.slice(1);

  return (
    <div className="bg-white">
      
      <main className="py-14 sm:py-12">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <div className="mb-8">
              <Link href="/" className="text-sm font-medium text-indigo-600 hover:underline">
                ← Retour à l'accueil
              </Link>
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Nos Articles & Conseils</h2>
            <p className="mt-2 text-lg leading-8 text-gray-600">
              Découvrez nos analyses, astuces et actualités pour booster votre activité digitale.
            </p>
          </div>
          
          {/* Article mis en avant */}
          {featuredPost && (
            <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <Link href={`/articles/${featuredPost.slug}`}>
                <div className="relative w-full h-96 rounded-2xl overflow-hidden group">
                  <Image
                    src={featuredPost.heroImage}
                    alt={featuredPost.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                </div>
              </Link>
              <div>
                <time dateTime={featuredPost.createdAt.toISOString()} className="text-sm text-gray-500">
                  {new Date(featuredPost.createdAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
                </time>
                <h3 className="mt-3 text-2xl font-semibold leading-tight text-gray-900 hover:text-gray-700">
                  <Link href={`/articles/${featuredPost.slug}`}>
                    {featuredPost.title}
                  </Link>
                </h3>
                <p className="mt-4 line-clamp-3 text-base leading-7 text-gray-600">{featuredPost.description}</p>
                <div className="mt-6">
                   <Link href={`/articles/${featuredPost.slug}`} className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 hover:text-indigo-800">
                     Lire l'article <ArrowRightIcon/>
                  </Link>
                </div>
              </div>
            </div>
          )}
          
          {/* Grille des autres articles */}
          <div className="mx-auto mt-16 grid max-w-2xl auto-rows-fr grid-cols-1 gap-8 pt-16 border-t border-gray-200 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {otherPosts.map((post) => (
              <article key={post.id} className="relative isolate flex flex-col justify-end overflow-hidden rounded-2xl bg-gray-900 px-8 pb-8 pt-80 sm:pt-48 lg:pt-80 group">
                <Image src={post.heroImage} alt="" className="absolute inset-0 -z-10 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" fill/>
                <div className="absolute inset-0 -z-10 bg-gradient-to-t from-gray-900 via-gray-900/60" />
                <div className="absolute inset-0 -z-10 rounded-2xl ring-1 ring-inset ring-gray-900/10" />

                <time dateTime={post.createdAt.toISOString()} className="text-sm leading-6 text-gray-300">
                  {new Date(post.createdAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long' })}
                </time>
                <h3 className="mt-3 text-lg font-semibold leading-6 text-white">
                  <Link href={`/articles/${post.slug}`}>
                    <span className="absolute inset-0" />
                    {post.title}
                  </Link>
                </h3>
              </article>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}