import { PagesContentQueryResult, SectionQueryResult } from "@/sanity.types";
import { sanityFetch } from "@/sanity/lib/fetch";
import { pagesContentQuery, sectionQuery } from "@/sanity/lib/queries";
import { groq } from "next-sanity";
import { notFound } from "next/navigation";
import React, { useRef } from "react";
import CustomImage from "../components/custom-image";
import Sections from "../components/sections";
import NavigationBar from "../components/navigation-bar";
import Pages from "../components/pages";

type Props = {
  params: { pages: string };
};

export default async function Page({ params }: Props) {
  const [content] = await Promise.all([
    sanityFetch<PagesContentQueryResult>({
      query: pagesContentQuery,
      params,
    }),
  ]);

  if (!content?._id) {
    return notFound();
  }
  console.log("content", content.sections?.[0]);

  return (
    <div className="container mx-auto min-h-screen px-5">
      <h1 className="pb-[5rem]">{content?.title}</h1>
      {/* {content?._id && <Sections content={content} />} */}
      {/* {content.sections?.map((section) => (
        <div key={section._id}>{section.title}</div>
      ))} */}
      {content.sections?.[0] && <div>{content.sections?.[0].title}</div>}
    </div>
  );
}
