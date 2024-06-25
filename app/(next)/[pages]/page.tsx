import React from "react";

import {
  EventsQueryResult,
  LastEventQueryResult,
  PagesContentQueryResult,
} from "@/sanity.types";
import { sanityFetch } from "@/sanity/lib/fetch";
import {
  eventsQuery,
  lastEventQuery,
  pagesContentQuery,
} from "@/sanity/lib/queries";

import { notFound } from "next/navigation";

import {
  EventsModule,
  LinksModule,
  SingleImageModule,
  MultiImagesModule,
  RichTextModule,
  CreationArchivesModule,
  RichTextAndTitleModule,
  CustomHtml,
} from "../components/modules";

import { FormSubmission } from "../components/ui";

type Props = {
  params: {
    pages: string;
  };
};

export default async function Page({ params }: Props) {
  const [content, events, lastEvent] = await Promise.all([
    sanityFetch<PagesContentQueryResult>({
      query: pagesContentQuery,
      params,
    }),
    sanityFetch<EventsQueryResult>({
      query: eventsQuery,
    }),
    sanityFetch<LastEventQueryResult>({
      query: lastEventQuery,
    }),
  ]);

  if (!content?._id) {
    return notFound();
  }

  console.log("Pages Content:", content.content);

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

                case "richTextAndTitle":
                  return <RichTextAndTitleModule item={item as any} />;

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
                  return <FormSubmission />;

                case "lastEvent":
                  return (
                    <EventsModule
                      title={item.lastEventLabel || ""}
                      link={item.goToAllEvents || ""}
                      events={lastEvent}
                    />
                  );
                case "creationArchives":
                  return (
                    <CreationArchivesModule
                      intro={item.intro || []}
                      archive={item.archive || []}
                    />
                  );

                case "custom-html":
                  return (
                    <CustomHtml
                      title={item.codeTitle!}
                      html={item.customHtml?.code!}
                      item={item as any}
                    />
                  );
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
