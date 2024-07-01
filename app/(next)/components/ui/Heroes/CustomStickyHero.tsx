"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { HomepageQueryResult } from "@/sanity.types";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import TextSplitting from "../TextSplitting";

type Props = {
  heroes: HomepageQueryResult;
};

export default function CustomStickyHero({ heroes }: Props) {
  const [index, setIndex] = useState(0);

  const imageRef = React.useRef<HTMLImageElement>(null);
  const textRef = React.useRef<HTMLDivElement>(null);
  const titleRef = React.useRef<HTMLHeadingElement>(null);
  const paragraphRef = React.useRef<HTMLParagraphElement>(null);

  const hero = heroes?.hero?.[index];
  const imageUrl = heroes?.hero?.[index]?.image?.imageUrl;
  const imageAlt = heroes?.hero?.[index]?.image?.alt;
  const heroTitle = heroes?.hero?.[index]?.title;
  const heroParagraph = heroes?.hero?.[index]?.paragraph;

  useGSAP(() => {
    gsap.from(imageRef.current, {
      opacity: 0,
      duration: 2,
      ease: "power2.out",
    });
    gsap.from(titleRef.current, {
      translateY: "100%",
      duration: 1,
      ease: "power4.inOut",
    });
    gsap.from(paragraphRef.current, {
      translateY: "-100%",
      duration: 1,
      ease: "power4.inOut",
    });
  }, [index]);

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

  return (
    <section className="relative h-full max-h-[calc(100dvh-5rem)] w-full overflow-hidden">
      <Image
        key={imageUrl}
        ref={imageRef}
        src={imageUrl || ""}
        alt={imageAlt || ""}
        width={1920}
        height={1080}
        className="max-h-[calc(100dvh-5rem)]"
      />

      <Link
        href={
          hero?.cta?.ctaLink?._type === "pages"
            ? `/${hero.cta?.ctaLink?.slug || ""}`
            : hero?.cta?.ctaLink?._type === "events"
              ? `/agenda/${hero.cta?.ctaLink?.slug || ""}`
              : hero?.cta?.ctaLink?._type === "blogs"
                ? `/blog/${hero.cta?.ctaLink?.slug || ""}`
                : "#"
        }
        className="absolute bottom-[1rem] right-[1rem] z-30 rounded-full bg-white px-[2rem] py-[.5rem]"
      >
        Aller à la page
      </Link>
      <div
        ref={textRef}
        className="absolute left-1/2 top-1/2 flex w-full -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center gap-[1rem] px-[1rem]"
      >
        <div className="overflow-hidden">
          <h1 ref={titleRef} className="heroTitle">
            {heroTitle}
          </h1>
        </div>
        <div className="overflow-hidden px-[25%]">
          <p ref={paragraphRef} className="heroParagraph">
            {heroParagraph}
          </p>
        </div>
      </div>
      <div className="absolute inset-0 z-20 flex w-screen">
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
