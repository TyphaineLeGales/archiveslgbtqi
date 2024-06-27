"use client";

import React, { useEffect } from "react";

import Lenis from "lenis";

import { HomepageQueryResult } from "@/sanity.types";
import { CustomStickyHero, StickyHero } from "./Heroes";

type Props = {
  heroes: HomepageQueryResult;
};

const AnimatedText = {
  hidden: { y: "100%" },
  visible: { y: 0 },
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
      <CustomStickyHero heroes={heroes} />
    </>
  );
}
