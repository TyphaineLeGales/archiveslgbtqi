import { DocumentIcon, FolderIcon, icons } from "@sanity/icons";
import { defineField, defineType } from "sanity";
import { array } from "zod";

/**
 * This file is the schema definition for a pages.
 *
 * Here you'll be able to edit the different fields that appear when you 
 * create or edit a post in the studio.
 * 
 * Here you can see the different schema types that are available:

  https://www.sanity.io/docs/schema-types

  Fields:
  - Title: The title of the page
  - Slug: The slug of the page
  - Array of Blocks: The content of the page

 */

export default defineType({
  name: "content",
  title: "Page Blocks",
  icon: FolderIcon,
  type: "document",
  fields: [
    defineField({
      name: "titleBlock",
      title: "Titre du block",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "block",
      title: "Block",
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
      ],
    }),
  ],
  preview: {
    select: {
      title: "titleBlock",
    },
    prepare: ({ title }) => ({
      title,
    }),
  },
});
