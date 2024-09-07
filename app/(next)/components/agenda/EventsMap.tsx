import React from "react";

import { PortableTextBlock } from "next-sanity";

import clsx from "clsx";

import { LastEventQueryResult, PastEventQueryResult } from "@/sanity.types";

import { DateHourFormat, MyCustomPortableText } from "../ui";
import ButtonImage from "./ButtonImage";

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
            className={clsx(
              "flex flex-col justify-between gap-[1rem] border-t-[3px] border-black lg:flex-row lg:gap-[5rem]",
              event !== eventsMap[eventsMap.length - 1] && "pb-[3rem]",
            )}
          >
            <div className="flex flex-col lg:justify-between">
              <div>
                <h2 className="eventType">{event.eventType}</h2>
                <h2 className="eventTitle">{event.eventTitle}</h2>
                <div className="eventDate flex flex-col pt-[1rem] lg:flex-row lg:gap-[.5rem]">
                  {(event.eventDate?.eventDateType as String) ===
                  "dateRange" ? (
                    <>
                      <DateHourFormat
                        formatType="fullDate"
                        dateString={event.eventDate?.eventStartDate || ""}
                      />
                      {event.eventDate?.eventEndDate && (
                        <>
                          {" - "}
                          <DateHourFormat
                            formatType="fullDateWithYear"
                            dateString={event.eventDate?.eventEndDate || ""}
                          />
                        </>
                      )}
                      {" - "}
                      <DateHourFormat
                        formatType="shortHour"
                        dateString={event.eventDate?.eventStartDate || ""}
                      />
                    </>
                  ) : (
                    <>
                      <DateHourFormat
                        formatType="fullDateWithYear"
                        dateString={event.eventDate?.eventStartDate || ""}
                      />
                      {event.eventDate?.eventEndDate ? (
                        <>
                          {" - Entre"}
                          <DateHourFormat
                            formatType="shortHour"
                            dateString={event.eventDate?.eventStartDate || ""}
                          />
                          -
                          <DateHourFormat
                            formatType="shortHour"
                            dateString={event.eventDate?.eventEndDate || ""}
                          />
                        </>
                      ) : (
                        <>
                          {" - "}
                          <DateHourFormat
                            formatType="shortHour"
                            dateString={event.eventDate?.eventStartDate || ""}
                          />
                        </>
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
