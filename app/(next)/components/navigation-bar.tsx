"use client";

import { PagesContentQueryResult } from "@/sanity.types";
import Link from "next/link";
import React, { useRef } from "react";

type Props = {
  onSectionClick?: (sectionId: string) => void;
  content: PagesContentQueryResult;
};

export default function NavigationBar({ content, onSectionClick }: Props) {
  return (
    <div className="fixed flex w-[10%] flex-col items-start pt-[2rem]">
      {content?.sections?.map((section) => (
        <a
          key={section._id}
          href={`/${content.slug?.current}/${section.slug?.current || ""}`}
          className="whitespace-nowrap"
        >
          {section.title}
        </a>
      ))}
    </div>
  );
}
