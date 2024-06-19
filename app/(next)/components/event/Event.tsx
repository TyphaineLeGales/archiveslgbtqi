import React from "react";
import { EventsQueryResult } from "@/sanity.types";

import EventDesktop from "./EventDesktop";
import EventMobile from "./EventMobile";

type EventProps = {
  event: EventsQueryResult;
};

export default function Event({ event }: EventProps) {
  return (
    <>
      <EventMobile event={event} />
      <EventDesktop event={event} />
    </>
  );
}
