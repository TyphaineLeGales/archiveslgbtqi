import { HomepageQueryResult } from "@/sanity.types";
import React from "react";
import CustomPortableText from "../portable-text";
import { PortableText } from "next-sanity";

type Props = {
  outro: HomepageQueryResult;
};

export default function OutroBlock({ outro }: Props) {
  return (
    <div className="flex items-center justify-center py-[5rem]">
      <CustomPortableText
        value={outro?.outro?.outroText! as any}
        className="w-full px-[1rem] text-[1rem] leading-[1.5rem] tracking-tight lg:w-[50%]"
      />
    </div>
  );
}
