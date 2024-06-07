"use client";
import { PagesContentQueryResult } from "@/sanity.types";
import React, { useRef } from "react";
import CustomImage from "./custom-image";

type Props = {
  sectionRefs: React.MutableRefObject<
    Map<string, React.RefObject<HTMLDivElement>>
  >;
  content: PagesContentQueryResult;
};

export default function Sections({ content, sectionRefs }: Props) {
  // Assign ref for each section
  content?.sections?.forEach((section) => {
    if (!sectionRefs.current.has(section._id)) {
      sectionRefs.current.set(section._id, React.createRef());
    }
  });

  return (
    <div className="ml-[20%] flex flex-col">
      {content?.sections?.map((section) => (
        <div
          key={section._id}
          ref={sectionRefs.current.get(section._id)}
          className="h-auto border-b-[10px] border-black pb-[10rem]"
        >
          {/*  Text Content block type */}

          {section?.content?.map((block) => (
            <div key={block.title}>
              {block._type.includes("customText") && (
                <>
                  <p>{block.content}</p>
                </>
              )}
            </div>
          ))}
          {/*  customImage block type */}

          {section?.content?.map((block) => (
            <div key={block.title}>
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
          ))}

          {/*  customExternalLink block type */}

          {section?.content?.map((block) => (
            <div key={block.title}>
              {block._type.includes("customExternalLink") && (
                <>
                  <a href={block.url || ""}>{block.url}</a>
                </>
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
