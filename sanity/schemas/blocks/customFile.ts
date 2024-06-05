import { UserIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export default defineType({
  name: "customFile",
  title: "Custom File",
  icon: UserIcon,
  type: "document",
  fields: [
    defineField({
      title: "Poster",
      name: "poster",
      type: "image",
      options: {
        hotspot: true, // <-- Defaults to false
      },
      fields: [
        {
          name: "caption",
          type: "string",
          title: "Caption",
        },
        {
          name: "attribution",
          type: "string",
          title: "Attribution",
        },
      ],
    }),
  ],
});
