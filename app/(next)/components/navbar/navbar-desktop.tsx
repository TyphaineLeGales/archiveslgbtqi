"use client";

import { PagesContentQueryResult } from "@/sanity.types";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useRef } from "react";
import TransitionLink from "../ui/TransitionLink";

type Props = {
  content: PagesContentQueryResult;
};

export default function DesktopNavigationBar({ content }: Props) {
  const { pages } = useParams();
  return (
    <div className="fixed hidden w-[25%] flex-col items-start gap-[1rem] whitespace-nowrap px-[1rem] pt-[2rem] lg:flex">
      {content?.navigation?.map((navItem) => (
        <Link
          key={navItem._id}
          href={navItem.slug?.current!}
          className={` ${
            pages === navItem.slug?.current ? "font-bold" : ""
          } sideBarTitle group relative flex h-[1.3rem] flex-col overflow-hidden pr-[.1rem]`}
        >
          <span className="duration-700 ease-tamisitée group-hover:translate-y-[-100%]">
            {navItem.title}
          </span>
          <span className="duration-700 ease-tamisitée group-hover:translate-y-[-100%]">
            {navItem.title}
          </span>
          <div className="bg-black-primary absolute bottom-0 left-0 h-[1px] w-full translate-x-[-100%] transition-transform delay-300 duration-[.7s] ease-tamisitée group-hover:translate-x-0" />
        </Link>
      ))}
    </div>
  );
}
