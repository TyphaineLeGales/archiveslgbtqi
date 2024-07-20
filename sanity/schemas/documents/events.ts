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
      name: "eventDate",
      title: "Date",
      type: "object",
      fields: [
        defineField({
          name: "eventStartDate",
          title: "Commence le",
          type: "datetime",
          options: {
            dateFormat: "DD-MM-YYYY",
            timeStep: 15,
          },
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: "addEndDate",
          title: "Ajouter une date de fin",
          type: "boolean",
          description:
            "Ajouter une date de fin si la fin n'est pas le même jour.",
        }),
        defineField({
          name: "eventEndDate",
          title: "Termine le",
          type: "datetime",
          options: {
            dateFormat: "DD-MM-YYYY",
            timeStep: 15,
          },
          hidden: ({ parent }) => !(parent && parent.addEndDate),
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
