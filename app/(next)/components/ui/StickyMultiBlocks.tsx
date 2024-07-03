"use client";
import { HomepageQueryResult } from "@/sanity.types";
import Link from "next/link";
import React, { useCallback, useRef, useState } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

type Props = {
  multiBlocks: HomepageQueryResult;
};

export default function StickyMultiBlocks({ multiBlocks }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const agendaRef = useRef<HTMLDivElement>(null);
  const [eventImageIndex, setEventImageIndex] = useState<number | null>(null);

  const { contextSafe } = useGSAP({ scope: containerRef });

  useGSAP(({}) => {
    gsap.registerPlugin(ScrollTrigger);

    // gsap.to(agendaRef.current, {
    //   scrollTrigger: {
    //     trigger: agendaRef.current,
    //     start: "top 50%",
    //     end: "50% 50%",
    //     scrub: true,
    //     pin: true,
    //     toggleActions: "play none reverse none",
    //     markers: true,
    //   },
    //   backgroundColor: "red",
    // });
    ScrollTrigger.create({
      trigger: agendaRef.current,
      scroller: containerRef.current,
      start: "top center",
      end: "top center",
      toggleActions: "play none none none",
      markers: true,
      onEnter: () => {
        gsap.to(agendaRef.current, {
          backgroundColor: "red",
        });
      },
      onLeave: () => {
        gsap.to(agendaRef.current, {
          backgroundColor: "blue",
        });
      },
    });
  });

  return (
    <div className="relative h-fit overflow-hidden">
      <div className="absolute bottom-0 z-10 h-[2.5rem] w-full bg-gradient-to-t from-white-primary" />
      <div
        ref={containerRef}
        className="relative my-[10vh] flex h-[50vh] flex-col overflow-y-scroll bg-gradient-to-b from-white-primary to-transparent"
      >
        {/* Agenda */}
        <div className="group/overlay sticky top-0 mt-[45vh] flex min-h-[50vh] items-center justify-center p-[5rem]">
          <div
            ref={agendaRef}
            className="boxRounded relative flex min-h-[calc(50vh-1rem)] w-full items-center justify-center overflow-hidden border-[1px] border-black-primary p-[1rem]"
          >
            {/* <div className="absolute inset-0 z-0 h-full w-full origin-center translate-y-[-100%] rounded-b-full bg-[#29AB87] transition-all duration-1000 ease-tamisitée group-hover/overlay:translate-y-0 group-hover/overlay:rounded-none" /> */}
            <Link
              href="/agenda"
              className="group/reset flex h-[1.5rem] flex-col overflow-hidden text-[1.5rem] font-bold uppercase leading-[1.5rem] tracking-tighter"
            >
              <span className="z-10 transition-transform duration-500 ease-tamisitée group-hover/reset:translate-y-0 group-hover/title:translate-y-[-100%]">
                L&apos;agenda
              </span>
              <span className="z-10 transition-transform duration-500 ease-tamisitée group-hover/reset:translate-y-0 group-hover/title:translate-y-[-100%]">
                L&apos;agenda
              </span>
            </Link>

            <div className="flex flex-col gap-[1rem] lg:pt-[2rem]">
              {multiBlocks?.multiBlock?.eventsBlock?.events?.map(
                (event, index) => (
                  <Link
                    key={index}
                    href={`/agenda/${event.slug?.current || ""}`}
                    className="boxRounded group-hover/overlay:border-white-primarym group relative z-10 flex h-[3rem] w-full flex-col items-start justify-center overflow-hidden border-[1px] border-black-primary p-[.5rem] text-black-primary transition-all duration-[1s] ease-tamisitée"
                  >
                    <span className="z-10 truncate text-[.8rem] uppercase tracking-tighter">
                      {event.eventTitle}
                    </span>
                  </Link>
                ),
              )}
            </div>
          </div>
        </div>
        {/* Les Archives Vivantes */}
        <div className="sticky top-0 flex min-h-[50vh] items-center justify-center p-[5rem]">
          <div className="boxRounded group/title group/overlay mt-[2vh] flex min-h-[calc(48vh-1rem)] w-full items-center justify-center overflow-hidden border-[1px] border-black-primary bg-white-primary p-[1rem]">
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
        </div>

        {/* Le Blog */}
        <div className="sticky top-0 flex min-h-[50vh] items-center justify-center p-[5rem]">
          <div className="boxRounded group/title group/overlay mt-[4vh] flex min-h-[calc(46vh-1rem)] w-full items-center justify-center overflow-hidden border-[1px] border-black-primary bg-white-primary p-[1rem]">
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
      </div>
    </div>
  );
}
