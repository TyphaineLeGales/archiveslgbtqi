"use client";

import React from "react";

import { HomepageQueryResult } from "@/sanity.types";
import { Hero } from "./Heroes";

type Props = {
  heroes: HomepageQueryResult;
};

export default function HeroSection({ heroes }: Props) {
  return (
    <>
      <Hero heroes={heroes} />
    </>
  );
}
