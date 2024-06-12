"use client";
import { PagesContentQueryResult, SectionQueryResult } from "@/sanity.types";
import React, { useRef } from "react";
import CustomImage from "./custom-image";

type Props = {
  section: SectionQueryResult;
};

export default function Sections({ section }: Props) {
  return (
    <div className="ml-[20%] flex flex-col">
      <h1 className="pb-[2rem] text-[3rem] font-bold uppercase leading-[2.5rem] tracking-tighter">
        {section?.title}
      </h1>
      {section?.content?.map((block) => (
        <div key={block.title}>
          {/*  Text Content block type */}
          <div>
            {block._type.includes("customText") && (
              <>
                <p>{block.content}</p>
              </>
            )}
          </div>

          {/*  customImage block type */}
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

          {/*  customExternalLink block type */}
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
  );
}
