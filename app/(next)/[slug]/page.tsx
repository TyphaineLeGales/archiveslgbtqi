import { PagesContentQueryResult, PagesQueryResult } from "@/sanity.types";
import { sanityFetch } from "@/sanity/lib/fetch";
import { pagesContentQuery } from "@/sanity/lib/queries";
import { groq } from "next-sanity";
import { notFound } from "next/navigation";
import React from "react";

type Props = {
  params: { slug: string };
};

export default async function Page({ params }: Props) {
  const [content] = await Promise.all([
    // sanityFetch<PagesQueryResult>({
    //   query: pagesQuery,
    //   params,
    // }),
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
      <h1>{content?.title}</h1>
      {content?.contentBlock?.map((block) => (
        <div key={block.title}>
          <h2>{block.title}</h2>
        </div>
      ))}
    </div>
  );
}
