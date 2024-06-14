import { PagesContentQueryResult } from "@/sanity.types";
import { sanityFetch } from "@/sanity/lib/fetch";
import { pagesContentQuery } from "@/sanity/lib/queries";
import { notFound } from "next/navigation";
import React from "react";
import CustomImage from "../components/custom-image";

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
  console.log("Pages Content:", content);

  return (
    <div className="container mx-auto min-h-screen px-5">
      <h1 className="text-4xl font-bold">{content.title}</h1>
      <div className="">
        {content.content?.map((item) => {
          if (item._type.includes("customText")) {
            return <p key={item._ref}>{item.content}</p>;
          }
          if (item._type.includes("customImage")) {
            return (
              <CustomImage
                key={item._ref}
                imageUrl={item.imageUrl || ""}
                title={item.title || ""}
              />
            );
          }
          if (item._type.includes("customExternalLink")) {
            return (
              <a
                key={item._ref}
                href={item.url || ""}
                target="_blank"
                rel="noreferrer"
                className="-"
              >
                {item.title}
              </a>
            );
          }
          return null;
        })}
      </div>
    </div>
  );
}
