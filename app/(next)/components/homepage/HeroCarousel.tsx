import React from "react";

import { HomepageQueryResult } from "@/sanity.types";
import HeroMobile from "../ui/Heroes/HeroMobile";
import { HeroDesktop } from "../ui/Heroes";

type Props = {
  heroes: HomepageQueryResult;
};

export default function HeroCarousel({ heroes }: Props) {
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
