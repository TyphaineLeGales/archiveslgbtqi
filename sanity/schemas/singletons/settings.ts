import { CogIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export default defineType({
  name: "settings",
  title: "Settings",
  type: "document",
  icon: CogIcon,
  groups: [
    {
      title: "🔧 Global Settings",
      name: "globalSettings",
    },
    {
      title: "Header",
      name: "header",
    },
    {
      title: "Footer",
      name: "footer",
    },
  ],
  fields: [
    defineField({
      name: "globalSettings",
      title: "🔧 Global Settings",
      type: "object",
      group: "globalSettings",
      options: {
        collapsible: true,
        collapsed: true,
      },
      fields: [
        defineField({
          name: "siteTitle",
          title: "Titre du site internet",
          type: "string",
        }),
        defineField({
          name: "ogImage",
          title: "Open Graph Image",
          type: "image",
          description: "Affiché lors du partage sur les réseaux sociaux.",
          fields: [
            defineField({
              name: "alt",
              title: "Balise alt",
              description:
                "Description de l'image pour les moteurs de recherche.",
              type: "string",
              validation: (rule) => {
                return rule.custom((alt, context) => {
                  if ((context.document?.ogImage as any)?.asset?._ref && !alt) {
                    return "Required";
                  }
                  return true;
                });
              },
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: "header",
      title: "🔼 Header",
      type: "object",
      group: "header",
      options: {
        collapsible: true,
        collapsed: true,
      },
      fields: [
        defineField({
          name: "logo",
          title: "Logo pour le header",
          type: "image",
        }),
        defineField({
          name: "headerLinks",
          title: "Lien du header",
          type: "array",
          of: [
            {
              type: "object",
              title: "Link",
              fields: [
                defineField({
                  name: "type",
                  title: "Type of Link",
                  type: "string",
                  options: {
                    list: [
                      { title: "Internal", value: "internal" },
                      { title: "External", value: "external" },
                    ],
                  },
                }),
                defineField({
                  name: "linkPosition",
                  title: "Position du lien",
                  type: "string",
                  options: {
                    list: [
                      { title: "Left", value: "left" },
                      { title: "Right", value: "right" },
                    ],
                    layout: "radio",
                  },
                  validation: (Rule) => Rule.required(),
                }),
                defineField({
                  name: "internalLink",
                  title: "Lien vers une page interne",
                  type: "reference",
                  to: [{ type: "pages" }],
                  hidden: ({ parent }) => parent?.type !== "internal",
                }),
                defineField({
                  name: "externalLink",
                  title: "Lien vers une page externe",
                  type: "object",
                  fields: [
                    defineField({
                      name: "title",
                      title: "Title",
                      type: "string",
                    }),
                    defineField({
                      name: "url",
                      title: "URL",
                      type: "url",
                    }),
                  ],
                  hidden: ({ parent }) => parent?.type !== "external",
                }),
              ],
              preview: {
                select: {
                  title: "internalLink.title",
                  slug: "internalLink.slug.current",
                  type: "type",
                  externalTitle: "externalLink.title",
                  externalUrl: "externalLink.url",
                },
                prepare(selection) {
                  const { title, slug, type, externalTitle, externalUrl } =
                    selection;
                  if (type === "internal") {
                    return {
                      title: title || "No title selected",
                      subtitle: `Lien vers une page interne - /${slug}`,
                    };
                  } else {
                    return {
                      title: externalTitle || "No URL title",
                      subtitle: externalUrl
                        ? `Lien vers une page externe - URL: ${externalUrl}`
                        : "No URL",
                    };
                  }
                },
              },
            },
          ],
        }),
      ],
    }),
    defineField({
      name: "footer",
      title: "🔽 Footer",
      type: "object",
      group: "footer",
      options: {
        collapsible: true,
        collapsed: true,
      },
      fields: [
        defineField({
          name: "logo",
          title: "Logo pour le footer",
          type: "image",
        }),
        defineField({
          name: "addressGroup",
          title: "Adresse",
          type: "object",
          fields: [
            defineField({
              name: "addressTitle",
              title: "Titre de l'adresse",
              type: "string",
            }),
            defineField({
              name: "addressContent",
              title: "Adresse",
              type: "array",
              of: [{ type: "block" }],
            }),
            defineField({
              name: "mailAddress",
              title: "Adresse mail",
              type: "string",
            }),
          ],
        }),
        defineField({
          name: "socialGroup",
          title: "Réseaux sociaux",
          type: "array",
          of: [
            defineField({
              name: "socialBlock",
              title: "Réseau social",
              type: "object",
              fields: [
                defineField({
                  name: "socialName",
                  title: "Nom du réseau social",
                  type: "string",
                }),
                defineField({
                  name: "socialLink",
                  title: "Lien vers le réseau social",
                  type: "url",
                }),
              ],
            }),
          ],
        }),
        defineField({
          name: "footerLinks",
          title: "Liens du footer",
          type: "array",
          of: [moduleGroupstructure()], // Assume moduleGroupstructure returns the defined object structure for link groups
        }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "Settings",
        description: "Header, Footer, and other global settings.",
      };
    },
  },
});

function moduleGroupstructure() {
  return {
    type: "object",
    title: "Module Group",
    fields: [
      defineField({
        name: "groupName",
        title: "Titre du lien",
        type: "string",
      }),
      defineField({
        name: "modules",
        title: "Lien",
        type: "array",
        of: [
          {
            type: "object",
            title: "Link",
            fields: [
              defineField({
                name: "type",
                title: "Type de lien",
                type: "string",
                options: {
                  list: [
                    { title: "Interne", value: "internal" },
                    { title: "Externe", value: "external" },
                    { title: "Text", value: "text" },
                  ],
                },
              }),
              defineField({
                name: "internalLink",
                title: "Lien vers une page interne",
                type: "reference",
                to: [{ type: "pages" }],
                hidden: ({ parent }) => parent?.type !== "internal",
              }),
              defineField({
                name: "externalLink",
                title: "Lien vers une page externe",
                type: "object",
                fields: [
                  defineField({
                    name: "title",
                    title: "Title",
                    type: "string",
                  }),
                  defineField({
                    name: "url",
                    title: "URL",
                    type: "url",
                  }),
                ],
                hidden: ({ parent }) => parent?.type !== "external",
              }),
              defineField({
                name: "text",
                title: "Text",
                type: "string",
                hidden: ({ parent }) => parent?.type !== "text",
              }),
            ],
            preview: {
              select: {
                title: "internalLink.title",
                slug: "internalLink.slug.current",
                text: "text",
                type: "type",
                externalTitle: "externalLink.title",
                externalUrl: "externalLink.url",
              },
              prepare(selection) {
                const { title, slug, text, type, externalTitle, externalUrl } =
                  selection;
                if (type === "internal") {
                  return {
                    title: title || "No title selected",
                    subtitle: `Lien vers une page interne - /${slug}`,
                  };
                } else if (type === "text") {
                  return {
                    title: text || "No text",
                  };
                } else {
                  return {
                    title: externalTitle || "No URL title",
                    subtitle: externalUrl
                      ? `Lien vers une page externe - URL: ${externalUrl}`
                      : "No URL",
                  };
                }
              },
            },
          },
        ],
      }),
    ],
  };
}
