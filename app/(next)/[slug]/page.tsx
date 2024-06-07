import { PagesContentQueryResult } from "@/sanity.types";
import { sanityFetch } from "@/sanity/lib/fetch";
import { pagesContentQuery } from "@/sanity/lib/queries";
import { groq } from "next-sanity";
import { notFound } from "next/navigation";
import React, { useRef } from "react";
import CustomImage from "../components/custom-image";
import Sections from "../components/sections";
import NavigationBar from "../components/navigation-bar";
import Pages from "../components/pages";

type Props = {
  params: { slug: string };
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
  console.log("content", content);

  return (
    <div className="container mx-auto min-h-screen px-5">
      <h1 className="pb-[5rem]">{content?.title}</h1>
      {content?._id && <Pages content={content} />}
    </div>
  );
}
