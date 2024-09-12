import { defineField, defineType } from "sanity";

export default defineType({
  name: "richTextAndTitle",
  title: "Titre et texte",
  icon: () => "📝",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "text",
      title: "Text",
      type: "array",
      of: [{ type: "block" }],
      validation: (rule) => rule.required(),
    }),
  ],
});
