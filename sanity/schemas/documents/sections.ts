import { BlockElementIcon } from "@sanity/icons";
import { format, parseISO } from "date-fns";
import { defineField, defineType, ReferenceInput } from "sanity";

import authorType from "./author";

/**
 * This file is the schema definition for a post.
 *
 * Here you'll be able to edit the different fields that appear when you 
 * create or edit a post in the studio.
 * 
 * Here you can see the different schema types that are available:

  https://www.sanity.io/docs/schema-types

 */

export default defineType({
  name: "sections",
  title: "Sections",
  icon: BlockElementIcon,
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
      name: "content",
      title: "Content",
      type: "array",
      of: [
        { type: "customFile" },
        { type: "customText" },
        { type: "customImage" },
        { type: "customExternalLink" },
      ],
    }),
    defineField({
      name: "reference",
      title: "Reference",
      type: "reference",
      to: [{ type: "pages" }],
      readOnly: true,
    }),
  ],
});
