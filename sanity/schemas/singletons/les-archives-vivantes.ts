import { defineField, defineType } from "sanity";
import { BookIcon } from "@sanity/icons";

export default defineType({
  name: "lesArchivesVivantes",
  title: "Les Archives Vivantes",
  type: "document",
  icon: BookIcon,
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      description: "A slug is required for the post to show up in the preview",
      options: {
        source: "title",
        maxLength: 96,
        isUnique: (value, context) => context.defaultIsUnique(value, context),
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "linkToVimeo",
      title: "Link to Vimeo",
      type: "url",
      description: "Link to the Vimeo video",
    }),
    defineField({
      name: "linkToPodcast",
      title: "Link to Podcast",
      type: "url",
      description: "Link to the Podcast",
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "Les Archives Vivantes",
      };
    },
  },
});
