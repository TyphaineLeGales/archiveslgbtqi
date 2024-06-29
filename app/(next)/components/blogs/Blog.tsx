"use client";
import React from "react";

import Image from "next/image";

import { BlogQueryResult } from "@/sanity.types";

import { MyCustomPortableText } from "../ui";

type Blogs = {
  params: {
    blog: string;
  };
  blog: BlogQueryResult;
};

export default function Blog({ params, blog }: Blogs) {
  return (
    <div>
      <div className="flex flex-col gap-[1rem]">
        <div className="mb-[1rem] flex flex-col justify-between gap-[1rem] border-b-[1px] border-black px-[1rem] pb-[1rem]">
          <h1 className="eventTitle">{blog?.blogTitle!}</h1>
          <MyCustomPortableText value={blog?.blogContentText as any} />
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
    </div>
  );
}
