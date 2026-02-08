import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { client } from "@/lib/sanity";
import {
  postBySlugQuery,
  postSlugsQuery,
} from "@/lib/sanity";
import PortableText from "@/components/blog/PortableText";

async function getPost(slug: string) {
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) return null;
  try {
    return await client.fetch<{
      _id: string;
      title: string;
      slug: { current: string };
      excerpt?: string;
      publishedAt?: string;
      body?: unknown;
      mainImage?: string;
    } | null>(postBySlugQuery, { slug });
  } catch {
    return null;
  }
}

export async function generateStaticParams() {
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) return [];
  try {
    const slugs = await client.fetch<Array<{ slug: string }>>(postSlugsQuery);
    return slugs.map(({ slug }) => ({ slug }));
  } catch {
    return [];
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  return (
    <div className="px-4 py-16 sm:px-6 lg:px-8">
      <article className="mx-auto max-w-3xl">
        <Link
          href="/blog"
          className="mb-8 inline-block text-sm text-primary-600 hover:underline"
        >
          ← Назад к блогу
        </Link>
        <h1 className="text-4xl font-bold text-slate-900">{post.title}</h1>
        {post.publishedAt && (
          <time
            dateTime={post.publishedAt}
            className="mt-2 block text-slate-500"
          >
            {new Date(post.publishedAt).toLocaleDateString("ru", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
        )}
        {post.mainImage && (
          <div className="relative mt-6 aspect-video overflow-hidden rounded-xl">
            <Image
              src={post.mainImage}
              alt={post.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 672px"
            />
          </div>
        )}
        <div className="mt-8">
          <PortableText value={post.body} />
        </div>
      </article>
    </div>
  );
}
