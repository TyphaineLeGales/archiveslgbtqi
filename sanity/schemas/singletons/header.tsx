import { DoubleChevronUpIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

import * as demo from "@/sanity/lib/demo";

export default defineType({
  name: "header",
  title: "Header",
  type: "document",
  icon: DoubleChevronUpIcon,
  fields: [
    defineField({
      name: "logo",
      description: "This is the logo of your website.",
      title: "Logo",
      type: "image",
    }),
    defineField({
      name: "links",
      description: "This all the links for you header.",
      title: "Links",
      type: "array",
      of: [
        {
          type: "reference",
          title: "Link",
          to: [{ type: "pages" }],
        },
      ],
    }),
    defineField({
      name: "ogImage",
      title: "Open Graph Image",
      type: "image",
      description: "Displayed on social cards and search engine results.",
      options: {
        hotspot: true,
        aiAssist: {
          imageDescriptionField: "alt",
        },
      },
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
  preview: {
    prepare() {
      return {
        title: "Header",
      };
    },
  },
});
