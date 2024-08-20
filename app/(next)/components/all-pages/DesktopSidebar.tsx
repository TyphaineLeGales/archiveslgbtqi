"use client";
import React, { useState, useRef, useCallback, useEffect } from "react";
import clsx from "clsx";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { transformId } from "../../utils/TransforId";
import { PagesContentQueryResult } from "@/sanity.types";

gsap.registerPlugin(ScrollTrigger);

type Props = {
  content: PagesContentQueryResult;
};

const DesktopSidebar: React.FC<Props> = ({ content }) => {
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
        const yOffset = index === 0 ? 0 : -182.5; // 5rem = 80px for all except the first element
        const y =
          element.getBoundingClientRect().top + window.scrollY + yOffset;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
    },
    [],
  );

  useEffect(() => {
    buttonsRef.current.forEach((button, index) => {
      const id = transformId(button.textContent || "");
      const element = document.getElementById(id);

      if (element) {
        ScrollTrigger.create({
          // markers: true,
          refreshPriority: 0,
          trigger: element,
          start: "-19px 162px",
          end: "bottom 162px",
          onEnter: () => setActiveIndex(index),
          onLeaveBack: () => setActiveIndex(index - 1),
        });
      }
    });
  }, [content]);

  return (
    <div className="fixed left-[calc(50%-720px)] top-[7.25rem] ml-[3.5rem] mt-[3rem] hidden flex-col items-start gap-[1rem] lg:flex">
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
                "sidebarButton will-change-auto",
                index === activeIndex ? "text-pink-arch" : "text-black",
              )}
            >
              {item.titleBlock}
            </button>
          ),
      )}
    </div>
  );
};

export default DesktopSidebar;
