import { HomepageQueryResult } from "@/sanity.types";
import Link from "next/link";
import React, { useCallback, useRef, useState } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

type Props = {
  multiBlocks: HomepageQueryResult;
};

export default function MultiBlocks({ multiBlocks }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={containerRef}
      className="flex flex-col justify-around gap-[1rem] px-[1rem] py-[2.5rem] lg:flex-row"
    >
      {multiBlocks?.secondPart?.map((block, index) => {
        return (
          <div
            key={block._key}
            className="relative flex aspect-square h-[30rem] w-[30rem] flex-col gap-[1rem] bg-blue-300"
          >
            <div className="absolute inset-x-0 bottom-0 z-10 bg-black text-white">
              <h2 className="text-2xl font-bold">{block.title}</h2>
              <p>{block.paragraph}</p>
            </div>
            <Image
              src={block.image?.imageUrl || ""}
              alt={block.image?.alt || ""}
              width={300}
              height={300}
              className="absolute inset-0 z-0 h-full w-full object-cover"
            />
          </div>
        );
      })}
    </div>
  );
}
