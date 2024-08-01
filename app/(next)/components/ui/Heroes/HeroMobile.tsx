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
  // const [currentIndex, setCurrentIndex] = useState(0);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setCurrentIndex(
  //       (prevIndex) => (prevIndex + 1) % (heroes?.hero?.length || 0),
  //     );
  //   }, 2000);

  //   return () => clearInterval(interval);
  // }, [heroes]);

  // useEffect(() => {
  //   if (containerRef.current) {
  //     containerRef.current.style.transform = `translateX(-${currentIndex * 100}vw)`;
  //     containerRef.current.style.transition = "transform 0.5s ease-in-out";
  //   }
  // }, [currentIndex]);

  // useEffect(() => {
  //   const handleScroll = () => {
  //     if (containerRef.current) {
  //       const scrollLeft = containerRef.current.scrollLeft;
  //       const newIndex = Math.round(scrollLeft / window.innerWidth);
  //       setCurrentIndex(newIndex);
  //     }
  //   };

  //   const container = containerRef.current;
  //   if (container) {
  //     container.addEventListener("scroll", handleScroll);
  //   }

  //   return () => {
  //     if (container) {
  //       container.removeEventListener("scroll", handleScroll);
  //     }
  //   };
  // }, []);

  // console.log("currentIndex: ", currentIndex);

  return (
    <div className="relative flex min-h-[calc(100vh-5rem)] w-full lg:hidden">
      <div ref={containerRef} className="flex flex-col">
        {heroes?.hero?.map((hero, index) => (
          <div
            key={index}
            className="relative min-h-[calc(100vh-5rem)] min-w-[100vw] overflow-x-scroll"
          >
            <div className="relative w-full">
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
                    hero.image.imageUrl ||
                    "https://via.placeholder.com/1920x1080"
                  }
                  alt={hero.image.alt || ""}
                  width={400}
                  height={400}
                  className="h-full min-h-[calc(100vh-5rem)] w-full object-cover"
                />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
