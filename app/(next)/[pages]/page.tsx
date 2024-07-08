import React from "react";

import {
  EventsQueryResult,
  LastEventQueryResult,
  MainPagesContentQueryResult,
} from "@/sanity.types"; // Ensure this path is correct
import { sanityFetch } from "@/sanity/lib/fetch";
import {
  eventsQuery,
  lastEventQuery,
  mainPagesContentQuery,
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
import DesktopNavigationBar from "../components/navbar/navbar-desktop";

type Props = {
  params: {
    pages: string;
  };
};

export default async function Page({ params }: Props) {
  const [content, events, lastEvent] = await Promise.all([
    sanityFetch<MainPagesContentQueryResult>({
      query: mainPagesContentQuery,
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

  // console.log("Pages Content:", content.content?.[0]);

  return (
    <div className="flex h-full min-h-[calc(100%-5rem)] overflow-hidden">
      <div className="relative hidden w-[20%] md:block">
        <DesktopNavigationBar content={content} />
      </div>
      <div className="flex h-full w-full flex-col gap-[1rem] overflow-hidden p-[1rem] md:w-[80%]">
        <h1 className="text-4xl font-bold">{content.title}</h1>
        <div className="flex flex-col gap-[2rem] py-[1rem]">
          {content.content?.map((item, index) => (
            <div
              id={item.titleBlock || ""}
              key={`content-title-${index}`}
              className="pb-[5rem]"
            >
              <h2 className="text-2xl font-bold uppercase">
                {item.titleBlock || ""}
              </h2>
              <div key={`content-item-${index}`}>
                <div className="flex flex-col gap-[1rem]">
                  {(item?.block! as any[])?.map((blockItem, blockIndex) => {
                    if (!blockItem) return null;

                    switch (blockItem._type as string) {
                      case "richtext":
                        return (
                          <RichTextModule key={blockIndex} item={blockItem} />
                        );
                      case "richTextAndTitle":
                        return (
                          <RichTextAndTitleModule
                            key={blockIndex}
                            item={blockItem as any}
                          />
                        );
                      case "single-image":
                        return (
                          <SingleImageModule
                            key={blockIndex}
                            imageUrl={blockItem.imageUrl || ""}
                            imageTitle={blockItem.imageTitle || ""}
                          />
                        );
                      case "multi-images":
                        return (
                          <MultiImagesModule
                            key={blockIndex}
                            item={blockItem as any}
                          />
                        );
                      case "link":
                        return (
                          <LinksModule
                            key={blockIndex}
                            item={blockItem as any}
                          />
                        );
                      case "contact-form":
                        return <FormSubmission />;
                      case "lastEvent":
                        return (
                          <EventsModule
                            key={blockIndex}
                            title={blockItem.lastEventLabel || ""}
                            link={blockItem.goToAllEvents || ""}
                            events={lastEvent}
                          />
                        );
                      case "creationArchives":
                        return (
                          <CreationArchivesModule
                            key={blockIndex}
                            intro={blockItem.creationArchivesTitle as any}
                            archive={blockItem.creationArchivesArchive as any}
                          />
                        );
                      case "custom-html":
                        return (
                          <CustomHtml
                            key={blockIndex}
                            title={blockItem.codeTitle || ""}
                            html={(blockItem.customHtml as any)?.code}
                            item={blockItem as any}
                          />
                        );
                      default:
                        return null;
                    }
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
