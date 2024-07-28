import React from "react";
import Image from "next/image";
import { PastEventQueryResult } from "@/sanity.types";

type PastEventProps = {
  id: string;
  pastEvent: PastEventQueryResult;
};

export default function PastEvents({ id, pastEvent }: PastEventProps) {
  return (
    <div id={id} className="flex flex-col gap-[1rem]">
      <h1 className="pageTitle">Passés</h1>
      <div className="">
        {pastEvent.map((event) => (
          <div
            key={event._id}
            className="flex justify-between border-t-[3px] border-black"
          >
            <div>
              <h2>{event.eventType}</h2>
              <h3>{event.eventTitle}</h3>
            </div>
            <div>
              <Image
                src={event.image?.imageUrl || ""}
                alt={event.image?.alt || ""}
                width={200}
                height={200}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
