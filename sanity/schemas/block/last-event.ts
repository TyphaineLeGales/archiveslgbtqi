import { CalendarIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export default defineType({
  name: "lastEvent",
  title: "Last Event",
  icon: CalendarIcon,
  type: "object",
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
          name: "events",
          title: "Events",
          type: "array",
          initialValue: [
            {
              _type: "reference",
              _ref: "",
            },
          ],
          readOnly: true,
          hidden: ({ parent }) => !parent?.isDisplayed,
          of: [
            {
              type: "reference",
              initialValue: () => ({
                _type: "reference",
                _ref: "",
              }),
              readOnly: true,
              preview: {
                select: {
                  title: "eventTitle",
                  subtitle: "eventLocation",
                  media: "eventImage.image",
                },
              },
              options: {
                filter:
                  "_type == 'events' && defined(eventDate) && eventDate.eventStartDate > now()",
              },
              description: "List of upcoming events.",
              to: [{ type: "events" }],
            },
          ],
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
