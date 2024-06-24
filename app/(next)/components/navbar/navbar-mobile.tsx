"use client";

import { PagesContentQueryResult } from "@/sanity.types";
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
  const { pages } = useParams();

  const handleMenu = () => {
    setMenu(!menu);
    navbarRef.current?.classList.toggle("hidden");
  };
  return (
    <>
      {menu && (
        <div className="fixed inset-0 z-0 bg-white/50 bg-opacity-50 backdrop-blur-md" />
      )}
      <div className="fixed inset-x-0 bottom-[1rem] z-40 mx-auto flex w-[calc(100%-20rem)] flex-col bg-blue-200 lg:hidden">
        <nav ref={navbarRef} className="hidden h-auto py-[2rem]">
          {content?.navigation?.map((navItem) => (
            <Link
              key={navItem._id}
              href={navItem.slug?.current || ""}
              className={`flex flex-col items-center justify-center gap-[1rem] py-[1rem] text-[1rem] ${
                pages === navItem.slug?.current ? "underline" : ""
              }`}
            >
              {navItem.title}
            </Link>
          ))}
        </nav>
        <button onClick={handleMenu}>{menu ? "Close" : "Menu"}</button>
      </div>
    </>
  );
}
