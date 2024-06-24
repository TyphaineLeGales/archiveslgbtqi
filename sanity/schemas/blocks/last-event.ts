import { CalendarIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export default defineType({
  name: "lastEvent",
  title: "Last Event",
  icon: CalendarIcon,
  type: "document",
  fields: [
    defineField({
      name: "event",
      title: "Event",
      type: "object",
      fields: [
        defineField({
          name: "isDisplayed",
          title: "Is Displayed?",
          type: "boolean",
          description: "Check this box to display this event on the website.",
        }),
        defineField({
          name: "title",
          title: "Title",
          type: "string",
          hidden: ({ parent }) => !parent?.isDisplayed,
        }),
        defineField({
          name: "ctaToEvents",
          title: "CTA to Events",
          type: "string",
          description:
            "The text for the call-to-action button that links to the events page.",
          hidden: ({ parent }) => !parent?.isDisplayed,
        }),
      ],
      preview: {
        select: {
          title: "title",
          isDisplayed: "isDisplayed",
        },
        prepare: ({ title, isDisplayed }) => ({
          title: title || "Untitled",
          subtitle: isDisplayed ? "Displayed" : "Not Displayed",
        }),
      },
    }),
  ],
  preview: {
    select: {
      title: "event.title",
      isDisplayed: "event.isDisplayed",
    },
    prepare: ({ title, isDisplayed }) => ({
      title: title || "Untitled",
      subtitle: isDisplayed ? "Displayed" : "Not Displayed",
    }),
  },
});
