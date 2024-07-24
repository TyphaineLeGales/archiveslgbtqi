import { HomeIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

export default defineType({
  name: "homepage",
  title: "Home Page",
  type: "document",
  icon: () => "🏠",
  groups: [
    {
      title: "Caroussel d'images",
      name: "hero",
    },
    {
      title: "Deuxième section",
      name: "secondPart",
    },
    {
      title: "Texte d'introduction",
      name: "introText",
    },
    {
      title: "Outro",
      name: "outro",
    },
  ],
  fields: [
    // Hero
    defineField({
      name: "hero",
      title: "1️⃣ Caroussel d'images",
      type: "object",
      group: "hero",
      description:
        "Cette section est dédiée aux modules du carousell d'images de la page d'accueil.",
      options: {
        collapsible: true,
        collapsed: true,
      },
      fields: [
        defineField({
          name: "hero",
          title: "Block",
          type: "array",
          of: [
            defineArrayMember({
              type: "object",
              preview: {
                select: {
                  title: "title",
                  media: "image.image",
                },
              },
              fields: [
                defineField({
                  name: "title",
                  title: "Title",
                  type: "string",
                }),
                defineField({
                  name: "paragraph",
                  title: "Paragraph",
                  type: "text",
                }),
                defineField({
                  name: "image",
                  title: "Image",
                  type: "object",
                  fields: [
                    defineField({
                      name: "image",
                      title: "Image",
                      type: "image",
                    }),
                    defineField({
                      name: "alt",
                      title: "Alt Text",
                      type: "string",
                    }),
                  ],
                }),
                defineField({
                  name: "cta",
                  title: "Call to Action",
                  type: "object",
                  fields: [
                    defineField({
                      name: "ctaLabel",
                      title: "CTA Label",
                      type: "string",
                    }),
                    defineField({
                      name: "ctaLink",
                      title: "CTA Link",
                      type: "reference",
                      to: [{ type: "pages" }],
                    }),
                  ],
                }),
              ],
            }),
          ],
        }),
      ],
    }),
    // Second part
    defineField({
      name: "secondPart",
      title: "2️⃣ Deuxième section",
      type: "object",
      description:
        "Cette section est dédiée à la deuxième section de la page d'accueil.",
      group: "secondPart",
      options: {
        collapsible: true,
        collapsed: true,
      },
      fields: [
        defineField({
          name: "block",
          title: "Block",
          type: "array",
          of: [
            defineArrayMember({
              type: "object",
              preview: {
                select: {
                  title: "title",
                  media: "image.image",
                },
              },
              fields: [
                defineField({
                  name: "title",
                  title: "Title",
                  type: "string",
                }),
                defineField({
                  name: "paragraph",
                  title: "Paragraph",
                  type: "text",
                }),
                defineField({
                  name: "image",
                  title: "Image",
                  type: "object",
                  fields: [
                    defineField({
                      name: "image",
                      title: "Image",
                      type: "image",
                    }),
                    defineField({
                      name: "alt",
                      title: "Alt Text",
                      type: "string",
                    }),
                  ],
                }),
                defineField({
                  name: "cta",
                  title: "Call to Action",
                  type: "object",
                  fields: [
                    defineField({
                      name: "ctaLabel",
                      title: "CTA Label",
                      type: "string",
                    }),
                    defineField({
                      name: "ctaLink",
                      title: "CTA Link",
                      type: "reference",
                      to: [{ type: "pages" }],
                    }),
                  ],
                }),
              ],
            }),
          ],
        }),
      ],
    }),
    // Text d'intro
    defineField({
      name: "introText",
      title: "3️⃣ Texte d'introduction & Newsletter",
      type: "object",
      group: "",
      options: {
        collapsible: true,
        collapsed: true,
      },
      fields: [
        defineField({
          name: "introTextContent",
          title: "Texte d'introduction",
          type: "array",
          of: [{ type: "block" }],
        }),
        defineField({
          name: "newsletterTextContent",
          title: "Titre de la newsletter",
          type: "string",
        }),
      ],
    }),
    // Outro
    defineField({
      name: "outro",
      title: "Outro",
      type: "object",
      group: "outro",
      options: {
        collapsible: true,
        collapsed: true,
      },
      fields: [
        defineField({
          name: "outroTitle",
          title: "Outro Title",
          type: "string",
        }),
        defineField({
          name: "outroText",
          title: "Outro Text",
          type: "array",
          of: [{ type: "block" }],
        }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "Home Page",
      };
    },
  },
});
