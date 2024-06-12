import { PagesContentQueryResult, SectionQueryResult } from "@/sanity.types";
import { sanityFetch } from "@/sanity/lib/fetch";
import { pagesContentQuery, sectionQuery } from "@/sanity/lib/queries";
import { groq } from "next-sanity";
import { notFound } from "next/navigation";
import React, { useRef } from "react";
import CustomImage from "../../components/custom-image";
import Sections from "../../components/sections";

type Props = {
  params: { pages: string };
};

export default async function Page({ params }: Props) {
  const [section] = await Promise.all([
    sanityFetch<SectionQueryResult>({
      query: sectionQuery,
      params,
    }),
  ]);

  if (!section?._id) {
    return notFound();
  }
  console.log("content from Child:", section.content);

  return (
    <div className="container mx-auto min-h-screen px-5">
      <Sections section={section} />
    </div>
  );
}
