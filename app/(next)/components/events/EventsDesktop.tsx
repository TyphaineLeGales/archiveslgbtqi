"use client";

import React, { useState, useEffect } from "react";

import Image from "next/image";

import { EventsQueryResult } from "@/sanity.types";

import { DateHourFormat, TextMarquee } from "../ui";
import TransitionLink from "../ui/TransitionLink";
import Link from "next/link";

type EventProps = {
  event: EventsQueryResult;
};

export default function EventsDesktop({ event }: EventProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const handleMouseEnter = (index: number) => {
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className="hidden min-h-[85dvh] flex-col justify-end lg:flex">
      {event?.map((eventItem, index) => (
        <Link
          key={`event-${index}`}
          href={`/agenda/${eventItem.slug?.current}`}
          className="group relative flex items-start overflow-hidden border-b-[1px] border-black bg-white"
        >
          {hoveredIndex === index && (
            <div
              style={{
                top: mousePosition.y,
                left: mousePosition.x,
              }}
              className="pointer-events-none fixed z-50"
            >
              <Image
                src={
                  eventItem.image?.imageUrl ||
                  "https://via.placeholder.com/1000x1000"
                }
                alt={eventItem.image?.alt || "Event image"}
                width={250}
                height={250}
                loading="eager"
                className="h-full w-full origin-bottom object-cover"
              />
            </div>
          )}

          <div className="relative flex h-auto w-full flex-col px-[1rem]">
            <div className="flex items-center justify-between">
              {eventItem.eventTitle?.length! > 15 ? (
                <div className="flex h-[5.5rem] flex-col overflow-hidden rounded-r-full">
                  <TextMarquee
                    text={eventItem.eventTitle!}
                    className="eventTitle whitespace-nowrap transition-transform delay-200 duration-500 ease-tamisitée group-hover:animate-marquee"
                  />
                </div>
              ) : (
                <div className="flex h-[5.5rem] flex-col overflow-hidden">
                  <h2 className="eventTitle transition-transform delay-200 duration-500 ease-tamisitée group-hover:translate-y-[-100%]">
                    {eventItem.eventTitle}
                  </h2>
                  <h2 className="eventTitle transition-transform delay-200 duration-500 ease-tamisitée group-hover:translate-y-[-100%]">
                    {eventItem.eventTitle}
                  </h2>
                </div>
              )}

              <div className="whitespace-nowrap rounded-full border-[1px] border-black px-[1rem] py-[.25rem] text-[.75rem]">
                <DateHourFormat
                  dateString={eventItem.eventDate?.eventStartDate || ""}
                />
                {eventItem.eventDate?.addEndDate && (
                  <>
                    <span className="mx-[0.5rem]">-</span>
                    <DateHourFormat
                      dateString={eventItem.eventDate?.eventEndDate || ""}
                    />
                  </>
                )}
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
