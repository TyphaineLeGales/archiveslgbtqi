import React from "react";

import { HomepageQueryResult } from "@/sanity.types";
import { HeroDesktop, HeroMobile } from "./Heroes";

type Props = {
  heroes: HomepageQueryResult;
};

export default function HeroSection({ heroes }: Props) {
  return (
    <>
      {heroes?.heroVisibility && (
        <>
          <HeroMobile heroes={heroes} />
          <HeroDesktop heroes={heroes} />
        </>
      )}
    </>
  );
}
