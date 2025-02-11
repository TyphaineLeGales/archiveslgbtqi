import { title } from "process";
import { defineField, defineType } from "sanity";

export default defineType({
  name: "blogs",
  title: "Blogs",
  type: "document",
  icon: () => "📝",
  fields: [
    defineField({
      name: "title",
      title: "Titre",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "subTitle",
      title: "Second Titre",
      type: "string",
    }),
    defineField({
      name: "author",
      title: "Auteur du blog",
      type: "string",
    }),
    defineField({
      name: "year",
      title: "Année",
      description: "Année de publication. (Sert à naviguer dans les archives)",
      type: "string",
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: "date",
      title: "Date de publication",
      type: "datetime",
      options: {
        dateFormat: "DD-MM-YYYY",
        timeStep: 15,
      },
    }),
    defineField({
      name: "contentBlock",
      title: "Contenu du blog",
      type: "array",
      of: [
        {
          name: "richText",
          title: "Rich Text",
          type: "object",
          icon: () => "📝",
          fields: [
            defineField({
              name: "text",
              title: "Rich Text",
              type: "array",
              of: [{ type: "block" }],
              validation: (rule) => rule.required(),
            }),
          ],
        },
        {
          name: "singleImage",
          title: "Image Unique",
          icon: () => "🖼️",
          type: "object",
          fields: [
            {
              name: "image",
              title: "Image",
              type: "image",
              options: {
                hotspot: true,
              },
              validation: (rule) => rule.required(),
            },
            defineField({
              name: "alt",
              title: "Balise alt",
              description:
                "Description de l'image pour les moteurs de recherche.",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "credits",
              title: "Légende",
              type: "string",
              description: "Légende de l'image",
            }),
          ],
          preview: {
            select: {
              title: "title",
            },
            prepare({ title }) {
              return {
                title: "Image Unique",
              };
            },
          },
        },
        defineField({
          name: "multiImagesObject",
          title: "Multi-Images",
          icon: () => "🖼️",
          type: "object",
          fields: [
            defineField({
              name: "multiImages",
              title: "Images",
              type: "array",
              of: [
                {
                  type: "object",
                  fields: [
                    {
                      name: "image",
                      title: "Image",
                      type: "image",
                      options: {
                        hotspot: true,
                      },
                      validation: (rule) => rule.required(),
                    },
                    {
                      name: "alt",
                      title: "Balise alt",
                      type: "string",
                      description:
                        "Description de l'image pour les moteurs de recherche.",
                      validation: (rule) => rule.required(),
                    },
                  ],
                },
              ],
            }),
          ],
          preview: {
            select: {
              title: "title",
            },
            prepare({ title }) {
              return {
                title: "Multi-Images",
              };
            },
          },
        }),
        defineField({
          name: "links",
          title: "Liens",
          icon: () => "🔗",
          type: "object",
          fields: [
            defineField({
              name: "label",
              title: "Label du lien",
              type: "string",
            }),
            defineField({
              name: "type",
              type: "string",
              options: {
                layout: "radio",
                list: [
                  { title: "Interne", value: "internal" },
                  { title: "Externe", value: "external" },
                  { title: "Mail à:", value: "mail" },
                ],
              },
            }),
            defineField({
              name: "internal",
              title: "Lien interne",
              type: "reference",
              to: [{ type: "pages" }],
              hidden: ({ parent }) => parent?.type !== "internal",
            }),
            defineField({
              name: "external",
              title: "Lien externe",
              type: "url",
              validation: (Rule) =>
                Rule.uri({
                  scheme: ["http", "https", "mailto", "tel"],
                  allowRelative: true,
                }),
              hidden: ({ parent }) => parent?.type !== "external",
            }),
            defineField({
              name: "mail",
              title: "Adresse mail",
              type: "string",
              validation: (Rule) => Rule.email(),
              hidden: ({ parent }) => parent?.type !== "mail",
            }),
          ],
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: "title",
      media: "contentBlock",
      date: "date",
      author: "author",
    },
    prepare({ title, media = [], date, author }) {
      const formattedDate = new Intl.DateTimeFormat("fr-FR", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }).format(new Date(date));

      const singleImage = media.find(
        (block: { _type: any }) => block._type === "singleImage",
      )?.image;
      const multiImages = media.find(
        (block: { _type: any }) => block._type === "multiImagesObject",
      )?.multiImages;

      const image = singleImage || (multiImages && multiImages[0]?.image);

      return {
        title: title,
        media: image,
        subtitle: `${formattedDate} | ${author}`,
      };
    },
  },
});
