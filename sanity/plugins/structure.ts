import { StructureBuilder } from "sanity/structure";

export const structure = (S: StructureBuilder) =>
  S.list()
    .title("Content")
    .items([
      // Make a singleton of the document with ID header”
      S.documentListItem().id("homepage").schemaType("homepage"),
      ...S.documentTypeListItems().filter((item) => item.getId() == "pages"),
      S.divider(),
      // Add the rest of the document types, but filter out the siteSettings type defined above
      ...S.documentTypeListItems().filter(
        (item) =>
          item.getId() !== "homepage" &&
          item.getId() !== "header" &&
          item.getId() !== "footer" &&
          item.getId() !== "pages" &&
          item.getId() !== "customText" &&
          item.getId() !== "customFile" &&
          item.getId() !== "customImage",
      ),
      S.divider(),
      S.documentListItem().id("header").schemaType("header"),
      S.documentListItem().id("footer").schemaType("footer"),
      //hidden document types
    ]);
