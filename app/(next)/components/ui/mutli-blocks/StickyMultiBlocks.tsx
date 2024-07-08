"use client";
import { HomepageQueryResult } from "@/sanity.types";
import Link from "next/link";
import React, { useCallback, useRef, useState } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import AgendaBlock from "./AgendaBlock";
import LesArchivesVivantesBlock from "./LesArchivesVivantesBlock";
import LeBlogBlock from "./LeBlogBlock";

type Props = {
  multiBlocks: HomepageQueryResult;
};

export default function StickyMultiBlocks({ multiBlocks }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  const agendaRef = useRef<HTMLDivElement>(null);
  const overlayAgendaRef = useRef<HTMLDivElement>(null);

  const archivesVivantesRef = useRef<HTMLDivElement>(null);
  const overlayArchivesVivantesRef = useRef<HTMLDivElement>(null);

  const blogRef = useRef<HTMLDivElement>(null);
  const overlayBlogRef = useRef<HTMLDivElement>(null);

  const [eventImageIndex, setEventImageIndex] = useState<number | null>(null);

  const { contextSafe } = useGSAP({ scope: containerRef });

  useGSAP(({}) => {
    gsap.registerPlugin(ScrollTrigger);

    // Create the animation Agenda overlay animation
    const overlayAgendaAnimation = gsap.fromTo(
      overlayAgendaRef.current,
      {
        scaleY: 0,
        transformOrigin: "top",
        borderRadius: "0 0 100% 100%",
        ease: "none",
      },
      {
        scaleY: 1,
        borderRadius: "0",
      },
    );

    const overlayArchivesVivantesAnimation = gsap.fromTo(
      overlayArchivesVivantesRef.current,
      {
        scaleY: 0,
        transformOrigin: "top",
        borderRadius: "0 0 100% 100%",
        ease: "none",
      },
      {
        scaleY: 1,
        borderRadius: "0",
      },
    );

    const overlayBlogAnimation = gsap.fromTo(
      overlayBlogRef.current,
      {
        scaleY: 0,
        transformOrigin: "top",
        borderRadius: "0 0 100% 100%",
        ease: "none",
      },
      {
        scaleY: 2,
        borderRadius: "0",
      },
    );

    // Create ScrollTrigger and attach it to the animation
    ScrollTrigger.create({
      trigger: agendaRef.current,
      scroller: containerRef.current,
      start: "top center",
      end: "bottom center",
      scrub: true,
      toggleActions: "play none none reverse",
      animation: overlayAgendaAnimation, // Attach the animation to ScrollTrigger
    });

    ScrollTrigger.create({
      trigger: archivesVivantesRef.current,
      scroller: containerRef.current,
      start: "top center",
      end: "bottom center",
      scrub: true,
      toggleActions: "play none none reverse",
      animation: overlayArchivesVivantesAnimation, // Attach the animation to ScrollTrigger
    });

    ScrollTrigger.create({
      trigger: blogRef.current,
      scroller: containerRef.current,
      start: "top center",
      end: "bottom center",
      scrub: true,
      toggleActions: "play none none reverse",
      animation: overlayBlogAnimation, // Attach the animation to ScrollTrigger
    });
  });

  // TODO: Faire en sorte que le couleure de chaque overlay soit dynamique via Sanity

  return (
    <div className="relative h-[100vh] overflow-hidden bg-blue-200">
      <div className="absolute bottom-[10vh] z-10 h-[2.5rem] w-full bg-gradient-to-t from-white-primary" />

      <div
        ref={containerRef}
        className="relative my-[10vh] flex h-[50vh] flex-col overflow-y-scroll bg-gradient-to-b from-white-primary to-transparent"
      >
        {/* Agenda */}
        <AgendaBlock
          multiBlocks={multiBlocks}
          agendaRef={agendaRef}
          overlayAgendaRef={overlayAgendaRef}
        />

        {/* Les Archives Vivantes */}
        <LesArchivesVivantesBlock
          multiBlocks={multiBlocks}
          archivesVivantesRef={archivesVivantesRef}
          overlayArchivesVivantesRef={overlayArchivesVivantesRef}
        />

        {/* Le Blog */}
        <LeBlogBlock
          multiBlocks={multiBlocks}
          blogRef={blogRef}
          overlayBlogRef={overlayBlogRef}
        />
      </div>
    </div>
  );
}
