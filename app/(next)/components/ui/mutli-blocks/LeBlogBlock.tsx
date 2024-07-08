import React from "react";
import Link from "next/link";
import { HomepageQueryResult } from "@/sanity.types";

type Props = {
  multiBlocks: HomepageQueryResult;
  blogRef: React.MutableRefObject<HTMLDivElement | null>;
  overlayBlogRef: React.MutableRefObject<HTMLDivElement | null>;
};

export default function LeBlogBlock({
  multiBlocks,
  blogRef,
  overlayBlogRef,
}: Props) {
  return (
    <div className="sticky top-0 flex min-h-[50vh] items-center justify-center p-[5rem]">
      <div
        ref={blogRef}
        className="boxRounded group/title group/overlay relative mt-[4vh] flex min-h-[calc(46vh-1rem)] w-full items-center justify-center overflow-hidden border-[1px] border-black-primary bg-white-primary p-[1rem]"
      >
        <div
          ref={overlayBlogRef}
          className="absolute inset-0 z-0 h-full w-full origin-center bg-[#ECC810]"
        />
        <Link
          href="/blog"
          className="z-10 flex h-[1.5rem] flex-col overflow-hidden text-[1.5rem] font-bold uppercase leading-[1.5rem] tracking-tighter"
        >
          <span className="transition-transform duration-500 ease-tamisitée group-hover/title:translate-y-[-100%]">
            {multiBlocks?.multiBlock?.leBlogBlock?.blogLabel}
          </span>
          <span className="transition-transform duration-500 ease-tamisitée group-hover/title:translate-y-[-100%]">
            {multiBlocks?.multiBlock?.leBlogBlock?.blogLabel}
          </span>
        </Link>
      </div>
    </div>
  );
}
