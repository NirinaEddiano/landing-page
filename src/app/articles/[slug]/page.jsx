import { PrismaClient } from '@prisma/client';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import Link from 'next/link';

const prisma = new PrismaClient();

async function getPost(slug) {
  const post = await prisma.post.findUnique({ where: { slug } });
  return post;
}

async function getMorePosts(currentSlug) {
    return prisma.post.findMany({
        where: {
            published: true,
            NOT: {
                slug: currentSlug,
            },
        },
        orderBy: {
            createdAt: 'desc',
        },
        take: 3,
    });
}

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
  
  const morePosts = await getMorePosts(params.slug);

  return (
    <div className="bg-white">
      {/* SECTION HERO */}
      <div className="relative h-[60vh] min-h-[400px] w-full">
        <Image 
          src={post.heroImage}
          alt={post.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full p-8 md:p-12 text-white">
            <div className="max-w-4xl mx-auto">
                <Link href="/articles" className="text-sm font-medium text-white/80 hover:underline mb-4 inline-block">← Retour à tous les articles</Link>
                <h1 className="mb-4 text-3xl font-extrabold leading-tight lg:text-5xl">{post.title}</h1>
                <p className="text-lg text-white/90 max-w-2xl">{post.description}</p>
            </div>
        </div>
      </div>

      {/* SECTION CONTENU */}
      <main className="py-16 lg:py-24 bg-white antialiased">
        <article className="mx-auto w-full max-w-3xl px-6 lg:px-8 prose lg:prose-xl prose-indigo">
            <div
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
        </article>
      </main>

      {/* SECTION AUTRES ARTICLES */}
      {morePosts.length > 0 && (
        <aside className="py-16 lg:py-24 bg-gray-50 border-t">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl text-center">Continuer la lecture</h2>
                <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                    {morePosts.map((p) => (
                        <article key={p.id} className="flex flex-col items-start justify-between group">
                            <Link href={`/articles/${p.slug}`} className="w-full">
                                <div className="relative w-full">
                                <Image
                                    src={p.heroImage}
                                    alt={p.title}
                                    width={800}
                                    height={600}
                                    className="aspect-[16/9] w-full rounded-2xl bg-gray-100 object-cover sm:aspect-[2/1] lg:aspect-[3/2] transition-transform duration-300 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
                                </div>
                            </Link>
                            <div className="max-w-xl mt-6">
                                <h3 className="text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                                    <Link href={`/articles/${p.slug}`}>
                                    <span className="absolute inset-0" />
                                    {p.title}
                                    </Link>
                                </h3>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </aside>
      )}
    </div>
  );
}