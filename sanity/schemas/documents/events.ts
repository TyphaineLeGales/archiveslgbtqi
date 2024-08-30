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
      name: "eventDescription",
      title: "Description de l'événement",
      type: "array",
      of: [{ type: "block" }],
    }),

    defineField({
      name: "dateType",
      title: "Type de date",
      type: "string",
      options: {
        list: [
          { title: "Date unique", value: "single" },
          { title: "Plage de dates", value: "range" },
        ],
        layout: "radio",
      },
    }),
    defineField({
      name: "singleDateGroup",
      title: "Date unique",
      type: "object",
      hidden: ({ parent }) => parent && parent.dateType !== "single",
      fields: [
        defineField({
          name: "singleDate",
          title: "Date",
          type: "date",
          options: {
            dateFormat: "dd-mm-yyyy",
          },
        }),
        defineField({
          name: "singleStartTime",
          title: "Commence le",
          type: "string",
          description: "Heure de début de l'événement.",
          placeholder: "ex: 20h30",
        }),
        defineField({
          name: "addSingleEndTime",
          title: "Ajouter une heure de fin?",
          type: "boolean",
        }),
        defineField({
          name: "singleEndTime",
          title: "Termine le",
          type: "string",
          description: "Heure de fin de l'événement.",
          placeholder: "ex: 22h30",
          hidden: ({ parent }) => !(parent && parent.addSingleEndTime),
        }),
      ],
    }),
    defineField({
      name: "rangeDateGroup",
      title: "Plage de dates",
      type: "object",
      hidden: ({ parent }) => parent && parent.dateType !== "range",
      fields: [
        defineField({
          name: "rangeStartDate",
          title: "Commence le",
          type: "date",
          options: {
            dateFormat: "DD-MM-YYYY",
          },
        }),
        defineField({
          name: "addRangeStartTime",
          title: "Ajouter une heure de début?",
          type: "boolean",
        }),
        defineField({
          name: "rangeStartTime",
          title: "Heure de début",
          type: "string",
          description: "Heure de début de l'événement.",
          placeholder: "ex: 20h30",
          hidden: ({ parent }) => !(parent && parent.addRangeStartTime),
        }),
        defineField({
          name: "rangeEndDate",
          title: "Termine le",
          type: "date",
          options: {
            dateFormat: "DD/MM/YYYY",
          },
        }),
        defineField({
          name: "addRangeEndTime",
          title: "Ajouter une heure de fin?",
          type: "boolean",
        }),
        defineField({
          name: "rangeEndTime",
          title: "Termine le",
          type: "string",
          description: "Heure de fin de l'événement.",
          placeholder: "ex: 22h30",
          hidden: ({ parent }) => !(parent && parent.addRangeEndTime),
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
      by: [{ field: "eventDate.eventStartDate", direction: "desc" }],
    },
  ],
  preview: {
    select: {
      title: "eventTitle",
      media: "eventImage.image",
      startDate: "eventDate.eventStartDate",
      endDate: "eventDate.eventEndDate",
      addEndDate: "eventDate.addEndDate",
    },
    prepare({ title, media, startDate, endDate, addEndDate }) {
      const formattedStartDate = new Date(startDate).toLocaleDateString(
        "fr-FR",
        {
          year: "numeric",
          month: "long",
          day: "numeric",
        },
      );

      let formattedEndDate = null;
      if (addEndDate && endDate) {
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
