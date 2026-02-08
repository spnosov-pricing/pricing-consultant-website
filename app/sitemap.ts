import { MetadataRoute } from "next";
import { client } from "@/lib/sanity";
import { postSlugsQuery } from "@/lib/sanity";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com";

  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: "weekly" },
    {
      url: `${baseUrl}/services`,
      lastModified: new Date(),
      changeFrequency: "monthly",
    },
    {
      url: `${baseUrl}/quiz`,
      lastModified: new Date(),
      changeFrequency: "monthly",
    },
    {
      url: `${baseUrl}/consultation`,
      lastModified: new Date(),
      changeFrequency: "monthly",
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
    },
  ];

  let blogPosts: MetadataRoute.Sitemap = [];
  if (process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
    try {
      const slugs = await client.fetch<Array<{ slug: string }>>(postSlugsQuery);
      blogPosts = slugs.map(({ slug }) => ({
        url: `${baseUrl}/blog/${slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly" as const,
      }));
    } catch {
      // ignore
    }
  }

  return [...staticPages, ...blogPosts];
}
