import { sanityFetch } from "@/sanity/lib/fetch";
import { groq } from "next-sanity";
import React from "react";

import Image from "next/image";
import { urlForImage } from "@/sanity/lib/utils";
import Link from "next/link";
import { headerQuery, settingsQuery } from "@/sanity/lib/queries";

import DesktopNavLink from "./navlink-desktop";
import MobileNavLink from "./header-mobile";
import MobileHeader from "./header-mobile";
import { SettingsQueryResult } from "@/sanity.types";

export default async function Header() {
  const settings = await sanityFetch<SettingsQueryResult>({
    query: settingsQuery,
  });

  console.log("Settings:", settings);

  return (
    <div className="relative flex items-center justify-between p-[1rem]">
      <Link href="/">
        <Image
          src={settings?.header?.logo || "https://via.placeholder.com/100x100"}
          alt="logo"
          width={65}
          height={65}
          className="h-auto w-[65px]"
        />
      </Link>
      <DesktopNavLink settings={settings} />
      <MobileHeader settings={settings} />
    </div>
  );
}
