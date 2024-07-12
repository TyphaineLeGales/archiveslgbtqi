import React from "react";

import Link from "next/link";
import Image from "next/image";

import { HomepageQueryResult } from "@/sanity.types";
import TextSplitting from "../TextSplitting";
import TransitionLink from "../TransitionLink";

type Props = {
  heroes: HomepageQueryResult;
};

export default function StickyHero({ heroes }: Props) {
  return (
    <div
      data-lenis-prevent
      className="no-scrollbar relative max-h-[calc(100dvh-5rem)] overflow-y-scroll"
    >
      {heroes?.hero?.map((hero) => (
        <Link
          key={hero.title!}
          href={
            hero?.cta?.ctaLink?._type === "pages"
              ? `/${hero.cta?.ctaLink?.slug || ""}`
              : hero?.cta?.ctaLink?._type === "events"
                ? `/agenda/${hero.cta?.ctaLink?.slug || ""}`
                : hero?.cta?.ctaLink?._type === "blogs"
                  ? `/blog/${hero.cta?.ctaLink?.slug || ""}`
                  : "#"
          }
          className="sticky top-0 max-h-[calc(100dvh-5rem)] bg-white-primary"
        >
          {hero.image && (
            <div className="relative max-h-[calc(100dvh-5rem)]">
              <Image
                src={
                  hero.image.imageUrl || "https://via.placeholder.com/1920x1080"
                }
                alt={hero.image.alt || ""}
                className="h-full max-h-[calc(100dvh-5rem)] min-h-[calc(100dvh-5rem)] w-full min-w-full object-cover"
                width={1920}
                height={1080}
              />
              <div className="absolute inset-0 flex items-center justify-center px-[2.5rem] lg:px-[10rem]">
                <div className="mb-[10vh] space-y-[2rem] text-center text-white-primary mix-blend-difference">
                  <div>
                    <h1 className="sr-only">{hero.title}</h1>
                    <h1 aria-hidden>
                      <TextSplitting className="heroTitle">
                        {hero.title}
                      </TextSplitting>
                    </h1>
                  </div>
                  <div>
                    <p className="sr-only">{hero.paragraph}</p>
                    <TextSplitting
                      initial={{ y: "102%" }}
                      whileInView="visible"
                      variants={{
                        visible: (i: number) => ({
                          y: 0,
                          transition: {
                            delay: i * 0.01,
                            ease: [0.6, 0.01, -0.05, 0.9],
                          },
                        }),
                      }}
                      aria-hidden
                      className="text-[1.5rem] font-medium uppercase leading-[1.5rem] tracking-tighter"
                    >
                      {hero.paragraph}
                    </TextSplitting>
                  </div>
                </div>
              </div>
            </div>
          )}
        </Link>
      ))}
    </div>
  );
}
