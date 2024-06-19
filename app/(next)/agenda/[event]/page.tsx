import { EventQueryResult } from "@/sanity.types";
import { sanityFetch } from "@/sanity/lib/fetch";
import { eventQuery } from "@/sanity/lib/queries";
import React from "react";
import DateFormat from "../../components/DateFormat";
import { motion } from "framer-motion";
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
    <div className="min-h-[100dvh] py-[1rem]">
      <SingleEvent
        params={{
          event: params.event,
        }}
        event={event}
      />
    </div>
  );
}
