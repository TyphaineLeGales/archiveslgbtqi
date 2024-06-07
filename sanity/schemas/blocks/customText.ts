import { TextIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export default defineType({
  name: "customText",
  title: "Text",
  icon: TextIcon,
  type: "document",
  fields: [
    defineField({
      name: "content",
      title: "Content",
      type: "text",
      validation: (rule) => rule.required(),
    }),
  ],
});
