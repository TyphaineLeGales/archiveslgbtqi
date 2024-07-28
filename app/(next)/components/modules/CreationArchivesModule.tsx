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
    <div className="flex min-w-full flex-col gap-[1rem] py-[1rem]">
      <MyCustomPortableText value={intro} className="richText min-w-full" />
      <ul className="divide-y-[1px] divide-black border-t-[1px] border-black will-change-transform">
        {archive?.map((archiveItem, index) => (
          <button
            key={index}
            onClick={() => handleClick(index)}
            className={clsx(
              "relative flex w-full flex-col items-start justify-start overflow-hidden py-[1rem] text-start transition-[max-height] duration-[.5s] ease-tamisitée",
              archiveIndex === index
                ? "max-h-[25rem] hover:bg-white hover:text-black lg:max-h-[15rem]"
                : "max-h-[3rem] hover:bg-pink-arch hover:text-white lg:max-h-[2.75rem]",
            )}
          >
            <div className="absolute left-0 top-[.75rem] flex w-full items-center justify-between lg:top-[.5rem] lg:pr-[1rem]">
              <h3 className="font-cityburn text-[1.6rem] leading-[2rem] tracking-wider">
                {archiveItem.title}
              </h3>
              <div className="flex translate-y-[-.1rem] items-center gap-[1rem] lg:gap-[2rem]">
                <span className="font-tanker text-[.6rem] uppercase leading-[1rem] tracking-wider">
                  {archiveItem.status}
                </span>
                <div
                  className={clsx(
                    "text-[.8rem] transition-transform duration-[.5s] ease-tamisitée",
                    archiveIndex === index ? "rotate-[135deg]" : "rotate-0",
                  )}
                >
                  +
                </div>
              </div>
            </div>
            <li className="min-w-full pt-[2rem]">
              <MyCustomPortableText
                value={archiveItem.description}
                className="richText min-w-full"
              />
            </li>
          </button>
        ))}
      </ul>
    </div>
  );
}
