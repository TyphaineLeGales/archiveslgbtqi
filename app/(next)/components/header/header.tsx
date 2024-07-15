import React from "react";

import Image from "next/image";
import Link from "next/link";

import { sanityFetch } from "@/sanity/lib/fetch";
import { settingsQuery } from "@/sanity/lib/queries";
import { SettingsQueryResult } from "@/sanity.types";

import HeaderDesktop from "./HeaderDesktop";
import HeaderMobile from "./HeaderMobile";

export default async function Header() {
  const settings = await sanityFetch<SettingsQueryResult>({
    query: settingsQuery,
  });

  return (
    <nav className="sticky top-0 z-40 flex max-h-[5rem] w-full items-center justify-between overflow-hidden border-b-[1px] border-black-primary bg-white-primary bg-opacity-50 px-[1rem] backdrop-blur-md">
      <Link
        href="/"
        className="relative my-auto flex aspect-square h-[5rem] w-[5rem] items-center justify-center"
      >
        <Image
          src={settings?.header?.logo || "https://via.placeholder.com/100x100"}
          alt="logo"
          width={50}
          height={50}
          priority
          className="aspect-square h-[50px] w-[50px]"
        />
      </Link>
      <div>
        <HeaderDesktop settings={settings} />
        <HeaderMobile settings={settings} />
      </div>
    </nav>
  );
}
