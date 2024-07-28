import React from "react";

import Image from "next/image";
import { PortableTextBlock } from "next-sanity";

import { LastEventQueryResult, PastEventQueryResult } from "@/sanity.types";

import { DateHourFormat, MyCustomPortableText } from "../ui";

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
            className="flex justify-between border-t-[3px] border-black pb-[3rem]"
          >
            <div className="flex flex-col justify-between">
              <div>
                <h2 className="eventType">{event.eventType}</h2>
                <h2 className="eventTitle">{event.eventTitle}</h2>
                <div className="flex gap-[.5rem]">
                  <DateHourFormat
                    dateString={event.eventDate?.eventStartDate || ""}
                  />
                  <span>-</span>
                  <span>{event.eventLocation}</span>
                </div>
                <span>{event.eventEntrance}</span>
              </div>
              <div>
                <MyCustomPortableText
                  value={event.eventDescription as PortableTextBlock[]}
                />
              </div>
            </div>
            <div>
              <div>
                <Image
                  src={event.image?.imageUrl || ""}
                  alt={event.image?.alt || ""}
                  width={450}
                  height={400}
                  className="h-[400px] w-[450px]"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
