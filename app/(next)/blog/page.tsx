import React from "react";

import Image from "next/image";

import { sanityFetch } from "@/sanity/lib/fetch";
import { blogsQuery, homepageQuery } from "@/sanity/lib/queries";
import { BlogsQueryResult, HomepageQueryResult } from "@/sanity.types";

import { DateHourFormat, MyCustomPortableText } from "../components/ui";
import { PortableTextBlock } from "next-sanity";
import { BlogDesktopSidebar } from "../components/blog";
import { CTAmarquee } from "../components/homepage";

export default async function Page() {
  const currentYear = new Date().getFullYear().toString();
  const minYear = (new Date().getFullYear() - 4).toString(); // 5 years of blogs

  const [blogs, homePage] = await Promise.all([
    sanityFetch<BlogsQueryResult>({
      query: blogsQuery,
      params: {
        maxYear: currentYear,
        minYear: minYear,
      },
    }),
    sanityFetch<HomepageQueryResult>({ query: homepageQuery }),
  ]);

  // console.log("Blogs:", blogs);

  return (
    <div className="relative mx-auto flex min-h-screen w-auto max-w-[1440px] p-[1rem] lg:p-0">
      <BlogDesktopSidebar blog={blogs} />
      <div className="flex h-full w-full flex-col overflow-hidden pt-[3rem]">
        {blogs.map((blog) => (
          <div
            id={blog.year || ""}
            key={blog.year}
            className="flex h-full flex-col justify-between border-t-[3px] border-black pb-[3rem]"
          >
            <h2 className="blogTitle pt-[.5rem]">{blog.title}</h2>
            <span className="blogSubTitle py-[.75rem]">{blog.subTitle}</span>
            <span className="blogAuthor">{blog.author}</span>
            <DateHourFormat
              formatType="fullDateWithYear"
              dateString={blog.date || ""}
              className="blogDate pb-[2.5rem]"
            />
            {blog.contentBlock?.map((block, index) => {
              if ("richText" in block) {
                return (
                  <MyCustomPortableText
                    key={index}
                    value={block.richText as PortableTextBlock[]}
                    className="blogParagraph min-w-full pb-[1rem] lg:pr-[5.5rem]"
                  />
                );
              }
              if ("singleImage" in block) {
                return (
                  <Image
                    key={index}
                    src={block.singleImage.imageUrl || ""}
                    alt={block.singleImage.alt || ""}
                    width={1000}
                    height={1000}
                    className="pb-[1rem]"
                  />
                );
              }
              return null;
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
