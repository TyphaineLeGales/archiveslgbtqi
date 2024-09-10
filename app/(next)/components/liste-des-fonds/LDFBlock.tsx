"use client";
import React, { useState } from "react";
import { ListeDeFondsQueryResult } from "@/sanity.types";
import clsx from "clsx";
import {
  LinksModule,
  MultiImagesModule,
  RichTextModule,
  SingleImageModule,
} from "../modules";

type LDFBlockProps = {
  list: ListeDeFondsQueryResult;
};

export default function LDFBlock({ list }: LDFBlockProps) {
  const [listIndex, setListIndex] = useState<number | null>(null);
  let lastCategory = "";

  const handleClick = (index: number) => {
    setListIndex(listIndex === index ? null : index);
  };

  return (
    <div className="">
      {list?.contentModule?.map((item, index) => {
        const showCategory = item.category !== lastCategory;
        lastCategory = item.category || "";

        return (
          <div
            key={`${item.category}-${index}`}
            className="flex flex-col divide-y-[3px] divide-black border-b-[3px] border-black"
          >
            {showCategory && (
              <span
                id={item.category || ""}
                className="pageTitle mt-[3rem] pb-[1rem]"
              >
                {item.category}
              </span>
            )}
            <button
              aria-label="Boutton des Liste des fonds"
              onClick={() => handleClick(index)}
              className={clsx(
                "relative flex w-full flex-col items-start justify-start gap-[1rem] overflow-hidden py-[1rem] text-start transition-[colors,max-height] duration-[.5s] ease-tamisitée hover:bg-pink-arch",
                listIndex === index
                  ? "max-h-[70rem] pb-[1rem] hover:bg-white hover:text-black lg:max-h-[100rem]"
                  : "max-h-[3rem] hover:bg-pink-arch hover:text-white lg:max-h-[3rem]",
              )}
            >
              <div className="flex h-[4rem] w-full items-center justify-between gap-[1rem] lg:h-auto lg:px-[1rem]">
                <div className="ldfTitle flex items-center gap-[2rem] lg:mb-[.75rem]">
                  <h2
                    // className="whitespace-nowrap"
                    className={clsx(
                      listIndex === index
                        ? "whitespace-normal"
                        : "whitespace-nowrap",
                    )}
                  >
                    {item.titleBlock}
                  </h2>
                </div>
                <div
                  className={clsx(
                    "mb-[1.25rem] hidden text-[.8rem] leading-[.5rem] transition-transform duration-[.5s] ease-tamisitée lg:block",
                    listIndex === index ? "rotate-[135deg]" : "rotate-0",
                  )}
                >
                  +
                </div>
              </div>
              <div className="flex min-w-full flex-col space-y-[1rem]">
                {item.contenBlock?.map((block) => (
                  <div key={block._key}>
                    {block._type === "richtext" && (
                      <RichTextModule item={block} />
                    )}
                    {block._type === "single-image" && (
                      <SingleImageModule
                        imageUrl={block.imageUrl || ""}
                        imageTitle={block.imageTitle || ""}
                      />
                    )}
                    {block._type === "multi-images" && (
                      <MultiImagesModule item={block as any} />
                    )}
                    {block._type === "link" && (
                      <LinksModule item={block as any} />
                    )}
                  </div>
                ))}
              </div>
            </button>
          </div>
        );
      })}
    </div>
  );
}
