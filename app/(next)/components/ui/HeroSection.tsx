import React from "react";

import { HomepageQueryResult } from "@/sanity.types";
import { HeroDesktop, HeroMobile } from "./Heroes";

type Props = {
  heroes: HomepageQueryResult;
};

export default function HeroSection({ heroes }: Props) {
  return (
    <>
      <HeroMobile heroes={heroes} />
      <HeroDesktop heroes={heroes} />
    </>
  );
}
