import React from "react";

import { EventsQueryResult, PagesContentQueryResult } from "@/sanity.types";
import { sanityFetch } from "@/sanity/lib/fetch";
import { eventsQuery, pagesContentQuery } from "@/sanity/lib/queries";

import { notFound } from "next/navigation";

import ContactForm from "../components/contact-form";

import {
  EventsModule,
  LinksModule,
  SingleImageModule,
  MultiImagesModule,
  RichTextModule,
} from "../components/modules";

type Props = {
  params: {
    pages: string;
  };
};

export default async function Page({ params }: Props) {
  const [content, events] = await Promise.all([
    sanityFetch<PagesContentQueryResult>({
      query: pagesContentQuery,
      params,
    }),
    sanityFetch<EventsQueryResult>({
      query: eventsQuery,
    }),
  ]);

  if (!content?._id) {
    return notFound();
  }
  // console.log("Pages Content:", content.content);

  return (
    <div className="flex min-h-screen w-full flex-col gap-[1rem] px-[1rem] lg:pr-[1rem]">
      <h1 className="text-4xl font-bold">{content.title}</h1>
      <div className="flex flex-col py-[1rem]">
        {content.content?.map((item, index) => (
          <div key={`content-item-${index}`}>
            {(() => {
              switch (item._type as string) {
                case "richtext":
                  return <RichTextModule item={item} />;

                case "single-image":
                  return (
                    <SingleImageModule
                      imageUrl={item.imageUrl || ""}
                      imageTitle={item.imageTitle || ""}
                    />
                  );

                case "multi-images":
                  return <MultiImagesModule item={item as any} />;

                case "link":
                  return <LinksModule item={item as any} />;

                case "contact-form":
                  return <ContactForm />;

                case "lastEvent":
                  return <EventsModule events={events} />;
                default:
                  return null;
              }
            })()}
          </div>
        ))}
      </div>
    </div>
  );
}
