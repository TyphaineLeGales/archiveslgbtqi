import React from "react";

import Link from "next/link";

import { LastEventQueryResult } from "@/sanity.types";

import { DateHourFormat } from "../ui";
import TransitionLink from "../ui/TransitionLink";

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
          <TransitionLink href={`/agenda/${event.slug?.current}`}>
            <h2>{event.eventTitle}</h2>
            <div className="inline-block">
              <DateHourFormat
                dateString={event.eventDate?.eventStartDate || ""}
              />
              {event.eventDate?.eventEndDate && (
                <>
                  <span>&nbsp;-&nbsp;</span>
                  <DateHourFormat
                    dateString={event.eventDate?.eventEndDate || ""}
                  />
                </>
              )}
            </div>
            <p>{event.eventLocation}</p>
          </TransitionLink>
        </li>
      ))}
      <TransitionLink href="/agenda" className="underline">
        {link}
      </TransitionLink>
    </ul>
  );
}
