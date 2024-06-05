/* eslint-disable @next/next/no-img-element */
import { HomepageQueryResult } from "@/sanity.types";
import { heroQuery } from "@/sanity/lib/queries";
import React from "react";

type Props = {
  hero: HomepageQueryResult;
};

export default function Hero({ hero }: Props) {
  console.log("Comp:", hero?.hero);
  return (
    <div className="relative flex flex-col justify-between mt-[1rem] h-[calc(90vh-1rem)] p-[2rem]">
      <h1 className=" place-content-center">{hero?.hero?.heading}</h1>
      <p className="">{hero?.hero?.description}</p>
      <a href={hero?.hero?.url?.current || ""}>{hero?.hero?.ctatext}</a>
      <img
        src={hero?.hero?.imageUrl || "https://via.placeholder.com/1920x1080"}
        alt="image"
        width="100%"
        height="auto"
        className="h-[calc(90vh-1rem)] absolute top-0 left-0 -z-10"
      />
    </div>
  );
}
