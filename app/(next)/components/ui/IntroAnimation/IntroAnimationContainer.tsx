import React from "react";
import IntroAnimationBlock from "./IntroAnimationBlock";
import { sanityFetch } from "@/sanity/lib/fetch";
import { settingsQuery } from "@/sanity/lib/queries";
import { SettingsQueryResult } from "@/sanity.types";

export default async function IntroAnimationContainer() {
  const settings = await sanityFetch<SettingsQueryResult>({
    query: settingsQuery,
  });

  // console.log("Settings: ", settings);

  return <IntroAnimationBlock settings={settings} />;
}
