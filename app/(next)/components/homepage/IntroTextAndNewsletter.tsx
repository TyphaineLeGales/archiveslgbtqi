"use client";
import React from "react";

import { HomepageQueryResult } from "@/sanity.types";
import { MyCustomPortableText } from "../ui";
import Newsletters from "../ui/NewsLetters";

type Props = {
  intro: HomepageQueryResult;
};

export default function IntroductionText({ intro }: Props) {
  return (
    <div className="bg-pink-arch">
      <div className="mx-auto max-w-[1440px]">
        {intro?.introText?.introTextVisibility && (
          <div className="min-h-full min-w-full px-[1rem] py-[5rem] lg:px-0">
            <div className="min-h-full gap-[3rem] space-y-[5rem] lg:mx-arch">
              <div className="flex flex-col gap-[2rem] text-start">
                <MyCustomPortableText
                  value={intro?.introText?.introTextContent as any}
                  className="min-w-full font-cityburn text-[1.75rem] leading-[1.9rem] tracking-wider text-black"
                />
              </div>
              <div className="flex flex-col gap-[2rem]">
                <p className="prose font-tanker text-[1.5rem] leading-[1.5rem] tracking-wider text-white lg:text-[2.5rem] lg:leading-[2.75rem]">
                  {intro?.introText?.newsletterTextContent}
                </p>
                <div className="relative h-[2.5rem] min-w-full">
                  <Newsletters />
                  <div className="absolute inset-x-0 bottom-[1px] h-[2px] w-[calc(100%-3.5rem)] bg-white" />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
