"use client";

import React, { useEffect } from "react";

import Lenis from "lenis";

import { HomepageQueryResult } from "@/sanity.types";
import { Hero2, Hero3 } from "./Heroes";

type Props = {
  heroes: HomepageQueryResult;
};

export default function HeroSection({ heroes }: Props) {
  useEffect(() => {
    const lenis = new Lenis();

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  }, []);

  if (!heroes) {
    return <h1>No Heroes Found</h1>;
  }

  return (
    <>
      {/* <StickyHero heroes={heroes} /> */}
      {/* <Hero2 heroes={heroes} /> */}
      <Hero3 heroes={heroes} />
    </>
  );
}
