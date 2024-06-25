import { DocumentIcon, FolderIcon, icons } from "@sanity/icons";
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
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      description: "A slug is required for the post to show up in the preview",
      options: {
        source: "title",
        maxLength: 96,
        isUnique: (value, context) => context.defaultIsUnique(value, context),
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "navigation",
      title: "Navigation",
      type: "array",
      of: [{ type: "reference", weak: true, to: [{ type: "pages" }] }],
    }),
    defineField({
      name: "content",
      title: "Content",
      type: "array",
      of: [
        { type: "document-file" },
        { type: "richtext" },
        { type: "richTextAndTitle" },
        { type: "single-image" },
        { type: "multi-images" },
        { type: "link" },
        { type: "contact-form" },
        { type: "lastEvent" },
        { type: "creationArchives" },
        { type: "custom-html" },
        { type: "creative-module" },
      ],
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
