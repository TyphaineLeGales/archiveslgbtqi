import { defineField, defineType } from "sanity";

export default defineType({
  name: "single-image",
  title: "Image unique",
  icon: () => "🖼️",
  type: "object",
  fields: [
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "title",
      title: "Balise alt",
      type: "string",
      description: "Balise alt de l'image",
      validation: (rule) => rule.required(),
    }),
  ],
});
