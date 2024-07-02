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

export default function Hero2({ heroes }: Props) {
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
      scale: 1.1,
      duration: 1,
      ease: "power4.inOut",
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
        className="max-h-[calc(100dvh-5rem)] object-cover"
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
        className="group absolute bottom-[1rem] right-[1rem] z-30 cursor-pointer overflow-hidden rounded-full border border-white bg-opacity-50 px-[2rem] py-[.5rem] text-white transition-all duration-300 ease-in-out hover:bg-opacity-100 hover:text-black"
      >
        <div className="relative z-10 text-[.8rem] uppercase leading-[.8rem] tracking-tight">
          Aller à la page
        </div>
        <div className="absolute inset-0 z-0 mx-auto w-full translate-y-[100%] rounded-full bg-white transition-transform duration-500 ease-tamisitée group-hover:translate-y-0" />
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
