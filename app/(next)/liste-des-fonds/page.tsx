import React from "react";

import { ListeDeFondsQueryResult } from "@/sanity.types";
import { sanityFetch } from "@/sanity/lib/fetch";
import { listeDeFondsQuery } from "@/sanity/lib/queries";

import { LDFBlock } from "../components/liste-des-fonds";
import LDFDesktopSidebar from "../components/liste-des-fonds/LDFDesktopSidebar";
import { MyCustomPortableText } from "../components/ui";
import { PortableTextBlock } from "next-sanity";

export default async function Page() {
  const [list] = await Promise.all([
    sanityFetch<ListeDeFondsQueryResult>({
      query: listeDeFondsQuery,
    }),
  ]);

  // console.log(list);

  return (
    <div className="relative mx-auto flex h-full min-h-full w-auto max-w-[1440px] p-[1rem] lg:p-0">
      <LDFDesktopSidebar content={list} />
      <div className="flex h-full w-full flex-col overflow-hidden pt-[2rem] lg:pr-[3rem] lg:pt-[3rem]">
        <div className="space-y-[3rem]">
          <h1 className="font-tanker text-[2rem] uppercase leading-[1.2rem] tracking-wider lg:text-[4rem] lg:leading-[3.2rem]">
            {list?.title}
          </h1>
          <MyCustomPortableText
            value={list?.introduction as PortableTextBlock[]}
            className="richText min-w-full pr-[3rem]"
          />
        </div>
        <LDFBlock list={list} />
      </div>
    </div>
  );
}
