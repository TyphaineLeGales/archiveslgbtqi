"use client";

import { EventsQueryResult } from "@/sanity.types";
import React, { useState } from "react";
import Image from "next/image";
import DateFormat from "../DateFormat";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { NorthEastArrow } from "../ui/icon";

type EventProps = {
  event: EventsQueryResult;
};

export default function EventsMobile({ event }: EventProps) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const handleClick = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className="no-scrollbar flex min-h-[85dvh] flex-col justify-end overflow-y-scroll lg:hidden">
      {event?.map((eventItem, index) => (
        <motion.div
          key={`event-${index}`}
          initial={{ height: "3.25rem" }}
          animate={{
            height: expandedIndex === index ? "40rem" : "3.25rem",
            overflow: "hidden",
          }}
          transition={{ duration: 1, ease: [0.6, 0.01, 0.05, 0.95] }}
          className="no-scrollbar group relative flex h-auto items-start overflow-hidden overflow-y-auto border-b-[1px] border-black pb-[2rem]"
          onClick={() => handleClick(index)}
        >
          <div className="relative flex w-full flex-col justify-start gap-[1rem]">
            <h2 className="border-b-[1px] border-black px-[1rem] text-[2.5rem] font-semibold uppercase leading-[5rem] tracking-tighter">
              {eventItem.eventTitle}
            </h2>
            <div className="px-[1rem]">
              <div className="flex justify-between rounded-full border-[1px] border-black px-[1rem] py-[.25rem] text-[.75rem]">
                <DateFormat
                  dateString={eventItem.eventDate?.eventStartDate || ""}
                />
                <span className="mx-[0.5rem]">→</span>
                {eventItem.eventDate?.addEndDate && (
                  <div>
                    <DateFormat
                      dateString={eventItem.eventDate?.eventEndDate || ""}
                    />
                  </div>
                )}
              </div>
            </div>
            <AnimatePresence>
              {expandedIndex === index && (
                <>
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <Link
                      href={`/agenda/${eventItem.slug?.current}`}
                      className="absolute right-0 top-[1.25rem] flex w-[calc(50%-1rem)] justify-end rounded-l-full border-b-[1px] border-l-[1px] border-t-[1px] border-black py-[.20rem] pr-[1rem]"
                    >
                      <NorthEastArrow className="aspect-square h-[2rem] w-[2rem] pt-1" />
                    </Link>
                  </motion.div>
                  <div className="px-[1rem]">
                    <motion.p
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      {eventItem.eventDescription}
                    </motion.p>
                    <motion.div
                      key={`image-${index}`}
                      initial={{ opacity: 0, y: "-100%" }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="w-full"
                    >
                      <Image
                        src={
                          eventItem.image?.imageUrl ||
                          "https://via.placeholder.com/1000x1000"
                        }
                        alt={eventItem.image?.alt || "Event image"}
                        width={500}
                        height={500}
                        loading="eager"
                      />
                    </motion.div>
                  </div>
                </>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
