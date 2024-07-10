import { TextIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export default defineType({
  name: "not-found",
  title: "404 Blocks",
  icon: TextIcon,
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "content",
      title: "Content",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "link",
      title: "Link",
      type: "object",
      fields: [
        defineField({
          name: "ctaTitle",
          title: "CTA Title",
          type: "string",
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: "href",
          title: "Href",
          type: "string",
          validation: (rule) => rule.required(),
        }),
      ],
    }),
  ],
});
