import { LinkIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export default defineType({
  name: "customExternalLink",
  title: "External Link",
  icon: LinkIcon,
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      description: "Name of the link.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "url",
      title: "URL",
      type: "url",
      validation: (rule) => rule.required(),
    }),
  ],
});
