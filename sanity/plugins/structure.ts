import { StructureBuilder } from "sanity/structure";

export const structure = (S: StructureBuilder) =>
  S.list()
    .title("Content")
    .items([
      // Settings
      S.documentListItem().id("settings").schemaType("settings"),

      // Home
      S.divider(),
      S.documentListItem().id("homepage").schemaType("homepage"),

      // Pages
      ...S.documentTypeListItems().filter((item) => item.getId() == "pages"),
      S.divider(),

      // Add the rest of the document types, but filter out the siteSettings type defined above
      ...S.documentTypeListItems().filter(
        (item) =>
          // Singletons
          item.getId() !== "homepage" &&
          item.getId() !== "settings" &&
          item.getId() !== "pages" &&
          item.getId() !== "events" &&
          item.getId() !== "blogs" &&
          // Content
          item.getId() !== "content" &&
          // Blocks
          item.getId() !== "richtext" &&
          item.getId() !== "richTextAndTitle" &&
          item.getId() !== "document-file" &&
          item.getId() !== "single-image" &&
          item.getId() !== "multi-images" &&
          item.getId() !== "customExternalLink" &&
          item.getId() !== "link" &&
          item.getId() !== "lesArchivesVivantes" &&
          item.getId() !== "contact-form" &&
          item.getId() !== "lastEvent" &&
          item.getId() !== "creationArchives" &&
          item.getId() !== "custom-html" &&
          item.getId() !== "creative-module" &&
          item.getId() !== "creativeCtas" &&
          item.getId() !== "creativeIcon" &&
          item.getId() !== "creativeImage" &&
          item.getId() !== "creativeRichtext",
      ),

      // Blogs
      ...S.documentTypeListItems().filter((item) => item.getId() == "blogs"),

      // Events
      S.divider(),
      // ...S.documentTypeListItems().filter((item) => item.getId() == "events"),
      S.listItem()
        .title("Agenda")
        .icon(() => "🗓️")
        .child(
          S.list()
            .title("Events")
            .items([
              // All events
              S.documentTypeListItem("events").title("Tous les événements"),
              S.divider(),

              // Upcoming events
              S.listItem()
                .title("Évenements à venir")
                .icon(() => "➡️")
                .schemaType("events")
                .child(
                  S.documentList()
                    .title("Évenements à venir")
                    .apiVersion("2024-07-20")
                    .filter(
                      '_type == "events" && dateTime(eventDate.eventStartDate) >= dateTime(now())',
                    )
                    .params({ now: new Date().toISOString() }),
                ),

              // Past events
              S.listItem()
                .title("Évenements passés")
                .icon(() => "⬅️")
                .schemaType("events")
                .child(
                  S.documentList()
                    .title("Évenements passés")
                    .apiVersion("2024-07-20")
                    .filter(
                      '_type == "events" && dateTime(eventDate.eventStartDate) <= dateTime(now())',
                    )
                    .params({ now: new Date().toISOString() }),
                ),
            ]),
        ),
      S.divider(),

      // Les Archives Vivantes
      S.documentListItem()
        .id("lesArchivesVivantes")
        .schemaType("lesArchivesVivantes"),
      S.divider(),
    ]);
