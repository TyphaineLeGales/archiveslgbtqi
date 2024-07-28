import React from "react";

import { sanityFetch } from "@/sanity/lib/fetch";

import { lastEventQuery, pastEventQuery } from "@/sanity/lib/queries";
import { LastEventQueryResult, PastEventQueryResult } from "@/sanity.types";

import {
  AgendaDesktopSidebar,
  FutureEvents,
  PastEvents,
} from "../components/agenda";

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
      <div className="flex flex-col gap-[5rem] pr-[3rem] lg:ml-arch">
        <FutureEvents id="future" futureEvent={futureEvent} />
        <PastEvents id="past" pastEvent={pastEvent} />
      </div>
    </div>
  );
}
