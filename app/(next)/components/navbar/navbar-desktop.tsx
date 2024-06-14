"use client";

import { PagesContentQueryResult } from "@/sanity.types";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useRef } from "react";

type Props = {
  content: PagesContentQueryResult;
};

export default function DesktopNavigationBar({ content }: Props) {
  const { pages } = useParams();
  return (
    <div className="fixed hidden w-[15%] flex-col items-start whitespace-nowrap pt-[2rem] lg:flex">
      {content?.navigation?.map((navItem) => (
        <Link
          key={navItem._id}
          href={navItem.slug?.current || ""}
          className={`text-[1rem] ${
            pages === navItem.slug?.current ? "underline" : ""
          }`}
        >
          {navItem.title}
        </Link>
      ))}
    </div>
  );
}
