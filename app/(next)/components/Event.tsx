"use client";

import { EventsQueryResult } from "@/sanity.types";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import DateFormat from "./DateFormat";
import { motion } from "framer-motion";
import Link from "next/link";

type EventProps = {
  event: EventsQueryResult;
};

export default function Event({ event }: EventProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const handleMouseEnter = (index: number) => {
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className="flex flex-col">
      {event?.map((eventItem, index) => (
        <Link
          href={`/agenda/${eventItem.slug?.current}`}
          key={`event-${index}`}
          className="ease-tamisitée group relative flex h-[3rem] items-start overflow-hidden border-b-[1px] border-black transition-all duration-500 hover:h-[50vh]"
          onMouseEnter={() => handleMouseEnter(index)}
          onMouseLeave={handleMouseLeave}
        >
          {hoveredIndex === index && (
            <motion.div
              style={{
                top: mousePosition.y,
                left: mousePosition.x,
                // translateX: "-50%",
                translateY: "0",
              }}
              initial={{ height: "0vh" }}
              animate={{ height: "20vh" }}
              transition={{ duration: 0.5, ease: [0.6, 0.01, 0.05, 0.95] }}
              className="pointer-events-none fixed z-50"
            >
              <Image
                src={
                  eventItem.image?.imageUrl ||
                  "https://via.placeholder.com/1000x1000"
                }
                alt={eventItem.image?.alt || "Event image"}
                width={1000}
                height={1000}
                className="h-full w-full origin-bottom object-cover"
              />
            </motion.div>
          )}
          <div className="relative flex h-auto w-full flex-col px-[1rem]">
            <div className="flex items-center justify-between">
              <h2 className="text-[2rem] font-semibold uppercase">
                {eventItem.eventTitle}
              </h2>
              <DateFormat
                dateString={eventItem.eventDate || ""}
                className="text-[1rem] italic"
              />
            </div>
            <p className="ease-tamisitée absolute bottom-0 left-0 translate-y-[100%] transition-all duration-500 group-hover:translate-y-[100%]">
              {eventItem.eventDescription}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}
