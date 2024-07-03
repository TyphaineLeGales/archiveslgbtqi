"use client";

import React, { useState } from "react";

import { useRouter } from "next/navigation";

import { BlogsQueryResult } from "@/sanity.types";

import clsx from "clsx";

import { NorthEastArrow } from "../ui/icon";
import { TextMarquee } from "../ui";

type BlogProps = {
  blog: BlogsQueryResult;
};

export default function BlogsMobile({ blog }: BlogProps) {
  const router = useRouter();
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const [isClickedIndex, setIsClickedIndex] = useState<number | null>(null);
  const [isLinkClicked, setIsLinkClicked] = useState<boolean>(false);

  const handleClicked = (index: number) => {
    if (isClickedIndex === index) {
      setIsClickedIndex(null);
      setIsClicked(false);
    } else {
      setIsClickedIndex(index);
      setIsClicked(true);
    }
  };

  return (
    <div className="no-scrollbar flex min-h-[85dvh] flex-col justify-end lg:hidden">
      {blog.map((blogItem, index) => (
        <div
          key={`event-${index}`}
          onClick={() => handleClicked(index)}
          className="border-black-primary group relative flex h-auto cursor-pointer items-start overflow-hidden border-b-[1px] pb-[2rem]"
        >
          <div className="relative flex w-full flex-col justify-start gap-[1rem]">
            <div className="flex items-center justify-between">
              {blogItem.blogTitle?.length! > 15 ? (
                <TextMarquee
                  text={blogItem.blogTitle!}
                  className={clsx(
                    isClicked && isClickedIndex === index
                      ? "w-[calc(50%+1rem)] animate-marquee rounded-r-full"
                      : "",
                    "eventTitle whitespace-nowrap px-[1rem] pt-[.5rem]",
                  )}
                />
              ) : (
                <h2 className="eventTitle px-[1rem] pt-[.5rem]">
                  {blogItem.blogTitle}
                </h2>
              )}
              <div className="overflow-hidden">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setIsLinkClicked(true);
                    setTimeout(() => {
                      router.push(`/blog/${blogItem.slug?.current}`);
                    }, 1000);
                  }}
                  className="border-black-primary bg-white-primary flex w-auto justify-end rounded-l-full border-b-[1px] border-l-[1px] border-t-[1px] py-[.30rem] pl-[5rem] pr-[1rem]"
                >
                  <NorthEastArrow className="aspect-square h-[2rem] w-[2rem] pt-1" />
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
