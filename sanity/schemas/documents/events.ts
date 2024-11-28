import CustomStringInputWithLimits300 from "@/sanity/plugins/CustomStringInputWithLimits300";
import { defineField, defineType } from "sanity";

export default defineType({
  name: "events",
  title: "Agenda",
  type: "document",
  icon: () => "🗓️",
  fields: [
    defineField({
      name: "eventType",
      title: "Type de l'événement",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "eventTitle",
      title: "Titre de l'événement",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "eventEntrance",
      title: "Informations sur l'entrée",
      type: "string",
      description:
        'ℹ️ Ajoutez des informations sur l\'entrée. (ex: "Entrée libre", "Réservé aux adhérents"...)',
    }),
    defineField({
      name: "eventDescription2",
      title: "Paragraph",
      description: "Maximum 300 caractères",
      type: "text",
      components: {
        input: CustomStringInputWithLimits300,
      },
    }),
    defineField({
      name: "eventDate",
      title: "Date",
      type: "object",
      fields: [
        defineField({
          name: "eventDateType",
          title: "Type de date",
          type: "string",
          options: {
            list: [
              { title: "Date unique", value: "singleDate" },
              { title: "Période", value: "dateRange" },
            ],
            layout: "radio",
          },
        }),
        defineField({
          name: "eventStartDate",
          title: "Date de début",
          type: "datetime",
          options: {
            dateFormat: "DD-MM-YYYY",
            timeStep: 15,
          },
          // validation: (rule) => rule.required(),
          // if the eventType is "dateRange" or "singleDate" , the eventEndDate field will be displayed
          hidden: ({ parent }) => !parent?.eventDateType,
        }),

        defineField({
          name: "eventEndDate",
          title: "Date de fin",
          type: "datetime",
          options: {
            dateFormat: "DD-MM-YYYY",
            timeStep: 15,
          },
          hidden: ({ parent }) => !parent?.eventDateType,
        }),
      ],
    }),
    defineField({
      name: "eventLocation",
      title: "Lieux de l'événement",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "eventImage",
      title: "Image de l'événement",
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
          description:
            "Texte alternatif pour l'image, important pour l'accessibilité.",
          validation: (rule) => rule.required(),
        }),
      ],
    }),
  ],
  orderings: [
    {
      title: "Event Date",
      name: "eventDate",
      by: [{ field: "eventDate.eventStartDate", direction: "asc" }],
    },
  ],
  preview: {
    select: {
      title: "eventTitle",
      media: "eventImage.image",
      startDate: "eventDate.eventStartDate",
      endDate: "eventDate.eventEndDate",
    },
    prepare({ title, media, startDate, endDate }) {
      const formattedStartDate = new Date(startDate).toLocaleDateString(
        "fr-FR",
        {
          year: "numeric",
          month: "long",
          day: "numeric",
        },
      );

      let formattedEndDate = null;
      if (endDate) {
        formattedEndDate = new Date(endDate).toLocaleDateString("fr-Fr", {
          year: "numeric",
          month: "long",
          day: "numeric",
        });
      }

      return {
        title,
        media,
        subtitle: formattedEndDate
          ? `${formattedStartDate} - ${formattedEndDate}`
          : formattedStartDate,
      };
    },
  },
});
