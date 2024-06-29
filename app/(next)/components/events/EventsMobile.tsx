"use client";

import React, { useState } from "react";

import { useRouter } from "next/navigation";
import { EventsQueryResult } from "@/sanity.types";

import clsx from "clsx";

import { DateHourFormat, TextMarquee } from "../ui";
import { NorthEastArrow } from "../ui/icon";

type EventProps = {
  event: EventsQueryResult;
};

export default function EventsMobile({ event }: EventProps) {
  const router = useRouter();
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const [isClickedIndex, setIsClickedIndex] = useState<number | null>(null);
  const [isLinkClicked, setIsLinkClicked] = useState<boolean>(false);

  const handleClicked = (index: number) => {
    if (isClickedIndex === index) {
      setIsClickedIndex(null);
      setIsClicked(false);
    } else {
      setIsClickedIndex(index);
      setIsClicked(true);
    }
  };

  return (
    <div className="no-scrollbar flex min-h-[85dvh] flex-col justify-end lg:hidden">
      {event?.map((eventItem, index) => (
        <div
          key={`event-${index}`}
          onClick={() => handleClicked(index)}
          className="group relative flex h-auto cursor-pointer items-start overflow-hidden border-b-[1px] border-black pb-[2rem]"
        >
          <div className="relative flex w-full flex-col justify-start gap-[1rem]">
            <div className="flex items-center justify-between">
              {eventItem.eventTitle?.length! > 15 ? (
                <TextMarquee
                  text={eventItem.eventTitle!}
                  className={clsx(
                    isClicked && isClickedIndex === index
                      ? "w-[calc(50%+1rem)] animate-marquee rounded-r-full"
                      : "",
                    "eventTitle whitespace-nowrap px-[1rem] pt-[.5rem]",
                  )}
                />
              ) : (
                <h2 className="eventTitle px-[1rem] pt-[.5rem]">
                  {eventItem.eventTitle}
                </h2>
              )}
              <div className="overflow-hidden">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setIsLinkClicked(true);
                    setTimeout(() => {
                      router.push(`/agenda/${eventItem.slug?.current}`);
                    }, 1000);
                  }}
                  className="flex w-auto justify-end rounded-l-full border-b-[1px] border-l-[1px] border-t-[1px] border-black bg-white py-[.30rem] pl-[5rem] pr-[1rem]"
                >
                  <NorthEastArrow className="aspect-square h-[2rem] w-[2rem] pt-1" />
                </button>
              </div>
            </div>
            <div className="mx-[1rem] flex justify-between rounded-full border-[1px] border-black px-[1rem] py-[.25rem] text-[.75rem]">
              <DateHourFormat
                dateString={eventItem.eventDate?.eventStartDate || ""}
              />
              {eventItem.eventDate?.addEndDate && (
                <div className="flex w-1/2 items-center justify-between">
                  <span className="mx-[0.5rem]">→</span>
                  <DateHourFormat
                    dateString={eventItem.eventDate?.eventEndDate || ""}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
