import React from "react";

import Link from "next/link";

import { LastEventQueryResult } from "@/sanity.types";

import { DateAndHour } from "../ui";

type Props = {
  events: LastEventQueryResult;
  title: string;
  link: string;
};

export default function EventsModule({ events, title, link }: Props) {
  return (
    <ul className="flex flex-col gap-[1rem]">
      <h1>{title}</h1>
      {events.map((event) => (
        <li key={event.eventTitle}>
          <Link href={`/agenda/${event.slug?.current}`}>
            <h2>{event.eventTitle}</h2>
            <div className="inline-block">
              <DateAndHour dateString={event.eventDate?.eventStartDate || ""} />
              {event.eventDate?.eventEndDate && (
                <>
                  <span>&nbsp;-&nbsp;</span>
                  <DateAndHour
                    dateString={event.eventDate?.eventEndDate || ""}
                  />
                </>
              )}
            </div>
            <p>{event.eventLocation}</p>
          </Link>
        </li>
      ))}
      <Link href="/agenda" className="underline">
        {link}
      </Link>
    </ul>
  );
}
