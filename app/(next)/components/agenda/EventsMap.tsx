import React from "react";

import { PortableTextBlock } from "next-sanity";

import { LastEventQueryResult, PastEventQueryResult } from "@/sanity.types";

import { DateHourFormat, MyCustomPortableText } from "../ui";
import ButtonImage from "./ButtonImage";

import clsx from "clsx";
import DateFormat from "../ui/DateAndHourFormat/DateFormat";

type FutureEventProps = {
  id: string;
  eventsMap: LastEventQueryResult | PastEventQueryResult;
  status?: string;
  entry?: string;
};

export default function EventsMap({
  id,
  eventsMap,
  status,
  entry,
}: FutureEventProps) {
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
                  {(event.dateType as String) === "single" && (
                    <>
                      <DateFormat
                        formatType="full"
                        dateString={event.singleDateGroup?.singleDate || ""}
                      />{" "}
                      -{" "}
                      {event.singleDateGroup?.singleEndTime ? (
                        <>
                          <>entre {event.singleDateGroup?.singleStartTime}</>
                          <> et {event.singleDateGroup?.singleEndTime}</>
                        </>
                      ) : (
                        <>{event.singleDateGroup?.singleStartTime}</>
                      )}
                    </>
                  )}
                  {(event.dateType as String) === "range" && (
                    <>
                      <DateFormat
                        formatType="fullNoYear"
                        dateString={event.rangeDateGroup?.rangeStartDate || ""}
                      />{" "}
                      -{" "}
                      <DateFormat
                        formatType="full"
                        dateString={event.rangeDateGroup?.rangeEndDate || ""}
                      />{" "}
                      -{" "}
                      {event.rangeDateGroup?.rangeEndDate ? (
                        <>
                          <>{event.rangeDateGroup?.rangeStartTime}</>
                        </>
                      ) : (
                        <>{event.rangeDateGroup?.rangeStartTime}</>
                      )}
                    </>
                  )}
                </div>
                <div className="flex flex-col gap-[.25rem] pt-[1rem]">
                  <span className="eventLocation">{event.eventLocation}</span>
                  <span
                    className={clsx(
                      "eventEntrance text-black",
                      entry === "future" && "text-pink-arch",
                    )}
                  >
                    {event.eventEntrance}
                  </span>
                </div>
              </div>
              <div className="pt-[3rem] lg:pt-0">
                <MyCustomPortableText
                  value={event.eventDescription as PortableTextBlock[]}
                  className="eventParagraph min-w-full pb-[.12.5rem]"
                />
              </div>
            </div>
            <div className="flex cursor-pointer items-start justify-center">
              <ButtonImage status={status} event={event as any} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
