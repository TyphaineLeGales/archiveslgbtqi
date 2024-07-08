"use client";

import React from "react";

import { HomepageQueryResult } from "@/sanity.types";
import { Hero2, Hero3, StickyHero } from "./Heroes";

type Props = {
  heroes: HomepageQueryResult;
};

export default function HeroSection({ heroes }: Props) {
  return (
    <>
      {/* <StickyHero heroes={heroes} /> */}
      {/* <Hero2 heroes={heroes} /> */}
      <Hero3 heroes={heroes} />
    </>
  );
}
