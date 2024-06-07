"use client";

import { PagesContentQueryResult } from "@/sanity.types";
import React, { useRef } from "react";

type Props = {
  onSectionClick: (sectionId: string) => void;
  content: PagesContentQueryResult;
};

export default function NavigationBar({ content, onSectionClick }: Props) {
  console.log("content from navigation bar", content);
  return (
    <div className="fixed flex w-[10%] flex-col items-start">
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
