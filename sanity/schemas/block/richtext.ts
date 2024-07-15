import { TextIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export default defineType({
  name: "richtext",
  title: "Rich Text",
  icon: TextIcon,
  type: "object",
  fields: [
    defineField({
      name: "text",
      title: "Text",
      type: "array",
      of: [{ type: "block" }],
      validation: (rule) => rule.required(),
    }),
  ],
});
