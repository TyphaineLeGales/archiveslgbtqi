import React from "react";

import Image from "next/image";
import { PortableTextBlock } from "next-sanity";

import clsx from "clsx";

import { sanityFetch } from "@/sanity/lib/fetch";
import { blogsQuery, homepageQuery } from "@/sanity/lib/queries";
import { HomepageQueryResult } from "@/sanity.types";

import { DateHourFormat, MyCustomPortableText } from "../components/ui";
import { BlogDesktopSidebar } from "../components/blog";
// test defining type here to see if there is a cache problems on the type
type BlogsQueryResult = Array<{
  _id: string;
  title: string | null;
  subTitle: string | null;
  author: string | null;
  year: string | null;
  date: string | null;
  contentBlock: Array<
    | {
        links: {
          label: string | null;
          type: "external" | "internal" | "mail" | null;
          internalLink: string | null;
          external: string | null;
          mail: string | null;
        };
      }
    | {
        multiImagesObject: Array<{
          imageUrl: string | null;
          alt: string | null;
        }> | null;
      }
    | {
        richText: Array<{
          children?: Array<{
            marks?: Array<string>;
            text?: string;
            _type: "span";
            _key: string;
          }>;
          style?:
            | "blockquote"
            | "h1"
            | "h2"
            | "h3"
            | "h4"
            | "h5"
            | "h6"
            | "normal";
          listItem?: "bullet" | "number";
          markDefs?: Array<{
            href?: string;
            _type: "link";
            _key: string;
          }>;
          level?: number;
          _type: "block";
          _key: string;
        }> | null;
      }
    | {
        singleImage: {
          imageUrl: string | null;
          alt: string | null;
          credits: string | null;
        };
      }
  > | null;
}>;

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
    <div className="relative mx-auto flex min-h-full w-auto max-w-[1440px] p-[1rem] lg:p-0">
      <BlogDesktopSidebar blog={blogs} />
      <div className="flex w-full flex-col overflow-hidden pt-[3rem] lg:pr-[3rem]">
        <h1 className="font-tanker text-[3rem] uppercase leading-[2.5rem] tracking-wide lg:text-[4.5rem] lg:leading-[3.7rem]">
          Blog
        </h1>
        {blogs.map((blog) => (
          <div
            id={blog.year || ""}
            key={blog.year}
            className={clsx(
              "mt-[3rem] flex flex-col justify-between border-t-[3px] border-black",
              blog.year !== blogs[blogs.length - 1].year && "pb-[3rem]",
            )}
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
                    className="blogParagraph min-w-full lg:pr-[5.5rem]"
                  />
                );
              }
              if ("singleImage" in block) {
                return (
                  <>
                    <Image
                      key={index}
                      src={block.singleImage.imageUrl || ""}
                      alt={block.singleImage.alt || ""}
                      width={1000}
                      height={1000}
                      className="py-[1rem]"
                    />
                    <p className="mt-[.4rem] pr-[3rem] font-jetbrains text-[.65rem] font-light leading-[.7rem]">
                      {block.singleImage.credits}
                    </p>
                  </>
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
