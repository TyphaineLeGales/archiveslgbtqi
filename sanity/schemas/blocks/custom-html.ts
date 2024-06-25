import { defineField, defineType } from "sanity";
import { VscCode } from "react-icons/vsc";
import { title } from "process";

export default defineType({
  name: "custom-html",
  title: "Custom HTML",
  icon: VscCode,
  type: "object",
  fields: [
    defineField({
      name: "codeTitle",
      title: "Code Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "html",
      title: "HTML",
      type: "code",
      options: {
        language: "html",
        languageAlternatives: [{ title: "HTML", value: "html" }],
      },
    }),
  ],
  preview: {
    select: {
      title: "codeTitle",
      code: "html.code",
    },
    prepare: ({ code }) => ({
      title: "Custom HTML",
      subtitle: "Custom HTML",
    }),
  },
});
