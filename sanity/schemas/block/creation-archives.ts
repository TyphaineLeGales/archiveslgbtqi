import { defineField, defineType } from "sanity";

export default defineType({
  name: "creationArchives",
  title: "Création d'archives",
  icon: () => "📜",
  type: "object",
  fields: [
    defineField({
      name: "intro",
      title: "Intro",
      type: "array",
      of: [{ type: "block" }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "archive",
      title: "Archive",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "title",
              title: "Titre de l'archive",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "description",
              title: "Description de l'archive",
              type: "array",
              of: [{ type: "block" }],
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "status",
              title: "Statut du projet",
              type: "string",
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {
            select: {
              title: "title",
            },
          },
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: "intro",
    },
  },
});
