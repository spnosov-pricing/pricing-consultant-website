import { createClient } from "next-sanity";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";

export const client = createClient({
  projectId,
  dataset,
  apiVersion: "2024-01-01",
  useCdn: process.env.NODE_ENV === "production",
});

export const postsQuery = `*[_type == "post"] | order(publishedAt desc) {
  _id,
  title,
  slug,
  excerpt,
  publishedAt,
  "mainImage": mainImage.asset->url
}`;

export const postBySlugQuery = `*[_type == "post" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  excerpt,
  publishedAt,
  body,
  "mainImage": mainImage.asset->url
}`;

export const postSlugsQuery = `*[_type == "post"]{ "slug": slug.current }`;
