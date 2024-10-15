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
      name: "credits",
      title: "Légende",
      type: "string",
      description: "Légende de l'image",
    }),
    defineField({
      name: "title",
      title: "Balise alt",
      type: "string",
      description: "Description de l'image pour les moteurs de recherche",
      validation: (rule) => rule.required(),
    }),
  ],
});
