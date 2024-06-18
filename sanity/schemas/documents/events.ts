import { CalendarIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

/**
 * This file is the schema definition for a pages.
 *
 * Here you'll be able to edit the different fields that appear when you 
 * create or edit a post in the studio.
 * 
 * Here you can see the different schema types that are available:

  https://www.sanity.io/docs/schema-types

 */

export default defineType({
  name: "events",
  title: "Events",
  icon: CalendarIcon,
  type: "document",
  fields: [
    defineField({
      name: "eventTitle",
      title: "Event Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      description: "A slug is required for the post to show up in the preview",
      options: {
        source: "eventTitle",
        maxLength: 96,
        isUnique: (value, context) => context.defaultIsUnique(value, context),
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "eventDate",
      title: "Event Date",
      type: "datetime",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "eventDescription",
      title: "Event Description",
      type: "text",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "eventLocation",
      title: "Event Location",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "eventImage",
      title: "Event Image",
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
    }),
  ],
  preview: {
    select: {
      title: "eventTitle",
      slug: "slug.current",
    },
  },
});
