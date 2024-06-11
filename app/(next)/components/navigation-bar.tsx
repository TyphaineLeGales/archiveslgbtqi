"use client";

import { PagesContentQueryResult } from "@/sanity.types";
import React, { useRef } from "react";

type Props = {
  onSectionClick: (sectionId: string) => void;
  content: PagesContentQueryResult;
};

export default function NavigationBar({ content, onSectionClick }: Props) {
  return (
    <div className="fixed flex w-[10%] flex-col items-start pt-[2rem]">
      {content?.sections?.map((section) => (
        <button
          key={section._id}
          onClick={() => onSectionClick(section._id)}
          className="whitespace-nowrap"
        >
          {section.title}
        </button>
      ))}
    </div>
  );
}
