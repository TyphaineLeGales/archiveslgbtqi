import { defineField, defineType } from "sanity";

export default defineType({
  name: "custom-html",
  title: "Custom HTML",
  icon: () => "📄",
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
    defineField({
      name: "isAddFiles",
      title: "Add Files?",
      type: "boolean",
      description: "Add files. (e.g. transcription files)",
    }),
    defineField({
      name: "fileGroup",
      title: "File Group",
      type: "array",
      hidden: ({ parent }) => !parent?.isAddFiles,
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "title",
              title: "Title",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "files",
              title: "Files",
              type: "array",
              of: [{ type: "file" }],
            }),
          ],
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: "fileGroup.title",
      code: "html.code",
    },
    prepare: ({ code }) => ({
      title: "Custom HTML",
      subtitle: "Custom HTML",
    }),
  },
});
