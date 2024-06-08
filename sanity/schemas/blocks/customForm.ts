import { defineType } from "sanity";

export default defineType({
  name: "customForm",
  title: "Form Submission",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Name",
      type: "string",
    },
    {
      name: "email",
      title: "Email",
      type: "string",
    },
    {
      name: "message",
      title: "Message",
      type: "text",
    },
    {
      name: "file",
      title: "File",
      type: "string",
    },
  ],
});
