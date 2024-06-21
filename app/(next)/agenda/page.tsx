import React from "react";

import { sanityFetch } from "@/sanity/lib/fetch";

import Event from "../components/events/Events";
import { eventsQuery } from "@/sanity/lib/queries";
import { EventsQueryResult } from "@/sanity.types";

export default async function Page() {
  const [events] = await Promise.all([
    sanityFetch<EventsQueryResult>({
      query: eventsQuery,
    }),
  ]);

  return (
    <div className="min-h-[100dvh] py-[1rem]">
      <Event events={events} />
    </div>
  );
}
