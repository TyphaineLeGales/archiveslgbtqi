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
          title: "Site Title",
          type: "string",
          description: "The title of your website.",
        }),
        defineField({
          name: "ogImage",
          title: "Open Graph Image",
          type: "image",
          description: "Displayed on social cards and search engine results.",
          fields: [
            defineField({
              name: "alt",
              description: "Important for accessibility and SEO.",
              title: "Alternative text",
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
      title: "Header",
      type: "object",
      group: "header",
      options: {
        collapsible: true,
        collapsed: true,
      },
      fields: [
        defineField({
          name: "logo",
          description: "This is the logo of your website.",
          title: "Logo",
          type: "image",
        }),
        defineField({
          name: "headerLinks",
          description: "This all the links for your header.",
          title: "Header Links",
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
                  title: "Internal Link",
                  type: "reference",
                  to: [{ type: "pages" }],
                  hidden: ({ parent }) => parent?.type !== "internal",
                }),
                defineField({
                  name: "externalLink",
                  title: "External Link",
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
                      subtitle: `Internal Link - /${slug}`,
                    };
                  } else {
                    return {
                      title: externalTitle || "No URL title",
                      subtitle: externalUrl
                        ? `External Link - URL: ${externalUrl}`
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
      title: "Footer",
      type: "object",
      group: "footer",
      options: {
        collapsible: true,
        collapsed: true,
      },
      fields: [
        defineField({
          name: "moduleGroups",
          title: "Module Groups",
          type: "array",
          description: "Manage groups of module for the footer.",
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
        title: "Group Name",
        type: "string",
      }),
      defineField({
        name: "modules",
        title: "Modules",
        type: "array",
        of: [
          {
            type: "object",
            title: "Link",
            fields: [
              defineField({
                name: "type",
                title: "Type of Module",
                type: "string",
                options: {
                  list: [
                    { title: "Internal", value: "internal" },
                    { title: "External", value: "external" },
                    { title: "Text", value: "text" },
                  ],
                },
              }),
              defineField({
                name: "internalLink",
                title: "Internal Link",
                type: "reference",
                to: [{ type: "pages" }],
                hidden: ({ parent }) => parent?.type !== "internal",
              }),
              defineField({
                name: "externalLink",
                title: "External Link",
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
                    subtitle: `Internal Link - /${slug}`,
                  };
                } else if (type === "text") {
                  return {
                    title: text || "No text",
                  };
                } else {
                  return {
                    title: externalTitle || "No URL title",
                    subtitle: externalUrl
                      ? `External Link - URL: ${externalUrl}`
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
