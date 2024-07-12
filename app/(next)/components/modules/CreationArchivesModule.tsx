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
              archiveIndex === index ? "max-h-[15rem]" : "max-h-[2rem]",
            )}
          >
            <div className="absolute left-0 top-[.25rem] flex w-full items-center justify-between pr-[1rem]">
              <h3 className="text-[1.5rem] font-bold leading-[1.5rem] tracking-tighter">
                {archiveItem.title}
              </h3>
              <div
                className={clsx(
                  "font-bold transition-transform duration-[.5s] ease-tamisitée",
                  archiveIndex === index ? "rotate-45" : "rotate-0",
                )}
              >
                +
              </div>
            </div>
            <li className="pt-[1rem]">
              <MyCustomPortableText value={archiveItem.description} />
              <p>{archiveItem.status}</p>
            </li>
          </button>
        ))}
      </ul>
    </div>
  );
}
