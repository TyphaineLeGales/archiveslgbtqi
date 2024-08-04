"use client";

import { PagesContentQueryResult } from "@/sanity.types";
import React, { useState, useRef, useEffect } from "react";

import clsx from "clsx";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

import { transformId } from "../../utils/TransforId";

gsap.registerPlugin(ScrollTrigger);

type Props = {
  content: PagesContentQueryResult;
};

export default function DesktopSidebar({ content }: Props) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const buttonsRef = useRef<HTMLButtonElement[]>([]);

  useGSAP(() => {
    const triggers = content?.contentModulde?.map((item, index) => {
      if (item.titleBlock) {
        const transformedId = transformId(item.titleBlock);
        const element = document.getElementById(transformedId);

        if (element) {
          return ScrollTrigger.create({
            trigger: element,
            start: "-16px 165px",
            end: "bottom center",
            // markers: true,
            onEnter: () => setActiveIndex(index),
            onLeaveBack: () => setActiveIndex(index - 1),
          });
        }
      }
    });

    return () => {
      triggers?.forEach((trigger) => trigger?.kill());
    };
  }, [content]);

  const handleClickScroll = (
    e: React.MouseEvent<HTMLButtonElement>,
    index: number,
  ) => {
    e.preventDefault();
    setActiveIndex(index);
    const target = e.target as HTMLButtonElement;
    const id = target.textContent;
    const transformedId = transformId(id!);
    const element = document.getElementById(transformedId);

    if (element) {
      if (index === 0) {
        // Scroll to top for the first element
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        // For other elements, add 5rem margin top
        const yOffset = -182.5; // 5rem = 80px
        const y =
          element.getBoundingClientRect().top + window.scrollY + yOffset;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
    }

    // console.log("Clicked on:", transformedId);
  };

  return (
    <div className="fixed left-[calc(50%-720px)] top-[7.25rem] ml-[3.5rem] mt-[3rem] hidden flex-col items-start gap-[1rem] lg:flex">
      {content?.contentModulde?.map((item, index) => (
        <>
          {item.titleBlock && (
            <button
              ref={(el) => {
                if (el) {
                  buttonsRef.current[index] = el;
                }
              }}
              key={item.titleBlock}
              aria-label="Sidebar button"
              onClick={(e) => handleClickScroll(e, index)}
              className={clsx(
                "sidebarButton",
                index === activeIndex ? "text-pink-arch" : "text-black",
              )}
            >
              {item.titleBlock}
            </button>
          )}
        </>
      ))}
    </div>
  );
}
