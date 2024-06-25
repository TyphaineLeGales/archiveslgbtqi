"use client";
import React from "react";

import Image from "next/image";

import { BlogQueryResult } from "@/sanity.types";

import { motion } from "framer-motion";

import { CustomPortableText } from "../ui";

type Blogs = {
  params: {
    blog: string;
  };
  blog: BlogQueryResult;
};

export default function Blog({ params, blog }: Blogs) {
  return (
    <motion.div>
      <motion.div
        initial={{ translateY: "0%" }}
        animate={{ translateY: "-100%" }}
        transition={{
          duration: 1,
          ease: [0.6, 0.01, 0.05, 0.95],
        }}
        className="fixed inset-0 z-50 bg-neutral-700"
      />
      <div className="flex flex-col gap-[1rem]">
        <div className="mb-[1rem] flex flex-col justify-between gap-[1rem] border-b-[1px] border-black px-[1rem] pb-[1rem]">
          <h1 className="eventTitle">{blog?.blogTitle!}</h1>
          <CustomPortableText value={blog?.blogContentText as any} />
        </div>
        <div>
          {blog?.blogImages?.map((image, index) => (
            <Image
              key={index}
              src={image?.imageUrl || "https://via.placeholder.com/1000x1000"}
              alt={image?.alt || "Event image"}
              width={1000}
              height={1000}
              loading="lazy"
              className="h-auto min-w-full px-[1rem]"
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}
