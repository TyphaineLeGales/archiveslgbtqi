/* eslint-disable @next/next/no-img-element */
import { sanityFetch } from "@/sanity/lib/fetch";
import { groq } from "next-sanity";
import React from "react";
import type { HEADER_QUERYResult } from "@/sanity.types";
import Image from "next/image";
import { urlForImage } from "@/sanity/lib/utils";
import NavLink from "./NavLink";
import Link from "next/link";

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

  return (
    <div className="w-full flex justify-between p-[1rem]">
      <div>
        <Link href="/">
          <img
            src={headerContents[0].imageUrl || ""}
            alt="logo"
            className="w-[75px] h-auto"
          />
        </Link>
      </div>
      {/* <nav className="flex items-center gap-[3rem]">
        {headerContents[0].url?.map((link) => (
          <a key={link.slug} href={link.slug || ""}>
            {link.title}
          </a>
        ))}
      </nav> */}

      <nav className="flex items-center gap-[3rem]">
        {headerContents[0].url?.map((link) => (
          <NavLink key={link.slug} link={link} />
        ))}
      </nav>
    </div>
  );
}
