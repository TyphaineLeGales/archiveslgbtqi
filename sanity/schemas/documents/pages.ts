import { rule } from "postcss";
import { defineField, defineType, validation } from "sanity";

/**
 * This file is the schema definition for pages.
 *
 * Here you'll be able to edit the different fields that appear when you 
 * create or edit a post in the studio.
 * 
 * Here you can see the different schema types that are available:

  https://www.sanity.io/docs/schema-types

 */

export default defineType({
  name: "pages",
  title: "Pages",
  icon: () => "📄",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title de la page",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug de la page",
      type: "slug",
      description: "Un slug est utilisé pour générer l'URL de la page",
      options: {
        source: "title",
        maxLength: 96,
        isUnique: (value, context) => context.defaultIsUnique(value, context),
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "introduction",
      title: "Introduction",
      type: "array",
      of: [{ type: "block" }],
      hidden: ({ parent }) => parent?.slug?.current !== "liste-des-fonds",
    }),
    defineField({
      name: "content",
      title: "Content",
      type: "array",
      of: [{ type: "content" }],
      hidden: ({ parent }) =>
        parent?.slug?.current === "agenda" ||
        parent?.slug?.current === "blog" ||
        parent?.slug?.current === "404" ||
        parent?.slug?.current === "liste-des-fonds",
    }),
    defineField({
      name: "contentFromListeDeFonds",
      title: "Content",
      type: "array",
      of: [{ type: "liste-des-fonds-content" }],
      hidden: ({ parent }) => parent?.slug?.current !== "liste-des-fonds",
    }),
  ],
  preview: {
    select: {
      title: "title",
      slug: "slug.current",
    },
    prepare: ({ title, slug }) => {
      let icon;
      switch (slug) {
        case "agenda":
          icon = () => "🗓️";
          break;
        case "blog":
          icon = () => "📝";
          break;
        default:
          icon = () => "📄";
          break;
      }
      return {
        title,
        subtitle: slug && (slug === "index" ? "/" : `/${slug}`),
        media: icon,
      };
    },
  },
});
