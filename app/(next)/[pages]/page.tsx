import {
  EventQueryResult,
  EventsQueryResult,
  PagesContentQueryResult,
} from "@/sanity.types";
import { sanityFetch } from "@/sanity/lib/fetch";
import {
  eventQuery,
  eventsQuery,
  pagesContentQuery,
} from "@/sanity/lib/queries";
import { notFound } from "next/navigation";
import React from "react";
import CustomImage from "../components/custom-image";
import Link from "next/link";
import CustomPortableText from "../portable-text";
import MultiImages from "../components/ui/MultiImages";
import { ca } from "date-fns/locale";
import ContactForm from "../components/contact-form";
import EventsModules from "../components/modules/EventsModules";

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
                  return (
                    <div className="py-[1rem]">
                      <CustomPortableText value={item?.richtext!} />
                    </div>
                  );
                case "single-image":
                  return (
                    <CustomImage
                      imageUrl={item.imageUrl || ""}
                      title={item.imageTitle || ""}
                    />
                  );
                case "multi-images":
                  return <MultiImages item={item as any} />;
                case "link": {
                  const link = item;
                  return (
                    <div className="py-[1rem]">
                      <Link
                        href={`${link.internal?.slug || link.external}`}
                        className="underline"
                      >
                        {link.linkLabel}
                      </Link>
                    </div>
                  );
                }
                case "contact-form":
                  return <ContactForm />;
                case "lastEvent":
                  return <EventsModules events={events} />;
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
