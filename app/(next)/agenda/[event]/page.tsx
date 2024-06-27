import React from "react";
import { EventQueryResult } from "@/sanity.types";
import { sanityFetch } from "@/sanity/lib/fetch";
import { eventQuery } from "@/sanity/lib/queries";
import SingleEvent from "../../components/events/SingleEvent";

type Event = {
  params: {
    event: string;
  };
};

export default async function Page({ params }: Event) {
  const [event] = await Promise.all([
    sanityFetch<EventQueryResult>({
      query: eventQuery,
      params: { event: params.event },
    }),
  ]);
  return (
    <div className="relative min-h-screen">
      <SingleEvent
        params={{
          event: params.event,
        }}
        event={event}
      />
    </div>
  );
}
