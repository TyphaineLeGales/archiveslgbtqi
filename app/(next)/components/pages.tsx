"use client";
import React, { useRef } from "react";
import NavigationBar from "./navigation-bar";
import { PagesContentQueryResult } from "@/sanity.types";
import Sections from "./sections";

type Props = {
  content: PagesContentQueryResult;
};

export default function Pages({ content }: Props) {
  const sectionRefs = useRef(
    new Map<string, React.RefObject<HTMLDivElement>>(),
  );

  const scrollToSection = (_id: string) => {
    console.log("scrollToSection", _id);
    sectionRefs.current
      .get(_id)
      ?.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="flex">
      <NavigationBar content={content} onSectionClick={scrollToSection} />
      <Sections content={content} sectionRefs={sectionRefs} />
    </div>
  );
}
