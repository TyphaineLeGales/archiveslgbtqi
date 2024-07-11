import { HomepageQueryResult } from "@/sanity.types";
import Link from "next/link";
import React, { useCallback, useRef, useState } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

type Props = {
  multiBlocks: HomepageQueryResult;
};

export default function MultiBlocks({ multiBlocks }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const [eventImageIndex, setEventImageIndex] = useState<number | null>(null);

  const { contextSafe } = useGSAP({ scope: containerRef });

  const eventImage =
    multiBlocks?.multiBlock?.eventsBlock?.events?.[eventImageIndex ?? 0].image
      ?.imageUrl;

  const eventAlt =
    multiBlocks?.multiBlock?.eventsBlock?.events?.[eventImageIndex ?? 0].image
      ?.alt;

  // Create a GSAP timeline
  const tl = gsap.timeline({ paused: true });

  const handleMouseEnter = contextSafe((index: number) => {
    setEventImageIndex(index);

    // Reset timeline
    tl.clear();

    // Define the animation sequence
    tl.fromTo(
      imageRef.current,
      { yPercent: 100 },
      { yPercent: 0, duration: 0.5 },
    ).play(); // Start the timeline
  });

  const handleMouseLeave = useCallback(() => {
    setEventImageIndex(null);

    // Animate the image out
    tl.fromTo(
      imageRef.current,
      {
        yPercent: 0,
      },
      {
        yPercent: 100,
        duration: 0.5,
      },
    ).play();
  }, [tl]);

  return (
    <div
      ref={containerRef}
      className="flex min-h-[25rem] flex-col justify-center gap-[1rem] px-[1rem] py-[2.5rem] lg:flex-row"
    >
      {/* Agenda */}
      <div className="boxRounded group/title group/overlay relative overflow-hidden border-[1px] border-black-primary bg-white-primary p-[1rem] transition-all duration-500 ease-tamisitée hover:-skew-x-1 hover:scale-105 lg:w-[25rem]">
        {/* <div className="duration-s] absolute inset-0 z-0 h-full w-full origin-center translate-x-[100%] translate-y-[100%] rounded-full bg-[#29AB87] transition-all ease-tamisitée group-hover/overlay:translate-x-0 group-hover/overlay:translate-y-0 group-hover/overlay:rounded-none" /> */}
        <Link
          href="/agenda"
          className="group/reset flex h-[1.5rem] flex-col overflow-hidden text-[1.5rem] font-bold uppercase leading-[1.5rem] tracking-tighter text-black-primary transition-colors duration-1000 ease-tamisitée"
        >
          <span className="z-10 transition-transform duration-500 ease-tamisitée group-hover/reset:translate-y-0 group-hover/title:translate-y-[-100%]">
            L&apos;agenda
          </span>
          <span className="z-10 transition-transform duration-500 ease-tamisitée group-hover/reset:translate-y-0 group-hover/title:translate-y-[-100%]">
            L&apos;agenda
          </span>
        </Link>

        <div className="flex flex-col gap-[1rem] lg:pt-[2rem]">
          {multiBlocks?.multiBlock?.eventsBlock?.events?.map((event, index) => (
            <Link
              key={index}
              href={`/agenda/${event.slug?.current || ""}`}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
              // className="boxRounded border-black-primary group-hover/overlay:border-white-primarym group-hover:text-white-primary text-black-primary group relative z-10 flex h-[3rem] w-full flex-col items-start justify-center overflow-hidden border-[1px] p-[.5rem] transition-all duration-[1s] ease-tamisitée hover:rounded-full group-hover/overlay:border-white group-hover/overlay:text-white"
              className={`boxRounded group-hover/overlay:border-white-primarym group relative z-10 flex h-[3rem] w-full flex-col items-start justify-center overflow-hidden border-[1px] border-black-primary p-[.5rem] text-black-primary transition-all duration-[1s] ease-tamisitée hover:rounded-full`}
            >
              <span className="z-10 truncate text-[.8rem] uppercase tracking-tighter">
                {event.eventTitle}
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* Les Archives Vivantes */}
      <div className="group/title boxRounded relative overflow-hidden border-[1px] border-black-primary bg-white-primary p-[1rem] transition-all duration-500 ease-tamisitée hover:-skew-x-1 hover:scale-105 lg:w-[25rem]">
        <h1 className="flex h-[1.5rem] flex-col overflow-hidden text-[1.5rem] font-bold uppercase leading-[1.5rem] tracking-tighter">
          <span className="transition-transform duration-500 ease-tamisitée group-hover/title:translate-y-[-100%]">
            Les Archives Vivantes
          </span>
          <span className="transition-transform duration-500 ease-tamisitée group-hover/title:translate-y-[-100%]">
            Les Archives Vivantes
          </span>
        </h1>
        <div className="flex flex-col lg:pt-[2rem]">
          <Link
            href={
              multiBlocks?.multiBlock?.lesArchivesVivantesBlock?.vimeo
                ?.linkToVimeo || ""
            }
          >
            {
              multiBlocks?.multiBlock?.lesArchivesVivantesBlock?.vimeo
                ?.vimeoTitle
            }
          </Link>
          <Link
            href={
              multiBlocks?.multiBlock?.lesArchivesVivantesBlock?.podcast
                ?.linkToPodcast || ""
            }
          >
            {
              multiBlocks?.multiBlock?.lesArchivesVivantesBlock?.podcast
                ?.podcastTitle
            }
          </Link>
        </div>
      </div>

      {/* Le Blog */}
      <div className="boxRounded group/title relative overflow-hidden border-[1px] border-black-primary bg-white-primary p-[1rem] transition-all duration-500 ease-tamisitée hover:-skew-x-1 hover:scale-105 lg:w-[25rem]">
        <Link
          href="/blog"
          className="flex h-[1.5rem] flex-col overflow-hidden text-[1.5rem] font-bold uppercase leading-[1.5rem] tracking-tighter"
        >
          <span className="transition-transform duration-500 ease-tamisitée group-hover/title:translate-y-[-100%]">
            {multiBlocks?.multiBlock?.leBlogBlock?.blogLabel}
          </span>
          <span className="transition-transform duration-500 ease-tamisitée group-hover/title:translate-y-[-100%]">
            {multiBlocks?.multiBlock?.leBlogBlock?.blogLabel}
          </span>
        </Link>
      </div>
    </div>
  );
}
