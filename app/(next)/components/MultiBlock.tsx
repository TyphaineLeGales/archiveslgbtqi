import { HomepageQueryResult } from "@/sanity.types";
import Link from "next/link";
import React from "react";
import Image from "next/image";

type Props = {
  multiBlocks: HomepageQueryResult;
};

export default function MultiBlock({ multiBlocks }: Props) {
  return (
    <div className="flex min-h-[50vh] divide-x-[1px] divide-black bg-white px-[1rem]">
      {/* Agenda */}
      <div className="w-1/3">
        <Link href="/agenda" className="bg-white">
          L&apos;agenda
        </Link>
        <div>
          {multiBlocks?.multiBlock?.eventsBlock?.events?.map((event, index) => (
            <div key={`event-${index}`}>
              <Link
                href={`/agenda/${event.slug?.current || ""}`}
                className="bg-white"
              >
                {event.eventTitle}
              </Link>
              <Image
                src={event.image?.imageUrl || ""}
                alt={event.image?.alt || ""}
                width="100"
                height="100"
                className="h-auto w-full"
              />
            </div>
          ))}
        </div>
      </div>
      {/* Les Archives Vivantes */}
      <div className="w-1/3">
        <h1 className="whitespace-nowrap">Les Archives Vivantes</h1>
        <div className="flex flex-col">
          <Link
            href={
              multiBlocks?.multiBlock?.lesArchivesVivantesBlock?.vimeo
                ?.linkToVimeo || ""
            }
            className="bg-white"
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
            className="bg-white"
          >
            {
              multiBlocks?.multiBlock?.lesArchivesVivantesBlock?.podcast
                ?.podcastTitle
            }
          </Link>
        </div>
      </div>
      {/* Le Blog */}
      <div className="w-1/3">
        <h1>Le Blog</h1>
        <Link
          href={multiBlocks?.multiBlock?.leBlogBlock?.linkToBlog || ""}
          className="bg-white"
        >
          {multiBlocks?.multiBlock?.leBlogBlock?.blogLabel}
        </Link>
      </div>
    </div>
  );
}
