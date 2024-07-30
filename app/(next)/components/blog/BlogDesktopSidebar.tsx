"use client";
import React from "react";
import clsx from "clsx";

import { BlogsQueryResult } from "@/sanity.types";

type Blog = {
  _id: string;
  year: number;
  // other properties
};

type BlogDesktopSidebarProps = {
  blog: BlogsQueryResult;
};

export default function BlogDesktopSidebar({ blog }: BlogDesktopSidebarProps) {
  const [activeYear, setActiveYear] = React.useState<number | null>(
    new Date().getFullYear(),
  );
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
    const x = acc.find((item) => item.year === current.year);
    if (!x) {
      const newBlog: Blog = {
        _id: "",
        year: current.year || 0,
        // other properties
      };
      return acc.concat([newBlog]);
    } else {
      return acc;
    }
  }, []);

  return (
    <div className="fixed left-[calc(50%-720px)] top-[7.25rem] ml-[3.5rem] mt-[3rem] hidden flex-col gap-[1rem] lg:flex">
      {uniqueYears.map((blog) => (
        <div
          key={blog._id}
          className={clsx(
            "sidebarButton",
            activeYear === blog.year && "text-pink-arch",
          )}
        >
          <button aria-label="Blog year" onClick={handleBlogScroll}>
            {blog.year}
          </button>
        </div>
      ))}
    </div>
  );
}
