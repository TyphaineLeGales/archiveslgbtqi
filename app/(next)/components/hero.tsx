"use client";
import { HomepageQueryResult, PagesContentQueryResult } from "@/sanity.types";
import { heroQuery } from "@/sanity/lib/queries";
import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Lenis from "lenis";

type Props = {
  heroes: HomepageQueryResult;
};

const HeroList = ({ heroes }: Props) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    const lenis = new Lenis();

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  }, []);

  if (!heroes) {
    return <h1>No Heroes Found</h1>;
  }

  return (
    <div
      data-lenis-prevent
      className="no-scrollbar relative mb-[5vh] h-auto max-h-[100vh] overflow-y-scroll"
    >
      {heroes.heroes?.map((hero, index) => (
        <div
          key={`hero-${index}`}
          className="sticky top-0 max-h-[100vh] bg-white"
        >
          {hero.image && (
            <div className="relative max-h-full">
              <Image
                src={
                  hero.image.imageUrl || "https://via.placeholder.com/1920x1080"
                }
                alt={hero.image.alt || ""}
                className="max-h-[100dvh] min-h-[100dvh] min-w-full object-cover"
                width="1920"
                height="1080"
              />
              <div className="absolute inset-0 flex items-center justify-center px-[10rem]">
                <div className="mb-[5vh] space-y-[1rem] text-center text-white mix-blend-difference">
                  <h1 className="text-[5rem] font-bold uppercase leading-[4.5rem] tracking-tighter">
                    {hero.title}
                  </h1>
                  <p className="text-[3rem] font-medium uppercase leading-[2.5rem] tracking-tighter">
                    {hero.paragraph}
                  </p>
                </div>
              </div>
            </div>
          )}
          {hero.cta && (
            <Link href={hero.cta.ctaLink?.slug || ""}>{hero.cta.ctaLabel}</Link>
          )}
        </div>
      ))}
    </div>
  );
};

export default HeroList;
