import React from "react";
import Link from "next/link";
import { HomepageQueryResult } from "@/sanity.types";

type CTAMarqueeProps = {
  marquee: HomepageQueryResult;
};

export default function CTAMarquee({ marquee }: CTAMarqueeProps) {
  return (
    <>
      {marquee?.marqueeCTA?.marqueeCTAVisibility && (
        <Link
          href={marquee?.marqueeCTA?.marqueeLink || ""}
          className="marquee-container group flex h-[58px] w-full items-center overflow-hidden bg-pink-arch"
        >
          <span className="marquee mt-[.75rem] whitespace-nowrap font-cityburn text-[2.75rem] leading-[1rem] tracking-wider text-white transition-colors duration-100 ease-tamisitée group-hover:text-black">
            {marquee?.marqueeCTA?.marqueeContent}
          </span>
        </Link>
      )}
    </>
  );
}
