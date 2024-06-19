import { EventsQueryResult } from "@/sanity.types";
import { sanityFetch } from "@/sanity/lib/fetch";
import { eventsQuery } from "@/sanity/lib/queries";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import DateFormat from "../components/DateFormat";
import { motion } from "framer-motion";
import Event from "../components/Event";

export default async function Page() {
  const [events] = await Promise.all([
    sanityFetch<EventsQueryResult>({
      query: eventsQuery,
    }),
  ]);

  console.log("Events:", events);
  return (
    <div className="min-h-screen py-[1rem]">
      <h1 className="whitespace-nowrap px-[1rem] pb-[2rem] text-[3rem] font-semibold uppercase leading-[2.5rem] tracking-tighter">
        L&apos;agenda
      </h1>
      <Event event={events} />
    </div>
  );
}
