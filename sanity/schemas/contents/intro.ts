import { TextIcon } from "@sanity/icons";
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
  name: "intro",
  title: "Intro Blocks",
  icon: TextIcon,
  type: "document",
  fields: [
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
    select: {},
    prepare: ({}) => ({
      title: "Intro Block",
    }),
  },
});
