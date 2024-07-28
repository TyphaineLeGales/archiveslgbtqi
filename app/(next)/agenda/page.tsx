import React from "react";

import { sanityFetch } from "@/sanity/lib/fetch";

import { lastEventQuery, pastEventQuery } from "@/sanity/lib/queries";
import { LastEventQueryResult, PastEventQueryResult } from "@/sanity.types";

import { AgendaDesktopSidebar, EventsMap } from "../components/agenda";

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
    <div className="relative mx-auto mt-[3rem] min-h-screen pb-[1rem] lg:max-w-[1440px]">
      <AgendaDesktopSidebar />
      <div className="flex flex-col gap-[5rem] px-[1rem] lg:ml-arch lg:pr-[3rem]">
        <EventsMap id="future" eventsMap={futureEvent} />
        <EventsMap id="past" eventsMap={pastEvent} />
      </div>
    </div>
  );
}
