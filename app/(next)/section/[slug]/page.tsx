import { SectionQueryResult } from "@/sanity.types";
import { sanityFetch } from "@/sanity/lib/fetch";
import { sectionQuery } from "@/sanity/lib/queries";
import { notFound } from "next/navigation";
import React from "react";

type Props = {
  params: { slug: string };
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
  return (
    <div>
      <h1>{section?.title}</h1>
      {section?.content?.map((block) => (
        <div key={block.title}>
          {block._type.includes("customImage") && (
            <div>
              <img src={block.imageUrl || ""} alt={block.title || ""} />
              <span>{block.url}</span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
