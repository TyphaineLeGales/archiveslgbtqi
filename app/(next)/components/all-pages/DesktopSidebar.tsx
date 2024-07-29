"use client";

import { PagesContentQueryResult } from "@/sanity.types";
import React, { useState } from "react";

import clsx from "clsx";

import { transformId } from "../../utils/TransforId";

type Props = {
  content: PagesContentQueryResult;
};

export default function DesktopSidebar({ content }: Props) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const handleClickScroll = (
    e: React.MouseEvent<HTMLButtonElement>,
    index: number,
  ) => {
    e.preventDefault();
    setActiveIndex(index);
    const target = e.target as HTMLButtonElement;
    const id = target.textContent;
    const transformedId = transformId(id!);
    const element = document.getElementById(transformedId);

    if (element) {
      if (index === 0) {
        // Scroll to top for the first element
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        // For other elements, add 5rem margin top
        const yOffset = -182.5; // 5rem = 80px
        const y =
          element.getBoundingClientRect().top + window.scrollY + yOffset;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
    }

    // console.log("Clicked on:", transformedId);
  };

  const firstTitleBlock = content?.contentModulde?.[0]?.titleBlock;

  return (
    <div className="fixed left-0 top-[7.25rem] ml-[3rem] mt-[3rem] hidden h-auto flex-col items-start justify-start gap-[1rem] lg:flex">
      {content?.contentModulde?.map((item, index) => (
        <>
          {item.titleBlock && (
            <button
              key={item.titleBlock}
              onClick={(e) => handleClickScroll(e, index)}
              className={clsx(
                "sidebarButton",
                index === activeIndex ? "text-pink-arch" : "text-black",
              )}
            >
              {item.titleBlock}
            </button>
          )}
        </>
      ))}
    </div>
  );
}
