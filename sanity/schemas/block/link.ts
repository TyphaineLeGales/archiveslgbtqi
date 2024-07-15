import { defineField, defineType } from "sanity";
import { LinkIcon } from "@sanity/icons";

export default defineType({
  name: "link",
  title: "Link",
  icon: LinkIcon,
  type: "object",

  fields: [
    defineField({
      name: "label",
      type: "string",
    }),
    defineField({
      name: "type",
      type: "string",
      options: {
        layout: "radio",
        list: [
          { title: "internal", value: "internal" },
          { title: "external", value: "external" },
          { title: "mail", value: "mail" },
        ],
      },
    }),
    defineField({
      name: "internal",
      type: "reference",
      to: [{ type: "pages" }],
      hidden: ({ parent }) => parent?.type !== "internal",
    }),
    defineField({
      name: "external",
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
      type: "string",
      validation: (Rule) => Rule.email(),
      hidden: ({ parent }) => parent?.type !== "mail",
    }),
  ],
  preview: {
    select: {
      label: "label",
      _type: "internal._type",
      title: "internal.title",
      slug: "internal.metadata.slug.current",
      external: "external",
      params: "params",
    },
    prepare: ({ label, _type, title, slug, external, params }) => ({
      title: label || title,
      subtitle: [
        _type === "blog.post" ? "/blog" : null,
        external || (slug && (slug === "index" ? "/" : `/${slug}`)),
        params,
      ]
        .filter(Boolean)
        .join(""),
    }),
  },
});
