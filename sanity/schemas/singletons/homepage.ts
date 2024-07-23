import { HomeIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

export default defineType({
  name: "homepage",
  title: "Home Page",
  type: "document",
  icon: HomeIcon,
  groups: [
    {
      title: "Hero",
      name: "hero",
    },
    {
      title: "Multi Block",
      name: "Multi-Block",
    },
    {
      title: "Vidéo",
      name: "video",
    },
    {
      title: "Outro",
      name: "outro",
    },
  ],
  fields: [
    // Hero
    defineField({
      name: "hero",
      title: "Hero",
      type: "object",
      group: "hero",
      options: {
        collapsible: true,
        collapsed: true,
      },
      fields: [
        defineField({
          name: "hero",
          title: "Hero",
          type: "array",
          of: [
            defineArrayMember({
              type: "object",
              preview: {
                select: {
                  title: "title",
                  media: "image.image",
                },
              },
              fields: [
                defineField({
                  name: "title",
                  title: "Title",
                  type: "string",
                }),
                defineField({
                  name: "paragraph",
                  title: "Paragraph",
                  type: "text",
                }),
                defineField({
                  name: "image",
                  title: "Image",
                  type: "object",
                  fields: [
                    defineField({
                      name: "image",
                      title: "Image",
                      type: "image",
                    }),
                    defineField({
                      name: "alt",
                      title: "Alt Text",
                      type: "string",
                    }),
                  ],
                }),
                defineField({
                  name: "cta",
                  title: "Call to Action",
                  type: "object",
                  fields: [
                    defineField({
                      name: "ctaLabel",
                      title: "CTA Label",
                      type: "string",
                    }),
                    defineField({
                      name: "ctaLink",
                      title: "CTA Link",
                      type: "reference",
                      to: [{ type: "pages" }],
                    }),
                  ],
                }),
              ],
            }),
          ],
        }),
      ],
    }),
    // Multi-Block
    defineField({
      name: "multiBlock",
      title: "Multi-Block",
      type: "object",
      group: "Multi-Block",
      options: {
        collapsible: true,
        collapsed: true,
      },
      fields: [
        defineField({
          name: "eventsBlock",
          title: "Events",
          type: "object",
          options: {
            collapsible: true,
            collapsed: true,
          },
          fields: [
            defineField({
              name: "events",
              title: "Events",
              type: "array",
              of: [
                {
                  type: "reference",
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
          ],
        }),
        defineField({
          name: "lesArchivesVivantesBlock",
          title: "Les Archives Vivantes",
          type: "object",
          options: {
            collapsible: true,
            collapsed: true,
          },
          fields: [
            defineField({
              name: "title",
              title: "Title",
              type: "string",
            }),
            defineField({
              name: "podcast",
              title: "Podcast",
              type: "object",
              fields: [
                defineField({
                  name: "podcastTitle",
                  title: "Podcast Title",
                  type: "string",
                  description: "Use the the link label.",
                }),
                defineField({
                  name: "linkToPodcast",
                  title: "Link to Podcast",
                  type: "url",
                }),
              ],
            }),
            defineField({
              name: "vimeo",
              title: "Vimeo",
              type: "object",
              options: {
                collapsible: true,
                collapsed: true,
              },
              fields: [
                defineField({
                  name: "vimeoTitle",
                  title: "Vimeo Title",
                  type: "string",
                  description: "Use the the link label.",
                }),
                defineField({
                  name: "linkToVimeo",
                  title: "Link to Vimeo",
                  type: "url",
                }),
              ],
            }),
          ],
        }),
        defineField({
          name: "leBlogBlock",
          title: "Le Blog",
          type: "object",
          options: {
            collapsible: true,
            collapsed: true,
          },
          fields: [
            defineField({
              name: "title",
              title: "Title",
              type: "string",
            }),
            defineField({
              name: "linkToBlog",
              title: "Link to Blog",
              type: "reference",
              to: [{ type: "blogs" }],
            }),
            defineField({
              name: "blogLabel",
              title: "Blog Label",
              type: "string",
            }),
          ],
        }),
      ],
    }),
    // Vidéo
    defineField({
      name: "video",
      title: "Vidéo",
      type: "object",
      group: "video",
      options: {
        collapsible: true,
        collapsed: true,
      },
      fields: [
        defineField({
          name: "videoTitle",
          title: "Title",
          type: "string",
        }),
        defineField({
          name: "videoLink",
          title: "Video Link",
          type: "url",
        }),
      ],
    }),
    // Outro
    defineField({
      name: "outro",
      title: "Outro",
      type: "object",
      group: "outro",
      options: {
        collapsible: true,
        collapsed: true,
      },
      fields: [
        defineField({
          name: "outroTitle",
          title: "Outro Title",
          type: "string",
        }),
        defineField({
          name: "outroText",
          title: "Outro Text",
          type: "array",
          of: [{ type: "block" }],
        }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "Home Page",
      };
    },
  },
});
