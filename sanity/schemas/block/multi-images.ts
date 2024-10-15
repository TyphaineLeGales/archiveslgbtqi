import { defineField, defineType } from "sanity";

export default defineType({
  name: "multi-images",
  title: "Plusieurs images",
  icon: () => "🖼️",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "images",
      title: "Images",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "image",
              title: "Image",
              type: "image",
              options: {
                hotspot: true,
              },
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "credits",
              title: "Légende",
              type: "string",
              description: "Légende de l'image",
            }),
            defineField({
              name: "alt",
              title: "Balise alt",
              type: "string",
              description:
                "Description de l'image pour les moteurs de recherche",
              validation: (rule) => rule.required(),
            }),
          ],
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: "title",
      media: "images.0.image",
    },
  },
});
