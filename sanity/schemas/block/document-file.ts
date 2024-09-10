import { defineField, defineType } from "sanity";

export default defineType({
  name: "document-file",
  title: "Document | Fichier",
  icon: () => "🌐",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "file",
      title: "File",
      type: "file",
      validation: (rule) => rule.required(),
    }),
  ],
});
