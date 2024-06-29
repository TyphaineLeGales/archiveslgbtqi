"use client";

import { BlogsQueryResult, EventsQueryResult } from "@/sanity.types";
import React, { useState, useEffect } from "react";

import { useRouter } from "next/navigation";

import { TextMarquee } from "../ui";
import TransitionLink from "../ui/TransitionLink";

type BlogProps = {
  blog: BlogsQueryResult;
};

export default function BlogsDesktop({ blog }: BlogProps) {
  const router = useRouter();

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isClicked, setIsClicked] = useState<boolean>(false);

  const handleMouseEnter = (index: number) => {
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <>
      <div className="hidden min-h-[85dvh] flex-col justify-end lg:flex">
        {blog?.map((blogItem, index) => (
          <TransitionLink
            key={`event-${index}`}
            className="group relative flex items-start overflow-hidden border-b-[1px] border-black bg-white"
            href={`/blog/${blogItem.slug?.current}`}
          >
            {/* {hoveredIndex === index && (
                <div
                  style={{
                    top: mousePosition.y,
                    left: mousePosition.x,
                  }}
                 
                  className="pointer-events-none fixed z-50"
                >
                  <Image
                    src={
                      blogItem.image?.imageUrl ||
                      "https://via.placeholder.com/1000x1000"
                    }
                    alt={blogItem.image?.alt || "Event image"}
                    width={250}
                    height={250}
                    loading="eager"
                    className="h-full w-full origin-bottom object-cover"
                  />
                </div>
              )} */}

            <div className="relative flex h-auto w-full flex-col px-[1rem]">
              <div className="flex items-center justify-between">
                {blogItem.blogTitle?.length! > 15 ? (
                  <div className="flex h-[5.5rem] flex-col overflow-hidden rounded-r-full">
                    <TextMarquee
                      text={blogItem.blogTitle!}
                      className="eventTitle whitespace-nowrap transition-transform delay-200 duration-500 ease-tamisitée group-hover:animate-marquee"
                    />
                  </div>
                ) : (
                  <div className="flex h-[5.5rem] flex-col overflow-hidden">
                    <h2 className="eventTitle transition-transform delay-200 duration-500 ease-tamisitée group-hover:translate-y-[-100%]">
                      {blogItem.blogTitle!}
                    </h2>
                    <h2 className="eventTitle transition-transform delay-200 duration-500 ease-tamisitée group-hover:translate-y-[-100%]">
                      {blogItem.blogTitle!}
                    </h2>
                  </div>
                )}
              </div>
            </div>
          </TransitionLink>
        ))}
      </div>
    </>
  );
}
