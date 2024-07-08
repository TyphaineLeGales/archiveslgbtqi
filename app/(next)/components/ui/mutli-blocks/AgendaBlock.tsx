import React from "react";
import Link from "next/link";
import { HomepageQueryResult } from "@/sanity.types";

type Props = {
  multiBlocks: HomepageQueryResult;
  agendaRef: React.MutableRefObject<HTMLDivElement | null>;
  overlayAgendaRef: React.MutableRefObject<HTMLDivElement | null>;
};

export default function AgendaBlock({
  multiBlocks,
  agendaRef,
  overlayAgendaRef,
}: Props) {
  return (
    <div className="sticky top-0 mt-[45vh] flex min-h-[50vh] items-center justify-center p-[5rem]">
      <div
        ref={agendaRef}
        className="boxRounded group/title relative flex min-h-[calc(50vh-1rem)] w-full flex-col items-center justify-start overflow-hidden border-[1px] border-black-primary p-[1rem]"
      >
        <div
          ref={overlayAgendaRef}
          className="absolute inset-0 z-0 h-full w-full bg-[#29AB87]"
        />
        <Link
          href="/agenda"
          className="absolute left-[1rem] top-[1rem] z-10 flex h-[4rem] flex-col overflow-hidden text-[4rem] font-bold uppercase leading-[4rem] tracking-tighter"
        >
          <span className="z-10 transition-transform duration-500 ease-tamisitée group-hover/title:translate-y-[-100%]">
            L&apos;agenda
          </span>
          <span className="z-10 transition-transform duration-500 ease-tamisitée group-hover/title:translate-y-[-100%]">
            L&apos;agenda
          </span>
        </Link>

        <div className="z-10 mt-[5rem] flex w-full flex-col gap-[1rem]">
          {multiBlocks?.multiBlock?.eventsBlock?.events?.map((event, index) => (
            <Link
              key={index}
              href={`/agenda/${event.slug?.current || ""}`}
              className="boxRounded group/eventTitle relative z-10 flex h-[5rem] w-full flex-col items-start justify-center overflow-hidden truncate border-[1px] border-black-primary px-[1rem] text-[1.5rem] uppercase leading-[1.5rem] text-black-primary"
            >
              <div className="flex h-[1.5rem] flex-col overflow-hidden">
                <span className="z-10 tracking-tighter transition-transform duration-500 ease-tamisitée group-hover/eventTitle:translate-y-[-100%]">
                  {event.eventTitle}
                </span>
                <span className="z-10 tracking-tighter transition-transform duration-500 ease-tamisitée group-hover/eventTitle:translate-y-[-100%]">
                  {event.eventTitle}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
