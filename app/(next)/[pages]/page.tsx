import React, { useEffect } from "react";
import { useRouter } from "next/router";

import {
  EventsQueryResult,
  LastEventQueryResult,
  PagesContentQueryResult,
  RichTextAndTitle,
} from "@/sanity.types"; // Ensure this path is correct
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
import DesktopNavigationBar from "../components/navbar/navbar-desktop";
import { transformId } from "../utils/TransforId";

type Props = {
  params: {
    pages: string;
  };
};

export default async function Page({ params }: Props) {
  const [content, events, lastEvent] = await Promise.all([
    sanityFetch<PagesContentQueryResult>({
      query: pagesContentQuery,
      // params,
      // params can be from {transformId(item.titleBlock || "")}}
      params: {
        pages: params.pages,
      },
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

  // console.log("Pages Content:", content);

  return (
    <div className="flex h-full overflow-hidden">
      <div className="relative hidden w-[20%] md:block">
        <DesktopNavigationBar content={content} />
      </div>
      <div className="flex h-full w-full flex-col gap-[1rem] overflow-hidden p-[1rem] md:w-[80%]">
        <h1 className="text-4xl font-bold">{content.title}</h1>
        <div className="flex min-h-screen flex-col gap-[2rem] scroll-smooth py-[1rem]">
          {content.contentModulde?.map((item, index) => (
            // when the ScrollButton is clicked, it will scroll to the id of the element here
            <div
              id={transformId(item.titleBlock || "")}
              key={item._key}
              className="pb-[5rem]"
            >
              <h2 className="text-2xl font-bold uppercase">
                {item.titleBlock || ""}
              </h2>
              <div>
                <div className="flex flex-col gap-[1rem]">
                  {item.contenBlock?.map((block, index) => (
                    <div key={block._key}>
                      {block._type === "richtext" && (
                        <RichTextModule item={block} />
                      )}
                      {block._type === "richTextAndTitle" && (
                        <RichTextAndTitleModule item={block as any} />
                      )}
                      {block._type === "single-image" && (
                        <SingleImageModule
                          imageUrl={block.imageUrl || ""}
                          imageTitle={block.imageTitle || ""}
                        />
                      )}
                      {block._type === "contact-form" && <FormSubmission />}
                      {block._type === "creationArchives" && (
                        <CreationArchivesModule
                          intro={block.creationArchivesTitle as any}
                          archive={block.creationArchivesArchive as any}
                        />
                      )}
                      {block._type === "custom-html" && (
                        <CustomHtml
                          title={block.codeTitle || ""}
                          html={block.customHtml?.code as any}
                          item={block as any}
                        />
                      )}
                      {block._type === "document-file" && (
                        <LinksModule item={block as any} />
                      )}
                      {block._type === "lastEvent" && (
                        <EventsModule
                          events={lastEvent}
                          title={block.lastEventLabel || ""}
                          link={block.goToAllEvents || ""}
                        />
                      )}

                      {block._type === "multi-images" && (
                        <MultiImagesModule item={block as any} />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
