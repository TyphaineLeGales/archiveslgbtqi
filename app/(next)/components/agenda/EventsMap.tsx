import React from "react";

import Image from "next/image";
import { PortableTextBlock } from "next-sanity";

import { LastEventQueryResult, PastEventQueryResult } from "@/sanity.types";

import { DateHourFormat, MyCustomPortableText } from "../ui";
import ButtonImage from "./ButtonImage";

type FutureEventProps = {
  id: string;
  eventsMap: LastEventQueryResult | PastEventQueryResult;
};

export default function EventsMap({ id, eventsMap }: FutureEventProps) {
  return (
    <div id={id} className="flex flex-col gap-[1rem]">
      <h1 className="pageTitle">{id === "future" ? "À venir" : "Passés"}</h1>
      <div className="">
        {eventsMap.map((event) => (
          <div
            key={event._id}
            className="flex flex-col justify-between gap-[1rem] border-t-[3px] border-black pb-[3rem] lg:flex-row lg:gap-[5rem]"
          >
            <div className="flex flex-col lg:justify-between">
              <div>
                <h2 className="eventType">{event.eventType}</h2>
                <h2 className="eventTitle">{event.eventTitle}</h2>
                <div className="eventDate flex flex-col pt-[1rem] lg:flex-row lg:gap-[.5rem]">
                  <DateHourFormat
                    dateString={event.eventDate?.eventStartDate || ""}
                  />
                  {event.eventDate?.eventEndDate && (
                    <div className="inline-block h-fit">
                      <br className="block lg:hidden" />
                      <span>jusqu&apos;au </span>
                      <DateHourFormat
                        dateString={event.eventDate?.eventEndDate || ""}
                      />
                    </div>
                  )}
                </div>
                <div className="flex flex-col gap-[.25rem] pt-[1rem]">
                  <span className="eventLocation">{event.eventLocation}</span>
                  <span className="eventEntrance">{event.eventEntrance}</span>
                </div>
              </div>
              <div className="pt-[3rem] lg:pt-0">
                <MyCustomPortableText
                  value={event.eventDescription as PortableTextBlock[]}
                  className="eventParagraph"
                />
              </div>
            </div>
            <div>
              <ButtonImage event={event as any} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
