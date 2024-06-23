import { HomepageQueryResult } from "@/sanity.types";
import React from "react";
import CustomPortableText from "../portable-text";
import { PortableText } from "next-sanity";

type Props = {
  outro: HomepageQueryResult;
};

export default function OutroBlock({ outro }: Props) {
  return (
    <div>
      <h1>OutroBlock</h1>
      <div className="min-h-full">
        <CustomPortableText value={outro?.outro?.outroText! as any} />
      </div>
    </div>
  );
}
