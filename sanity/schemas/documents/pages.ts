import { FolderIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

/**
 * This file is the schema definition for a pages.
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
  icon: FolderIcon,
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
      name: "content",
      title: "Content",
      type: "array",
      of: [{ type: "content" }],
    }),
  ],
  preview: {
    select: {
      title: "title",
      slug: "slug.current",
    },
    prepare: ({ title, slug }) => ({
      title,
      subtitle: slug && (slug === "index" ? "/" : `/${slug}`),
    }),
  },
});
