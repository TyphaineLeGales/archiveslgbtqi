"use client";
import React, { useEffect } from "react";

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

export default function HeroDesktop({ heroes }: Props) {
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

  // 👇🏽 auto slide
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHero((prevHero) => (prevHero + 1) % heroes?.hero?.length!);
    }, 6000);

    return () => clearInterval(interval);
  }, [heroes?.hero?.length]);

  return (
    <div className="relative hidden max-h-[calc(100vh-7.25rem)] min-h-[calc(100vh-7.25rem)] min-w-[100vw] lg:flex">
      {heroes?.hero?.map((hero) => (
        <div
          key={heroes?.hero?.indexOf(hero)}
          ref={containerRef}
          className={clsx(
            "relative h-full overflow-hidden transition-all duration-[.75s] ease-tamisitée",
            currentHero === heroes?.hero?.indexOf(hero)
              ? `w-[100vw] mix-blend-normal`
              : `w-[3rem] cursor-pointer mix-blend-luminosity`,
          )}
          onClick={() => setCurrentHero(heroes?.hero?.indexOf(hero)!)}
        >
          <div className="relative max-h-[calc(100dvh-5rem)] w-full lg:max-h-[calc(100vh-7.25rem)]">
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
              className={clsx(
                "group absolute bottom-[3rem] left-[2rem] flex max-w-[80%] flex-col items-end text-white transition-[opacity,height] duration-500 ease-tamisitée will-change-transform",
                currentHero === heroes?.hero?.indexOf(hero)
                  ? "block opacity-100"
                  : "hidden opacity-0",
              )}
            >
              <div className="min-h-[20rem] min-w-[30rem] space-y-[.5rem] bg-black p-[2rem]">
                <h1 ref={titleRef} className="heroTitle">
                  {hero.title}
                </h1>

                <p ref={paragraphRef} className="heroParagraph">
                  {hero.paragraph}
                </p>
                <div className="heroCta heroButtonTransition absolute bottom-0 right-0 z-10 translate-y-[99%] bg-black px-[1.25rem] pb-[.75rem]">
                  {hero.cta?.ctaLabel} [+]
                </div>
              </div>
            </Link>

            {hero.image && (
              <>
                <Image
                  ref={imageRef}
                  src={
                    hero.image.imageUrl ||
                    "https://via.placeholder.com/1920x1080"
                  }
                  alt={hero.image.alt || ""}
                  width={
                    currentHero === heroes?.hero?.indexOf(hero) ? 960 : 480
                  }
                  height={
                    currentHero === heroes?.hero?.indexOf(hero) ? 540 : 270
                  }
                  className="h-full min-h-[calc(100vh-7.25rem)] w-full object-cover object-center"
                />
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
