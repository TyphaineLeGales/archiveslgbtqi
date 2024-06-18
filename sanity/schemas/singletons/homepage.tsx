import { HomeIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

export default defineType({
  name: "homepage",
  title: "Home Page",
  type: "document",
  icon: HomeIcon,
  groups: [
    {
      title: "Hero",
      name: "hero",
    },
  ],
  fields: [
    defineField({
      name: "heroes",
      title: "Heroes",
      type: "array",
      group: "hero",
      of: [
        defineArrayMember({
          type: "object",
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
      validation: (Rule) =>
        Rule.max(3).warning("You can only have up to 3 heroes."),
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
