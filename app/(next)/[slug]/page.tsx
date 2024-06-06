/* eslint-disable @next/next/no-img-element */
import { PagesContentQueryResult } from "@/sanity.types";
import { sanityFetch } from "@/sanity/lib/fetch";
import { pagesContentQuery } from "@/sanity/lib/queries";
import { groq } from "next-sanity";
import { notFound } from "next/navigation";
import React from "react";
import CustomImage from "../components/custom-image";

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
      <h1>{content?.title}</h1>
      {content?.sections?.map((section) => (
        <div key={section._id}>
          <h2>{section.title}</h2>
          {section?.content?.map((block) => (
            <div key={block._ref}>
              {block._type.includes("customImage") && (
                <CustomImage
                  imageUrl={block.imageUrl || ""}
                  title={block.title || ""}
                />
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
