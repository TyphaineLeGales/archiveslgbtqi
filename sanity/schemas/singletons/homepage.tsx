import { HomeIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

export default defineType({
  name: "homepage",
  title: "Home Page",
  type: "document",
  icon: HomeIcon,
  fields: [
    defineField({
      type: "object",
      name: "hero",
      title: "Hero",
      fields: [
        defineField({
          name: "heading",
          title: "Header",
          type: "string",
        }),
        defineField({
          name: "description",
          title: "Description",
          type: "text",
        }),
        defineField({
          name: "image",
          title: "Image",
          type: "image",
        }),
        defineField({
          name: "ctatext",
          title: "Call to Action Text",
          type: "string",
        }),
        defineField({
          name: "cta",
          title: "Call to Action",
          type: "reference",
          to: [{ type: "pages" }],
        }),
      ],
    }),
    defineField({
      name: "modules",
      title: "Modules",
      type: "array",
      of: [
        defineArrayMember({
          type: "reference",
          to: [{ type: "sections" }],
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
