import React from "react";
import { EventsQueryResult } from "@/sanity.types";

import EventDesktop from "./EventsDesktop";
import EventMobile from "./EventsMobile";

type EventsProps = {
  events: EventsQueryResult;
};

export default function Events({ events }: EventsProps) {
  return (
    <>
      <EventMobile event={events} />
      <EventDesktop event={events} />
    </>
  );
}
