/* eslint-disable @next/next/no-img-element */
import { sanityFetch } from "@/sanity/lib/fetch";
import { groq } from "next-sanity";
import React from "react";
import type { HEADER_QUERYResult } from "@/sanity.types";
import Image from "next/image";
import { urlForImage } from "@/sanity/lib/utils";
import Link from "next/link";
import NavLink from "./navlink";

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
    <div className="flex w-full justify-between p-[1rem]">
      <div>
        <Link href="/">
          <img
            src={headerContents[0].imageUrl || ""}
            alt="logo"
            className="h-auto w-[65px]"
          />
        </Link>
      </div>
      <nav className="flex items-center gap-[3rem]">
        {headerContents[0].url?.map((link) => (
          <NavLink key={link.slug} link={link} />
        ))}
      </nav>
    </div>
  );
}
