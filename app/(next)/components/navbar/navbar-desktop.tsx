"use client";

import { PagesContentQueryResult } from "@/sanity.types";
import React from "react";
import { transformId } from "../../utils/TransforId";

type Props = {
  content: PagesContentQueryResult;
};

export default function DesktopNavigationBar({ content }: Props) {
  const handleClickScroll = (
    e: React.MouseEvent<HTMLButtonElement>,
    index: number,
  ) => {
    e.preventDefault();
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
        const yOffset = -120; // 5rem = 80px
        const y =
          element.getBoundingClientRect().top + window.scrollY + yOffset;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
    }

    console.log("Clicked on:", transformedId);
  };

  return (
    <div className="fixed hidden w-[25%] flex-col items-start gap-[1rem] whitespace-nowrap px-[1rem] pt-[2rem] lg:flex">
      {content?.contentModulde?.map((item, index) => (
        <button
          key={item.titleBlock}
          onClick={(e) => handleClickScroll(e, index)}
        >
          {item.titleBlock}
        </button>
      ))}
    </div>
  );
}
