import React from "react";

import Image from "next/image";
import Link from "next/link";

import { sanityFetch } from "@/sanity/lib/fetch";
import { settingsQuery } from "@/sanity/lib/queries";
import { SettingsQueryResult } from "@/sanity.types";

import HeaderDesktop from "./HeaderDesktop";
import HeaderMobile from "./HeaderMobile";
import { useRouter } from "next/navigation";
import TransitionLink from "../ui/TransitionLink";

export default async function Header() {
  const settings = await sanityFetch<SettingsQueryResult>({
    query: settingsQuery,
  });

  return (
    <div className="fixed top-0 z-40 flex h-[5rem] w-full items-center justify-between bg-white bg-opacity-50 p-[1rem] backdrop-blur-md">
      <TransitionLink
        href="/"
        className="relative aspect-square h-[3rem] w-[3rem]"
      >
        <Image
          src={settings?.header?.logo || "https://via.placeholder.com/100x100"}
          alt="logo"
          width={65}
          height={65}
          className="absolute inset-0"
        />
      </TransitionLink>
      <div>
        <HeaderDesktop settings={settings} />
        <HeaderMobile settings={settings} />
      </div>
    </div>
  );
}
