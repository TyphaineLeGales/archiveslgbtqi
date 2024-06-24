"use client";

import { BlogsQueryResult, EventsQueryResult } from "@/sanity.types";
import React, { useState } from "react";
import Image from "next/image";
import DateFormat from "../DateFormat";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { NorthEastArrow } from "../ui/icon";
import { useRouter } from "next/navigation";
import Marquee from "../ui/Marquee";
import clsx from "clsx";

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
    <AnimatePresence>
      <>
        {isLinkClicked && (
          <motion.div
            initial={{ translateY: "100%" }}
            animate={{ translateY: 0 }}
            transition={{ duration: 1, ease: [0.6, 0.01, 0.05, 0.95] }}
            className="fixed inset-0 z-50 bg-neutral-700"
          />
        )}
        <div className="no-scrollbar flex min-h-[85dvh] flex-col justify-end lg:hidden">
          {blog.map((blogItem, index) => (
            <motion.div
              key={`event-${index}`}
              initial={{ height: "3.5rem" }}
              animate={
                isClicked && isClickedIndex === index
                  ? { height: "10rem" }
                  : { height: "3.5rem" }
              }
              transition={{ duration: 1, ease: [0.6, 0.01, 0.05, 0.95] }}
              onClick={() => handleClicked(index)}
              className="group relative flex h-auto cursor-pointer items-start overflow-hidden border-b-[1px] border-black pb-[2rem]"
            >
              <div className="relative flex w-full flex-col justify-start gap-[1rem]">
                <div className="flex items-center justify-between">
                  {blogItem.blogTitle?.length! > 15 ? (
                    <Marquee
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
                  <motion.div
                    initial={{ translateX: "100%" }}
                    animate={
                      isClicked && isClickedIndex === index
                        ? { translateX: 0 }
                        : { translateX: "100%" }
                    }
                    transition={{ duration: 1, ease: [0.6, 0.01, 0.05, 0.95] }}
                    exit={{
                      translateX: "100%",
                      transition: {
                        duration: 1,
                        ease: [0.6, 0.01, 0.05, 0.95],
                      },
                    }}
                    className="overflow-hidden"
                  >
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        setIsLinkClicked(true);
                        setTimeout(() => {
                          router.push(`/blog/${blogItem.slug?.current}`);
                        }, 1000);
                      }}
                      className="flex w-auto justify-end rounded-l-full border-b-[1px] border-l-[1px] border-t-[1px] border-black bg-white py-[.30rem] pl-[5rem] pr-[1rem]"
                    >
                      <NorthEastArrow className="aspect-square h-[2rem] w-[2rem] pt-1" />
                    </button>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </>
    </AnimatePresence>
  );
}
