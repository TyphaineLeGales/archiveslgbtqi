import React from "react";

import Link from "next/link";
import Image from "next/image";

import { HomepageQueryResult } from "@/sanity.types";
import TextSplitting from "../TextSplitting";
import TransitionLink from "../TransitionLink";
import clsx from "clsx";
import { ca } from "date-fns/locale";

type Props = {
  heroes: HomepageQueryResult;
};

export default function StickyHero({ heroes }: Props) {
  const [currentHero, setCurrentHero] = React.useState(0);
  const numberOfHeroes = heroes?.hero?.length!;

  console.log("Number of Heroes: ", numberOfHeroes);
  return (
    <div className="relative flex max-h-[calc(100dvh-5rem)] min-w-[100vw]">
      {heroes?.hero?.map((hero) => (
        <div
          key={hero.title!}
          className={clsx(
            "relative h-full max-h-[calc(100dvh-5rem)] w-[100vw] cursor-pointer overflow-hidden border-x-[.5px] border-black bg-white transition-[width] duration-[1s] ease-tamisitée",
            currentHero === heroes?.hero?.indexOf(hero)
              ? "w-[100vw]"
              : "w-[3rem]",
          )}
          onClick={() => setCurrentHero(heroes?.hero?.indexOf(hero)!)}
        >
          <div
            className={clsx(
              "absolute inset-0 z-20 h-full w-full bg-black transition-all duration-500 ease-tamisitée group-hover:bg-opacity-0",
              currentHero === heroes?.hero?.indexOf(hero)
                ? "bg-opacity-0 transition-all duration-300 ease-tamisitée"
                : "bg-opacity-30 transition-all duration-300 ease-tamisitée",
            )}
          />
          <div className="relative max-h-[calc(100dvh-5rem)] w-full">
            {currentHero === heroes?.hero?.indexOf(hero) ? (
              <div className="min-w-2/3 absolute left-[1rem] top-[1rem] z-10">
                <h1 className="heroTitle">{hero.title}</h1>
              </div>
            ) : (
              <></>
              //   <div className="absolute bottom-0 left-[2.5rem] z-10 origin-bottom-left -rotate-90 whitespace-nowrap text-[3rem] font-bold uppercase leading-[3rem] tracking-tight text-white">
              //     {hero.title}
              //   </div>
            )}

            <div className="absolute bottom-[1rem] left-[1rem] z-10">
              <p
                className={clsx({
                  "heroParagraph opacity-100 transition-opacity delay-200 duration-[1s] ease-tamisitée":
                    currentHero === heroes?.hero?.indexOf(hero),
                  "heroParagraph opacity-0 transition-opacity delay-200 duration-[1s] ease-tamisitée":
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
                className="group absolute bottom-[1rem] right-[1rem] z-30 cursor-pointer overflow-hidden rounded-full border border-white bg-opacity-50 px-[2rem] py-[.5rem] text-white transition-all duration-300 ease-in-out hover:bg-opacity-100 hover:text-black"
              >
                <div className="relative z-10 text-[.8rem] uppercase leading-[.8rem] tracking-tight">
                  Aller à la page
                </div>
                <div className="absolute inset-0 z-0 mx-auto w-full translate-y-[100%] rounded-full bg-white transition-transform duration-500 ease-tamisitée group-hover:translate-y-0" />
              </Link>
            )}
            {hero.image && (
              <>
                <Image
                  src={
                    hero.image.imageUrl ||
                    "https://via.placeholder.com/1920x1080"
                  }
                  alt={hero.image.alt || ""}
                  width={1920}
                  height={1080}
                  //   className={clsx(
                  //     "h-full max-h-[calc(100dvh-5rem)] min-h-[calc(100dvh-5rem)] w-full min-w-full object-cover transition-[width] duration-[1s] ease-tamisitée",
                  //     currentHero === heroes?.hero?.indexOf(hero)
                  //       ? "opacity-100"
                  //       : "opacity-50 transition-opacity duration-300 ease-tamisitée group-hover:opacity-100",
                  //   )}
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
