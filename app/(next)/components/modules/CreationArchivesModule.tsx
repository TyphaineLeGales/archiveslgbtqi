"use client";
import React, { useState } from "react";
import clsx from "clsx";

import { PortableTextBlock } from "next-sanity";

import { MyCustomPortableText } from "../ui";

type CreationArchivesModuleProps = {
  intro: PortableTextBlock[];
  archive: {
    title: string;
    description: PortableTextBlock[];
    status: string;
  }[];
};

export default function CreationArchivesModule({
  intro,
  archive,
}: CreationArchivesModuleProps) {
  const [archiveIndex, setArchiveIndex] = useState<number | null>(null);

  const handleClick = (index: number) => {
    if (archiveIndex === index) {
      setArchiveIndex(null);
    } else {
      setArchiveIndex(index);
    }
  };
  return (
    <div className="flex flex-col gap-[1rem] py-[1rem]">
      {/* TODO: Collapsible */}
      <MyCustomPortableText value={intro} />
      <ul className="divide-y-[1px] divide-black border-t-[1px] border-black will-change-transform">
        {archive?.map((archiveItem, index) => (
          <button
            key={index}
            onClick={() => handleClick(index)}
            className={clsx(
              "relative flex w-full flex-col items-start justify-start overflow-hidden py-[1rem] text-start transition-[max-height] duration-[.5s] ease-in-out",
              archiveIndex === index
                ? "max-h-[25rem] lg:max-h-[15rem]"
                : "max-h-[3rem] lg:max-h-[2.5rem]",
            )}
          >
            <div className="absolute left-0 top-[.75rem] flex w-full items-center justify-between lg:top-[.5rem] lg:pr-[1rem]">
              <h3 className="text-[1rem] font-bold leading-[1rem] tracking-tighter lg:text-[1.5rem] lg:leading-[1.5rem]">
                {archiveItem.title}
              </h3>
              <div className="flex items-center gap-[1rem] lg:gap-[2rem]">
                <span className="text-[.6rem] leading-[.6rem] tracking-tighter lg:text-[.8em] lg:leading-[.8rem]">
                  {archiveItem.status}
                </span>
                <div
                  className={clsx(
                    "font-bold transition-transform duration-[.5s] ease-tamisitée",
                    archiveIndex === index ? "rotate-[135deg]" : "rotate-0",
                  )}
                >
                  +
                </div>
              </div>
            </div>
            <li className="pt-[2rem]">
              <MyCustomPortableText value={archiveItem.description} />
            </li>
          </button>
        ))}
      </ul>
    </div>
  );
}
