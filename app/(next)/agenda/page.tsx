import React from "react";

import { sanityFetch } from "@/sanity/lib/fetch";

import { lastEventQuery, pastEventQuery } from "@/sanity/lib/queries";
import { LastEventQueryResult, PastEventQueryResult } from "@/sanity.types";

import { AgendaDesktopSidebar, EventsMap } from "../components/agenda";

type EventDate = {
  status: "past" | "future";
  entry: "past" | "future";
};

export default async function Page() {
  const [pastEvent, futureEvent] = await Promise.all([
    sanityFetch<PastEventQueryResult>({
      query: pastEventQuery,
    }),

    sanityFetch<LastEventQueryResult>({
      query: lastEventQuery,
    }),
  ]);

  return (
    <div className="relative mx-auto flex min-h-full w-auto max-w-[1440px] p-[1rem] lg:p-0">
      <AgendaDesktopSidebar />
      <div className="flex w-full flex-col gap-[7rem] overflow-hidden pt-[3rem] lg:pr-[3rem]">
        <EventsMap
          id="future"
          status="future"
          entry="future"
          eventsMap={futureEvent}
        />
        <EventsMap id="past" status="past" entry="past" eventsMap={pastEvent} />
      </div>
    </div>
  );
}
