"use client";
import React, { useState, useRef, useEffect } from "react";
import clsx from "clsx";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/dist/ScrollToPlugin";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { BlogsQueryResult } from "@/sanity.types";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

type Blog = {
  _id: string;
  year: number;
};

type BlogDesktopSidebarProps = {
  blog: BlogsQueryResult;
};

export default function BlogDesktopSidebar({ blog }: BlogDesktopSidebarProps) {
  const [activeYear, setActiveYear] = useState<number | null>(
    new Date().getFullYear(),
  );
  const buttonsRef = useRef<HTMLButtonElement[]>([]);

  // Filter to get only one blog per year
  const uniqueYears = blog.reduce<Blog[]>((acc, current) => {
    const x = acc.find((item) => item.year === parseInt(current.year || ""));
    if (!x) {
      const newBlog: Blog = {
        _id: current._id,
        year: parseInt(current.year || ""),
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
    { dependencies: [uniqueYears] },
  );

  const handleBlogScroll = (year: number) => {
    const element = document.getElementById(year.toString());
    if (element) {
      gsap.to(window, {
        scrollTo: { y: element.offsetTop, offsetY: 70 }, // Adjust offsetY as needed
        duration: 1,
        ease: "power2.inOut",
      });
    }
  };

  return (
    <div className="fixed left-[calc(50%-720px)] top-[7.25rem] ml-[3.5rem] mt-[3rem] hidden flex-col gap-[1rem] lg:flex">
      {uniqueYears.map((blog, index) => (
        <button
          key={blog.year}
          aria-label={`Scroll to blog year ${blog.year}`}
          onClick={() => handleBlogScroll(blog.year)}
          ref={(el) => {
            if (el) buttonsRef.current[index] = el;
          }}
          className={clsx(
            "sidebarButton",
            activeYear === blog.year && "text-pink-arch",
          )}
        >
          {blog.year}
        </button>
      ))}
    </div>
  );
}
