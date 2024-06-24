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
    <div className="relative flex items-center justify-between p-[1rem]">
      <Link href="/">
        <Image
          src={settings?.header?.logo || "https://via.placeholder.com/100x100"}
          alt="logo"
          width={65}
          height={65}
          className="h-auto max-h-[5rem] w-full"
        />
      </Link>
      <div>
        <HeaderDesktop settings={settings} />
        <HeaderMobile settings={settings} />
      </div>
    </div>
  );
}
