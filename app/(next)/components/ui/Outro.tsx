import React from "react";

import { HomepageQueryResult } from "@/sanity.types";

import MyCustomPortableText from "./MyCustomPortableText";

type Props = {
  outro: HomepageQueryResult;
};

export default function Outro({ outro }: Props) {
  return (
    <div className="flex items-center justify-center py-[5rem]">
      <MyCustomPortableText
        value={outro?.outro?.outroText! as any}
        className="w-full px-[1rem] text-[1rem] leading-[1.5rem] tracking-tight lg:w-[50%]"
      />
    </div>
  );
}
