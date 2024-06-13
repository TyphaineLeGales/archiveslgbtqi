/* eslint-disable @next/next/no-img-element */
import { sanityFetch } from "@/sanity/lib/fetch";
import { groq } from "next-sanity";
import React from "react";

import Image from "next/image";
import { urlForImage } from "@/sanity/lib/utils";
import Link from "next/link";
import { headerQuery } from "@/sanity/lib/queries";
import { HeaderQueryResult } from "@/sanity.types";
import DesktopNavLink from "./navlink-desktop";
import MobileNavLink from "./header-mobile";
import MobileHeader from "./header-mobile";

export default async function Header() {
  const headerContents = await sanityFetch<HeaderQueryResult>({
    query: headerQuery,
  });

  return (
    <div className="relative flex w-full justify-between p-[1rem]">
      <Link href="/">
        <img
          src={headerContents[0].imageUrl || ""}
          alt="logo"
          className="h-auto w-[65px]"
        />
      </Link>

      <MobileHeader headerContents={headerContents} />
      <nav className="hidden items-center gap-[3rem] lg:flex">
        {headerContents[0].url?.map((link) => (
          <DesktopNavLink key={link.slug} link={link} />
        ))}
      </nav>
    </div>
  );
}
