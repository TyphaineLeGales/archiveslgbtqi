import React from "react";

import { EventsQueryResult } from "@/sanity.types";
import { sanityFetch } from "@/sanity/lib/fetch";
import { eventsQuery } from "@/sanity/lib/queries";

import Event from "../components/events/Events";

export default async function Page() {
  const [events] = await Promise.all([
    sanityFetch<EventsQueryResult>({
      query: eventsQuery,
    }),
  ]);

  console.log("Events:", events);
  return (
    <div className="min-h-[85dvh] py-[1rem]">
      {/* <h1 className="whitespace-nowrap px-[1rem] pb-[2rem] text-[3rem] font-semibold uppercase leading-[2.5rem] tracking-tighter">
        L&apos;agenda
      </h1> */}
      <Event events={events} />
    </div>
  );
}
