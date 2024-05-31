import { PagesQueryResult, PagesSlugsQueryResult } from "@/sanity.types";
import { sanityFetch } from "@/sanity/lib/fetch";
import { pagesQuery } from "@/sanity/lib/queries";
import { groq } from "next-sanity";
import { notFound } from "next/navigation";
import React from "react";

type Props = {
  params: { slug: string };
};

const pagesSlugsQuery = groq`*[_type == "pages"]{slug}`;

export async function generateStaticParams() {
  const params = await sanityFetch<PagesSlugsQueryResult>({
    query: pagesSlugsQuery,
    perspective: "published",
    stega: false,
  });
  return params.map(({ slug }) => ({ slug: slug?.current }));
}

export default async function Page({ params }: Props) {
  const [pages] = await Promise.all([
    sanityFetch<PagesQueryResult>({
      query: pagesQuery,
      params,
    }),
  ]);

  if (!pages?._id) {
    return notFound();
  }

  console.log(pages);

  return (
    <div className="container mx-auto px-5">
      <h1>{pages?.title}</h1>
    </div>
  );
}
