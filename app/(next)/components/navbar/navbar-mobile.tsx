"use client";

import { PagesContentQueryResult, SectionQueryResult } from "@/sanity.types";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useRef } from "react";

type Props = {
  onSectionClick?: (sectionId: string) => void;
  content: PagesContentQueryResult;
};

export default function MobileNavigationBar({ content }: Props) {
  const navbarRef = useRef<HTMLDivElement>(null);
  const [menu, setMenu] = React.useState(false);

  const handleMenu = () => {
    setMenu(!menu);
    navbarRef.current?.classList.toggle("hidden");
  };
  return (
    <div className="fixed inset-x-0 bottom-[1rem] flex flex-col bg-blue-200 lg:hidden">
      <nav ref={navbarRef} className="hidden h-auto py-[2rem]">
        {content?.sections?.map((section) => (
          <a
            key={section._id}
            href={`/${content.slug?.current}/${section.slug?.current || ""}`}
            onClick={handleMenu}
            className="flex flex-col items-center justify-center py-[1rem]"
          >
            {section.title}
          </a>
        ))}
      </nav>
      <button onClick={handleMenu}>{menu ? "Close" : "Menu"}</button>
    </div>
  );
}
