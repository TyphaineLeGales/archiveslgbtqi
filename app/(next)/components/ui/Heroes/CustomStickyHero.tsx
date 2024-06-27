"use client";
import React, { useState } from "react";
import Image from "next/image";

import { HomepageQueryResult } from "@/sanity.types";

type Props = {
  heroes: HomepageQueryResult;
};

export default function CustomStickyHero({ heroes }: Props) {
  const [index, setIndex] = useState(0);

  const handleClick = (direction: "next" | "previous") => {
    setIndex((prev) => {
      const total = heroes?.hero?.length!;
      const newIndex =
        direction === "next"
          ? (prev + 1) % total
          : prev === 0
            ? total - 1
            : prev - 1;

      return newIndex;
    });
  };

  const imageUrl = heroes?.hero?.[index]?.image?.imageUrl;

  const imageAlt = heroes?.hero?.[index]?.image?.alt;

  const imageID = heroes?.hero?.[index]?._key;

  const key = imageUrl; // Desired key change to trigger re-renders

  return (
    <section className="relative">
      <div className="h-full w-full">
        <Image
          key={imageUrl}
          src={imageUrl || ""}
          alt={imageAlt || ""}
          width={1920}
          height={1080}
        />
      </div>
      <div className="absolute inset-0 z-40 flex w-screen">
        <button
          onClick={() => handleClick("previous")}
          className="w-1/2 cursor-w-resize bg-transparent focus:outline-none"
        ></button>
        <button
          onClick={() => handleClick("next")}
          className="w-1/2 cursor-e-resize bg-transparent focus:outline-none"
        ></button>
      </div>
    </section>
  );
}
