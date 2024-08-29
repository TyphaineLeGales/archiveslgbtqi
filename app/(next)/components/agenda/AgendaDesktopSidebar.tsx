"use client";

import React, { useEffect, useState } from "react";
import clsx from "clsx";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export default function AgendaDesktopSidebar() {
  const [isPast, setIsPast] = useState(false);

  const scrollToElement = (elementId: string, marginTop = 0) => {
    const element = document.getElementById(elementId);
    if (element) {
      const elementPosition =
        element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - marginTop;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
      // TODO:
      // gsap.to(window, {
      //   scrollTo: { y: `#${elementId}`, offsetY: marginTop },
      //   duration: 1,
      //   ease: "power2.inOut",
      // });
    }
  };

  const scrollToPast = () => {
    scrollToElement("past", 144); // Adjust the margin as needed
    setIsPast(true);
  };

  const scrollToFuture = () => {
    scrollToElement("future", 164);
    setIsPast(false);
  };

  useGSAP(() => {
    // Set up ScrollTrigger for the "past" section
    ScrollTrigger.create({
      trigger: "#past",
      start: "top bottom",
      end: "bottom bottom",
      onEnter: () => setIsPast(true),
      onLeaveBack: () => setIsPast(false),
    });

    // Set up ScrollTrigger for the "future" section
    ScrollTrigger.create({
      trigger: "#future",
      start: "top bottom",
      end: "bottom bottom",
      onEnter: () => setIsPast(false),
      onLeaveBack: () => setIsPast(true),
    });
  });

  return (
    <div className="relative hidden lg:block">
      <div className="sticky left-[calc(50%-720px)] top-[145px] ml-[3.5rem] flex w-full min-w-[13.5rem] max-w-[13.5rem] flex-col items-start gap-[1rem]">
        <button
          aria-label="Événements à venir"
          onClick={scrollToFuture}
          className={clsx("sidebarButton", { "text-pink-arch": !isPast })}
        >
          Événements à venir
        </button>
        <button
          aria-label="Événements passés"
          onClick={scrollToPast}
          className={clsx("sidebarButton", { "text-pink-arch": isPast })}
        >
          Événements passés
        </button>
      </div>
    </div>
  );
}
