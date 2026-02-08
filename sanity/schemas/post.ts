import { defineField, defineType } from "sanity";

export default defineType({
  name: "post",
  title: "Post",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "excerpt",
      title: "Excerpt",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "publishedAt",
      title: "Published at",
      type: "datetime",
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "blockContent",
    }),
    defineField({
      name: "mainImage",
      title: "Main image",
      type: "image",
      options: { hotspot: true },
    }),
  ],
  preview: {
    select: {
      title: "title",
      date: "publishedAt",
    },
    prepare(selection) {
      const { title, date } = selection;
      return {
        title,
        subtitle: date ? new Date(date).toLocaleDateString("ru") : "",
      };
    },
  },
});
