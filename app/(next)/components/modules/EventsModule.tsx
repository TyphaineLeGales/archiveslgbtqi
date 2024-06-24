import { EventQueryResult, EventsQueryResult } from "@/sanity.types";
import React from "react";

type Props = {
  events: EventsQueryResult;
};

export default function EventsModule({ events }: Props) {
  return (
    <div>
      <h1>Events</h1>
      <ul>
        {events.map((event) => (
          <li key={event.eventTitle}>
            <h2>{event.eventTitle}</h2>
            <p>{event.eventDescription}</p>
            <p>{event.eventDate?.eventStartDate}</p>
            <p>{event.eventLocation}</p>
            {/* <img src={event.image.imageUrl} alt={event.image.alt} /> */}
          </li>
        ))}
      </ul>
    </div>
  );
}
