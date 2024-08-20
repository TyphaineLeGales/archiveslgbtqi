"use client";
import React, { useState, useRef } from "react";
import clsx from "clsx";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { BlogsQueryResult } from "@/sanity.types";

gsap.registerPlugin(ScrollTrigger);

type Blog = {
  _id: string;
  year: number;
  // other properties
};

type BlogDesktopSidebarProps = {
  blog: BlogsQueryResult;
};

export default function BlogDesktopSidebar({ blog }: BlogDesktopSidebarProps) {
  const [activeYear, setActiveYear] = useState<number | null>(
    new Date().getFullYear(),
  );
  const buttonsRef = useRef<HTMLButtonElement[]>([]);

  const handleBlogScroll = (e: React.MouseEvent<HTMLButtonElement>) => {
    // step 1: set the active year
    setActiveYear(parseInt(e.currentTarget.textContent || ""));

    // step 2: scroll to the year
    const year = e.currentTarget.textContent;
    const element = document.getElementById(year || "");
    if (element) {
      const offset = 164; // Adjust this value to set the margin
      const elementPosition =
        element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  // Filter to get only one blog per year
  const uniqueYears = blog.reduce<Blog[]>((acc, current) => {
    const x = acc.find((item) => item.year === parseInt(current.year || ""));
    if (!x) {
      const newBlog: Blog = {
        _id: current._id,
        year: parseInt(current.year || ""),
        // other properties
      };
      return acc.concat([newBlog]);
    } else {
      return acc;
    }
  }, []);

  useGSAP(
    () => {
      // Set up ScrollTrigger for each unique year
      uniqueYears.forEach((blog) => {
        const element = document.getElementById(blog.year.toString());

        if (element) {
          ScrollTrigger.create({
            // markers: true,
            trigger: element,
            start: "top center",
            end: "bottom center",
            onEnter: () => setActiveYear(blog.year),
            onLeaveBack: () => setActiveYear(blog.year - 1),
          });
        }
      });

      // Refresh ScrollTrigger after setting up all instances
      ScrollTrigger.refresh();
    },
    // Cleanup function to kill all triggers on unmount
    { dependencies: [uniqueYears] },
  );

  return (
    <div className="fixed left-[calc(50%-720px)] top-[7.25rem] ml-[3.5rem] mt-[3rem] hidden flex-col gap-[1rem] lg:flex">
      {uniqueYears.map((blog, index) => (
        <div
          key={blog._id}
          className={clsx(
            "sidebarButton",
            activeYear === blog.year && "text-pink-arch",
          )}
        >
          <button
            aria-label="Blog year"
            onClick={handleBlogScroll}
            ref={(el) => {
              if (el) buttonsRef.current[index] = el;
            }}
          >
            {blog.year}
          </button>
        </div>
      ))}
    </div>
  );
}
