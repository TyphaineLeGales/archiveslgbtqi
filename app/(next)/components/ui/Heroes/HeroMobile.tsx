"use client";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { HomepageQueryResult } from "@/sanity.types";

type Props = {
  heroes: HomepageQueryResult;
};

export default function HeroDesktop({ heroes }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollMessage, setScrollMessage] = useState("⬅︎ Scroll ➡︎");

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
        if (scrollLeft === 0) {
          setScrollMessage("◀︎  Scroll");
        } else if (scrollLeft + clientWidth >= scrollWidth) {
          setScrollMessage("Scroller  ▶︎");
        } else {
          setScrollMessage("◀︎  Scroller  ▶︎");
        }
      }
    };

    const container = containerRef.current;
    container?.addEventListener("scroll", handleScroll);

    return () => {
      container?.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative flex max-h-[calc(100dvh-5rem)] min-h-[calc(100dvh-5rem)] w-full snap-x snap-mandatory overflow-x-auto overflow-y-hidden lg:hidden"
    >
      {heroes?.hero?.map((hero, index) => (
        <div
          key={index}
          className="relative h-[100vh] min-w-[100vw] snap-center snap-always overflow-hidden"
        >
          <div className="relative w-full">
            <div className="fixed inset-x-0 bottom-[1rem] z-30 flex items-center justify-center p-[1rem] font-tanker text-[1rem] tracking-wider text-white">
              {scrollMessage}
            </div>
            <div className="group absolute inset-x-0 top-[1rem] flex flex-col items-end px-[1rem] text-white opacity-100 transition-all duration-500 ease-tamisitée">
              <div className="min-h-[10rem] space-y-[.5rem] bg-black p-[2rem]">
                <h1 className="heroTitle">{hero.title}</h1>
                <p className="heroParagraph">{hero.paragraph}</p>
              </div>

              <div className="relative w-fit translate-y-[-25%] overflow-hidden bg-black pb-[.5rem] transition-all duration-200 ease-tamisitée">
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
                  className="heroCta relative z-10 h-full w-full px-[2rem]"
                >
                  {hero.cta?.ctaLabel} [+]
                </Link>
              </div>
            </div>

            {hero.image && (
              <Image
                src={
                  hero.image.imageUrl || "https://via.placeholder.com/1920x1080"
                }
                alt={hero.image.alt || ""}
                width={400}
                height={400}
                className="h-full min-h-[calc(100dvh-5rem)] w-full object-cover"
              />
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
