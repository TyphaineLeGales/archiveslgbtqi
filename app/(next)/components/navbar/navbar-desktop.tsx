"use client";

import { PagesContentQueryResult, SectionQueryResult } from "@/sanity.types";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useRef } from "react";

type Props = {
  onSectionClick?: (sectionId: string) => void;
  content: PagesContentQueryResult;
};

export default function DesktopNavigationBar({ content }: Props) {
  return (
    <div className="fixed hidden w-[10%] flex-col items-start whitespace-nowrap pt-[2rem] lg:flex">
      {content?.sections?.map((section) => (
        <a
          key={section._id}
          href={`/${content.slug?.current}/${section.slug?.current || ""}`}
          // className={`whitespace-nowrap ${section === 0 ? "underline" : ""}`}
        >
          {section.title}
        </a>
      ))}
    </div>
  );
}
