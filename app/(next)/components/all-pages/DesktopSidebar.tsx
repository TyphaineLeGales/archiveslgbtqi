"use client";
import React, { useState, useRef, useCallback } from "react";
import { PagesContentQueryResult } from "@/sanity.types";

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

  const handleClickScroll = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>, index: number) => {
      e.preventDefault();
      setActiveIndex(index);
      const target = e.target as HTMLButtonElement;
      const id = target.textContent || "";
      const transformedId = transformId(id);
      const element = document.getElementById(transformedId);

      if (element) {
        const yOffset = index === 0 ? 0 : -164; // 5rem = 80px for all except the first element
        const y =
          element.getBoundingClientRect().top + window.scrollY + yOffset;
        window.scrollTo({ top: y, behavior: "smooth" });

        // TODO:
        // gsap.to(window, {
        //   scrollTo: { y: element, autoKill: false },
        //   duration: 1,
        //   ease: "power2.inOut",
        // });
      }
    },
    [],
  );

  useGSAP(() => {
    buttonsRef.current.forEach((button, index) => {
      const id = transformId(button.textContent || "");
      const element = document.getElementById(id);

      if (element) {
        ScrollTrigger.create({
          // markers: true,
          trigger: element,
          start: "-19px center",
          end: "bottom center",
          onEnter: () => setActiveIndex(index),
          onLeaveBack: () => setActiveIndex(index - 1),
        });
      }
    });

    // Refresh ScrollTrigger after setting up all instances
    ScrollTrigger.refresh(true);
  });

  return (
    <div className="relative hidden lg:block">
      <div className="sticky left-[calc(50%-720px)] top-[145px] ml-[3.5rem] flex w-full min-w-[13.5rem] max-w-[13.5rem] flex-col items-start gap-[1rem]">
        {content?.contentModulde?.map(
          (item, index) =>
            item.titleBlock && (
              <button
                key={item.titleBlock}
                ref={(el) => {
                  if (el) buttonsRef.current[index] = el;
                }}
                aria-label="Sidebar button"
                onClick={(e) => handleClickScroll(e, index)}
                className={clsx(
                  "sidebarButton whitespace-nowrap text-start",
                  index === activeIndex ? "text-pink-arch" : "text-black",
                )}
              >
                {item.titleBlock}
              </button>
            ),
        )}
      </div>
    </div>
  );
}
