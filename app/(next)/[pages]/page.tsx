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
  console.log("content from Parent:", content);

  return (
    <div className="container mx-auto min-h-screen px-5">
      {/* {content.sections?.map((section) => (
        <div key={section.title} className="ml-[20%] flex flex-col">
          <h1 className="pb-[2rem] text-[3rem] font-bold uppercase leading-[2.5rem] tracking-tighter">
            {section.title}
          </h1>
          {section.content?.map((block) => (
            <div key={block.title}>
              <div>
                {block._type.includes("customText") && (
                  <>
                    <p>{block.content}</p>
                  </>
                )}
              </div>

              <div>
                {block._type.includes("customImage") && (
                  <>
                    <CustomImage
                      imageUrl={block.imageUrl || ""}
                      title={block.title || ""}
                    />
                    <span>{block.url}</span>
                  </>
                )}
              </div>

              <div className="flex">
                {block._type.includes("customExternalLink") && (
                  <a
                    href={block.url || ""}
                    target="_blank"
                    rel="noreferrer"
                    className="-"
                  >
                    {block.title}
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      ))} */}
      {/* display only the first content from content.sections */}
      <div className="ml-[20%] flex flex-col">
        <h1 className="pb-[2rem] text-[3rem] font-bold uppercase leading-[2.5rem] tracking-tighter">
          {content.sections && content.sections[0]?.title}
        </h1>
        {content.sections &&
          content.sections[0]?.content?.map((block) => (
            <div key={block.title}>
              <div>
                {block._type.includes("customText") && (
                  <>
                    <p>{block.content}</p>
                  </>
                )}
              </div>

              <div>
                {block._type.includes("customImage") && (
                  <>
                    <CustomImage
                      imageUrl={block.imageUrl || ""}
                      title={block.title || ""}
                    />
                    <span>{block.url}</span>
                  </>
                )}
              </div>

              <div className="flex">
                {block._type.includes("customExternalLink") && (
                  <a
                    href={block.url || ""}
                    target="_blank"
                    rel="noreferrer"
                    className="-"
                  >
                    {block.title}
                  </a>
                )}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
