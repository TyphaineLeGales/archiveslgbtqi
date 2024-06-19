"use client";

import { EventsQueryResult } from "@/sanity.types";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import DateFormat from "../DateFormat";
import { motion } from "framer-motion";
import Link from "next/link";
import { AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

type EventProps = {
  event: EventsQueryResult;
};

export default function EventsDesktop({ event }: EventProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const router = useRouter();

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
    <AnimatePresence>
      {!isClicked && (
        <>
          <motion.div
            initial={{ translateY: "100vh" }}
            exit={{
              translateY: "-50vh",
              transition: {
                duration: 1.5,
                delay: 0.5,
                ease: [0.6, 0.01, 0.05, 0.95],
              },
            }}
            transition={{ duration: 1, ease: [0.6, 0.01, 0.05, 0.95] }}
            className="fixed inset-0 z-50 bg-green-200"
          />
          <motion.div className="hidden min-h-[85dvh] flex-col justify-end lg:flex">
            {event?.map((eventItem, index) => (
              <motion.button
                key={`event-${index}`}
                initial={{ height: "4rem" }}
                whileHover={{ height: "20vh" }}
                exit={
                  hoveredIndex === index
                    ? {
                        height: "100vh",
                        transition: {
                          duration: 1.5,
                          ease: [0.6, 0.01, 0.05, 0.95],
                        },
                      }
                    : undefined
                }
                transition={{ duration: 1, ease: [0.6, 0.01, 0.05, 0.95] }}
                className="group relative flex h-[4rem] items-start overflow-hidden border-b-[1px] border-black bg-white"
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={handleMouseLeave}
                onClick={() => {
                  setIsClicked(true);
                  setTimeout(() => {
                    router.push(`/agenda/${eventItem.slug?.current}`);
                  }, 1500);
                }}
              >
                {hoveredIndex === index && (
                  <motion.div
                    style={{
                      top: mousePosition.y,
                      left: mousePosition.x,
                      translateY: "0",
                    }}
                    initial={{ height: "0vh" }}
                    animate={{ height: "20vh" }}
                    exit={{ height: "0vh" }}
                    transition={{
                      duration: 1,
                      ease: [0.6, 0.01, 0.05, 0.95],
                    }}
                    className="pointer-events-none fixed z-50"
                  >
                    <Image
                      src={
                        eventItem.image?.imageUrl ||
                        "https://via.placeholder.com/1000x1000"
                      }
                      alt={eventItem.image?.alt || "Event image"}
                      width={250}
                      height={250}
                      loading="eager"
                      className="h-full w-full origin-bottom object-cover"
                    />
                  </motion.div>
                )}

                <div className="relative flex h-auto w-full flex-col px-[1rem]">
                  <div className="flex items-center justify-between">
                    <div className="flex h-[5rem] flex-col overflow-hidden">
                      <h2 className="eventTitle transition-transform delay-200 duration-500 ease-tamisitée group-hover:translate-y-[-100%]">
                        {eventItem.eventTitle}
                      </h2>
                      <h2 className="eventTitle transition-transform delay-200 duration-500 ease-tamisitée group-hover:translate-y-[-100%]">
                        {eventItem.eventTitle}
                      </h2>
                    </div>
                    <div className="rounded-full border-[1px] border-black px-[1rem] py-[.25rem] text-[.75rem]">
                      <DateFormat
                        dateString={eventItem.eventDate?.eventStartDate || ""}
                      />
                      {eventItem.eventDate?.addEndDate && (
                        <>
                          <span className="mx-[0.5rem]">-</span>
                          <DateFormat
                            dateString={eventItem.eventDate?.eventEndDate || ""}
                          />
                        </>
                      )}
                    </div>
                  </div>
                  <p className="absolute bottom-0 left-0 translate-y-[100%] transition-all duration-500 ease-tamisitée group-hover:translate-y-[100%]">
                    {eventItem.eventDescription}
                  </p>
                </div>
              </motion.button>
            ))}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
