import { defineField, defineType } from "sanity";

export default defineType({
  name: "blogs",
  title: "Blogs",
  type: "document",
  icon: () => "📝",
  fields: [
    defineField({
      name: "blogTitle",
      title: "Blog Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      description: "A slug is required for the post to show up in the preview",
      options: {
        source: "blogTitle",
        maxLength: 96,
        isUnique: (value, context) => context.defaultIsUnique(value, context),
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "blogContentText",
      title: "Blog Content Text",
      type: "array",
      of: [{ type: "block" }],
      validation: (rule) => rule.required(),
    }),
    // array of of images
    defineField({
      name: "blogImages",
      title: "Blog Images",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "image",
              title: "Image",
              type: "image",
              options: {
                hotspot: true,
              },
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "alt",
              title: "Alt",
              type: "string",
              validation: (rule) => rule.required(),
            }),
          ],
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: "blogTitle",
      media: "blogImages.0.image",
      slug: "slug",
    },
  },
});
