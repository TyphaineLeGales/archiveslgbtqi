"use client";

import React from "react";
import { MainPagesContentQueryResult } from "@/sanity.types";

type Props = {
  content: MainPagesContentQueryResult;
};

export default function DesktopNavigationBar({ content }: Props) {
  const handleClickScroll = (
    e: React.MouseEvent<HTMLButtonElement>,
    index: number,
  ) => {
    e.preventDefault();
    const target = e.target as HTMLButtonElement;
    const id = target.textContent;
    const element = document.getElementById(id!);

    if (element) {
      if (index === 0) {
        // Scroll to top for the first element
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        // For other elements, add 5rem margin top
        const yOffset = -80; // 5rem = 80px
        const y =
          element.getBoundingClientRect().top + window.scrollY + yOffset;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
    }
  };

  return (
    <div className="fixed hidden w-[25%] flex-col items-start gap-[1rem] whitespace-nowrap px-[1rem] pt-[2rem] lg:flex">
      {content?.content?.map((item, index) => (
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
