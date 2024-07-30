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
  name: "liste-des-fonds-content",
  title: "Page Blocks",
  icon: FolderIcon,
  type: "object",
  fields: [
    defineField({
      name: "titleBlock",
      title: "Titre du lien",
      type: "string",
      description: "Titre de la liste.",
    }),
    defineField({
      name: "block",
      title: "Block",
      type: "array",
      of: [
        { type: "link" },
        { type: "multi-images" },
        { type: "single-image" },
        { type: "richtext" },
      ],
    }),
  ],
  preview: {
    select: {
      title: "titleBlock",
    },
    prepare: ({ title }) => ({
      title: title || "Block",
    }),
  },
});
