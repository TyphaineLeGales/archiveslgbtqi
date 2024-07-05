import React from "react";
import Link from "next/link";
import { HomepageQueryResult } from "@/sanity.types";

type Props = {
  multiBlocks: HomepageQueryResult;
  archivesVivantesRef: React.MutableRefObject<HTMLDivElement | null>;
  overlayArchivesVivantesRef: React.MutableRefObject<HTMLDivElement | null>;
};

export default function LesArchivesVivantesBlock({
  multiBlocks,
  archivesVivantesRef,
  overlayArchivesVivantesRef,
}: Props) {
  return (
    <div className="sticky top-0 flex min-h-[50vh] items-center justify-center p-[5rem]">
      <div
        ref={archivesVivantesRef}
        className="boxRounded group/title group/overlay relative mt-[2vh] flex min-h-[calc(48vh-1rem)] w-full items-center justify-center overflow-hidden border-[1px] border-black-primary bg-white-primary p-[1rem]"
      >
        <div
          ref={overlayArchivesVivantesRef}
          className="absolute inset-0 z-0 h-full w-full origin-center bg-[#FF5C00]"
        />
        <h1 className="z-10 flex h-[1.5rem] flex-col overflow-hidden text-[1.5rem] font-bold uppercase leading-[1.5rem] tracking-tighter">
          <span className="transition-transform duration-500 ease-tamisitée group-hover/title:translate-y-[-100%]">
            Les Archives Vivantes
          </span>
          <span className="transition-transform duration-500 ease-tamisitée group-hover/title:translate-y-[-100%]">
            Les Archives Vivantes
          </span>
        </h1>
        <div className="z-10 flex flex-col lg:pt-[2rem]">
          <Link
            href={
              multiBlocks?.multiBlock?.lesArchivesVivantesBlock?.vimeo
                ?.linkToVimeo || ""
            }
          >
            {
              multiBlocks?.multiBlock?.lesArchivesVivantesBlock?.vimeo
                ?.vimeoTitle
            }
          </Link>
          <Link
            href={
              multiBlocks?.multiBlock?.lesArchivesVivantesBlock?.podcast
                ?.linkToPodcast || ""
            }
          >
            {
              multiBlocks?.multiBlock?.lesArchivesVivantesBlock?.podcast
                ?.podcastTitle
            }
          </Link>
        </div>
      </div>
    </div>
  );
}
