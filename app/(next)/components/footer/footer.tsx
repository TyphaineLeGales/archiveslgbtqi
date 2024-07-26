import React from "react";

import { SettingsQueryResult } from "@/sanity.types";
import { sanityFetch } from "@/sanity/lib/fetch";
import { settingsQuery } from "@/sanity/lib/queries";

export default async function Footer() {
  const settings = await sanityFetch<SettingsQueryResult>({
    query: settingsQuery,
  });

  return <div className="min-h-[390px] bg-black text-white"></div>;
}
