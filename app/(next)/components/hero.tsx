/* eslint-disable @next/next/no-img-element */
import { HomepageQueryResult, PagesContentQueryResult } from "@/sanity.types";
import { heroQuery } from "@/sanity/lib/queries";
import React from "react";

type Props = {
  hero: HomepageQueryResult;
  content?: PagesContentQueryResult;
};

export default function Hero({ hero, content }: Props) {
  // console.log("Content: ", hero?.cta?.sections);
  return (
    <div className="relative mt-[1rem] flex h-[calc(90vh-1rem)] flex-col justify-between p-[2rem]">
      <p className="w-1/3 text-left text-[1.5rem] font-semibold leading-[1.5rem] tracking-tighter">
        {hero?.hero?.description}
      </p>
      <h1 className="text-center text-[8rem] font-black uppercase leading-[6.5rem] tracking-tighter">
        {hero?.hero?.heading}
      </h1>
      <div className="flex justify-end">
        {/* <a
          // href={hero?.hero?.url?.current || ""}
          // href={`/${hero?.hero?.url?.current} || /${content?.slug?.current}/${hero?.hero?.url?.current}`}
          href={
            `/${hero?.cta?.sections[0]._type === "pages" ? hero?.cta?.sections[0].slug.current : hero?.cta?.sections[0].slug.current}/${hero?.hero?.url}` ||
            "/"
          }
          className="flex items-center justify-center border-[1px] border-black px-[2rem] py-[.5rem] text-[1rem] font-semibold uppercase tracking-tighter transition-all duration-300 ease-in-out hover:bg-black hover:text-white"
        >
          {hero?.hero?.ctatext}
        </a> */}
      </div>
      <img
        src={hero?.hero?.imageUrl || "https://via.placeholder.com/1920x1080"}
        alt="image"
        width="100%"
        height="auto"
        className="absolute left-0 top-0 -z-10 h-[calc(90vh-1rem)]"
      />
    </div>
  );
}
