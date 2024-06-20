"use client";
import React from "react";
import { motion } from "framer-motion";
import DateFormat from "../DateFormat";
import { EventQueryResult } from "@/sanity.types";
import Image from "next/image";

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
        initial={{ translateY: "-50%" }}
        animate={{ translateY: "-100%" }}
        transition={{
          duration: 1.5,
          ease: [0.6, 0.01, 0.05, 0.95],
        }}
        className="fixed inset-0 z-50 bg-neutral-700"
      />
      <div className="flex flex-col gap-[1rem]">
        <div className="flex flex-col justify-between gap-[1rem] border-b-[1px] border-black px-[1rem]">
          <h1 className="eventTitle">{event?.eventTitle}</h1>
          <div className="mb-[1rem] flex h-fit w-fit rounded-full border-[1px] border-black px-[1rem] py-[.5rem] text-[.75rem]">
            <DateFormat dateString={event?.eventDate?.eventStartDate || ""} />
            {event?.eventDate?.addEndDate && (
              <div>
                <span className="mx-[0.5rem]">-</span>
                <DateFormat dateString={event.eventDate.eventEndDate || ""} />
              </div>
            )}
          </div>
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 1,
            ease: [0.6, 0.01, 0.05, 0.95],
          }}
          className="flex gap-[1rem] overflow-hidden px-[1rem]"
        >
          <p>{event?.eventDescription}</p>
          <Image
            src={
              event?.image?.imageUrl || "https://via.placeholder.com/1000x1000"
            }
            alt={event?.image?.alt || "Event image"}
            width={1000}
            height={1000}
            loading="eager"
          />
        </motion.div>
      </div>
    </motion.div>
  );
}
