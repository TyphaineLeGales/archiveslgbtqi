/* eslint-disable @next/next/no-img-element */
import { sanityFetch } from "@/sanity/lib/fetch";
import { groq } from "next-sanity";
import React from "react";
import type { HEADER_QUERYResult } from "@/sanity.types";
import Image from "next/image";
import { urlForImage } from "@/sanity/lib/utils";

const HEADER_QUERY = groq`*[_type == "header"] {
 "imageUrl": logo.asset->url,
 "url": links[]->{
    title,
    "slug": slug.current
    }
  }`;

export default async function Header() {
  const headerContents = await sanityFetch<HEADER_QUERYResult>({
    query: HEADER_QUERY,
  });

  console.log(headerContents);
  return (
    <div className="w-full flex justify-between p-[1rem]">
      <div>
        <img
          src={headerContents[0].imageUrl || ""}
          alt="logo"
          className="w-[75px] h-auto"
        />
      </div>
      <nav className="flex items-center gap-[3rem]">
        {headerContents[0].url?.map((link) => (
          <a key={link.slug} href={link.slug || ""}>
            {link.title}
          </a>
        ))}
      </nav>
    </div>
  );
}
