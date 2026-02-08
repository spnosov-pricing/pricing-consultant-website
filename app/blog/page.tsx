import Link from "next/link";
import { client } from "@/lib/sanity";
import { postsQuery } from "@/lib/sanity";

async function getPosts() {
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) return [];
  try {
    return await client.fetch<Array<{
      _id: string;
      title: string;
      slug: { current: string };
      excerpt?: string;
      publishedAt?: string;
      mainImage?: string;
    }>>(postsQuery);
  } catch {
    return [];
  }
}

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <div className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-4xl font-bold text-slate-900">Блог</h1>
        <p className="mt-2 text-slate-600">
          Статьи о прайсинге, монетизации и работе с IT-командами
        </p>
        {posts.length === 0 ? (
          <div className="mt-12 rounded-xl border border-dashed border-slate-300 bg-slate-50 p-12 text-center">
            <p className="text-slate-600">
              Пока нет статей. Настройте Sanity и добавьте контент через Studio.
            </p>
            <Link
              href="/studio"
              className="mt-4 inline-block text-primary-600 hover:underline"
            >
              Открыть Sanity Studio →
            </Link>
          </div>
        ) : (
          <div className="mt-12 space-y-8">
            {posts.map((post) => (
              <article
                key={post._id}
                className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
              >
                <Link href={`/blog/${post.slug.current}`}>
                  <h2 className="text-xl font-bold text-slate-900 hover:text-primary-600">
                    {post.title}
                  </h2>
                </Link>
                {post.publishedAt && (
                  <time
                    dateTime={post.publishedAt}
                    className="mt-2 block text-sm text-slate-500"
                  >
                    {new Date(post.publishedAt).toLocaleDateString("ru", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </time>
                )}
                {post.excerpt && (
                  <p className="mt-3 text-slate-600">{post.excerpt}</p>
                )}
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
