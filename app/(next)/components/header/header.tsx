import React from "react";

import { sanityFetch } from "@/sanity/lib/fetch";
import { settingsQuery } from "@/sanity/lib/queries";
import { SettingsQueryResult } from "@/sanity.types";

import NavDesktop from "./NavDesktop";
import NavMobile from "./NavMobile";

export default async function Header() {
  const settings = await sanityFetch<SettingsQueryResult>({
    query: settingsQuery,
  });

  return (
    <>
      <NavMobile settings={settings} />
      <NavDesktop settings={settings} />
    </>
  );
}
