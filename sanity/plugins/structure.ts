/**
 *  What is this page for?
 *
 * This page is used to define the structure of the Sanity Studio.
 **/

import { StructureBuilder } from "sanity/structure";
import { fetchYears } from "../schemas/utils/fetchYears";

export const structure = async (S: StructureBuilder) => {
  const years = fetchYears();

  return S.list()
    .title("Content")
    .items([
      // 👇🏽 Settings
      S.documentListItem()
        .id("settings")
        .schemaType("settings")
        .title("Paramètres"),

      S.divider(),

      // 👇🏽 Home
      S.documentListItem()
        .id("homepage")
        .schemaType("homepage")
        .title("Page d'accueil"),

      S.divider(),

      // 👇🏽 Pages
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
          item.getId() !== "contact-form" &&
          item.getId() !== "lastEvent" &&
          item.getId() !== "creationArchives" &&
          item.getId() !== "custom-html" &&
          item.getId() !== "creative-module" &&
          item.getId() !== "creativeCtas" &&
          item.getId() !== "creativeIcon" &&
          item.getId() !== "creativeImage" &&
          item.getId() !== "creativeRichtext" &&
          item.getId() !== "liste-des-fonds-content" &&
          // hide Media from the Media Plugin
          item.getId() !== "media.tag",
      ),

      // 👇🏽 Blogs
      S.listItem()
        .title("Blogs")
        .icon(() => "📝")
        .child(
          // 👇🏽 List of blogs classified and sorted by year
          S.list()
            .title("Blogs")
            .items([
              // All blogs
              S.documentTypeListItem("blogs")
                .title("Tous les blogs")
                .child(
                  S.documentList()
                    .title("Tous les blogs")
                    .filter('_type == "blogs"')
                    .defaultOrdering([{ field: "year", direction: "desc" }]),
                ),
              S.divider(),
              // Blogs by year
              ...(await years).map((year) =>
                S.listItem()
                  .title(year)
                  .icon(() => "📅")
                  .child(
                    S.documentList()
                      .title(`Blogs de ${year}`)
                      .filter('_type == "blogs" && year == $year')
                      .params({ year }),
                  ),
              ),
            ]),
        ),

      // 👇🏽 Events
      S.divider(),
      S.listItem()
        .title("Agenda")
        .icon(() => "🗓️")
        .child(
          S.list()
            .title("Evénements")
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
    ]);
};
