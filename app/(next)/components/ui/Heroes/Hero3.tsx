"use client";
import React from "react";

import Link from "next/link";
import Image from "next/image";

import { HomepageQueryResult } from "@/sanity.types";
import clsx from "clsx";
import gsap from "gsap";
import { Observer } from "gsap/Observer";
import { useGSAP } from "@gsap/react";

type Props = {
  heroes: HomepageQueryResult;
};

export default function StickyHero({ heroes }: Props) {
  const [currentHero, setCurrentHero] = React.useState(0);

  const containerRef = React.useRef<HTMLDivElement>(null);
  const imageRef = React.useRef<HTMLImageElement>(null);
  const titleRef = React.useRef<HTMLHeadingElement>(null);
  const paragraphRef = React.useRef<HTMLParagraphElement>(null);

  gsap.registerPlugin(Observer);

  useGSAP(() => {
    gsap.from(paragraphRef.current, {
      translateY: "100%",
      duration: 1,
      ease: "power4.inOut",
    });
  }, [currentHero]);

  return (
    <div className="relative flex max-h-[calc(100dvh-5rem)] min-h-[calc(100dvh-5rem)] min-w-[100vw]">
      {heroes?.hero?.map((hero) => (
        <div
          key={heroes?.hero?.indexOf(hero)}
          ref={containerRef}
          className={clsx(
            "group relative h-full max-h-[calc(100dvh-5rem)] overflow-hidden border-x-[.5px] border-black-primary transition-[width] duration-[1s] ease-tamisitée",
            currentHero === heroes?.hero?.indexOf(hero)
              ? `w-[100vw]`
              : `w-[3rem] cursor-pointer`,
          )}
          onClick={() => setCurrentHero(heroes?.hero?.indexOf(hero)!)}
        >
          {/* <div
            className={clsx(
              "absolute inset-0 z-20 h-full w-full bg-black-primary bg-opacity-50 transition-all duration-500 ease-tamisitée group-hover:bg-opacity-0",
              currentHero === heroes?.hero?.indexOf(hero) ? "hidden" : "block",
            )}
          /> */}
          <div className="relative max-h-[calc(100dvh-5rem)] w-full">
            <div className="absolute left-[1rem] top-[1rem] z-10 h-fit w-2/3 overflow-hidden">
              <h1
                ref={titleRef}
                className={clsx({
                  "heroTitle opacity-100 transition-opacity delay-[.5s] duration-[1s] ease-tamisitée":
                    currentHero === heroes?.hero?.indexOf(hero),
                  "heroTitle opacity-0 transition-opacity duration-200 ease-tamisitée":
                    currentHero !== heroes?.hero?.indexOf(hero),
                })}
              >
                {hero.title}
              </h1>
            </div>

            <div className="absolute bottom-[1rem] left-[1rem] z-10 h-fit">
              <p
                ref={paragraphRef}
                className={clsx({
                  "heroParagraph whitespace-normal opacity-100 transition-opacity delay-200 duration-[1s] ease-tamisitée":
                    currentHero === heroes?.hero?.indexOf(hero),
                  "heroParagraph whitespace-nowrap opacity-0 transition-opacity delay-200 duration-[1s] ease-tamisitée":
                    currentHero !== heroes?.hero?.indexOf(hero),
                })}
              >
                {hero.paragraph}
              </p>
            </div>
            {currentHero === heroes?.hero?.indexOf(hero) && (
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
                className="customRounded group/button absolute bottom-[1rem] right-[1rem] z-30 cursor-pointer overflow-hidden border-[1px] border-white-primary bg-opacity-50 px-[2rem] py-[.5rem] text-white-primary transition-all duration-700 ease-tamisitée hover:rounded-full hover:bg-opacity-100 hover:text-black-primary"
              >
                <div className="relative z-10 text-[.8rem] uppercase leading-[.8rem] tracking-tight">
                  Aller à la page
                </div>
                <div className="customRounded absolute inset-0 z-0 mx-auto w-full translate-y-[100%] bg-white-primary transition-transform duration-500 ease-tamisitée group-hover/button:translate-y-0" />
              </Link>
            )}
            {hero.image && (
              <>
                <Image
                  ref={imageRef}
                  src={
                    hero.image.imageUrl ||
                    "https://via.placeholder.com/1920x1080"
                  }
                  alt={hero.image.alt || ""}
                  width={1920}
                  height={1080}
                  className="h-full min-h-[calc(100dvh-5rem)] w-full object-cover"
                />
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
