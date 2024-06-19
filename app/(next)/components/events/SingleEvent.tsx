"use client";
import React from "react";
import { motion } from "framer-motion";
import DateFormat from "../DateFormat";
import { EventQueryResult } from "@/sanity.types";

type Event = {
  params: {
    event: string;
  };
  event: EventQueryResult;
};

export default function SingleEvent({ params, event }: Event) {
  return (
    <motion.div>
      <motion.div
        initial={{ translateY: "-50vh" }}
        animate={{ translateY: "-100vh" }}
        transition={{ duration: 1.5, ease: [0.6, 0.01, 0.05, 0.95] }}
        className="fixed inset-0 bg-neutral-700"
      />
      <div className="flex justify-between px-[1rem]">
        <h1 className="eventTitle">{event?.eventTitle}</h1>
        <div className="h-fit rounded-full border-[1px] border-black px-[1rem] py-[.25rem] text-[.75rem]">
          <DateFormat dateString={event?.eventDate?.eventStartDate || ""} />
          {event?.eventDate?.addEndDate && (
            <>
              <span className="mx-[0.5rem]">-</span>
              <DateFormat dateString={event.eventDate.eventEndDate || ""} />
            </>
          )}
        </div>
      </div>
    </motion.div>
  );
}
