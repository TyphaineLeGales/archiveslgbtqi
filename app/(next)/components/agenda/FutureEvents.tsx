import React from "react";

import Image from "next/image";

import { LastEventQueryResult } from "@/sanity.types";
import { DateHourFormat, MyCustomPortableText } from "../ui";
import { PortableTextBlock } from "next-sanity";

type FutureEventProps = {
  id: string;
  futureEvent: LastEventQueryResult;
};

export default function FutureEvents({ id, futureEvent }: FutureEventProps) {
  return (
    <div id="future" className="flex flex-col gap-[1rem]">
      <h1 className="pageTitle">À venir</h1>
      <div className="">
        {futureEvent.map((event) => (
          <div
            key={event._id}
            className="flex justify-between border-t-[3px] border-black pb-[3rem]"
          >
            <div className="flex flex-col justify-between">
              <div>
                <h2>{event.eventType}</h2>
                <h2>{event.eventTitle}</h2>
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
