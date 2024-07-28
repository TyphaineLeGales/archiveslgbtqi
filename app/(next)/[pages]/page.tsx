import React from "react";

import {
  LastEventQueryResult,
  PagesContentQueryResult,
  RichTextAndTitle,
} from "@/sanity.types"; // Ensure this path is correct
import { sanityFetch } from "@/sanity/lib/fetch";
import { lastEventQuery, pagesContentQuery } from "@/sanity/lib/queries";

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

import { DesktopSidebar } from "../components/all-pages";
import { FormSubmission } from "../components/ui";
import { transformId } from "../utils/TransforId";

type Props = {
  params: {
    pages: string;
  };
};

export default async function Page({ params }: Props) {
  const [content, lastEvent] = await Promise.all([
    sanityFetch<PagesContentQueryResult>({
      query: pagesContentQuery,
      params: {
        pages: params.pages,
      },
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
    <div className="relative mx-auto flex h-full w-auto max-w-[1440px] overflow-hidden p-[1rem] lg:p-0">
      <DesktopSidebar content={content} />

      <div className="flex h-full w-full flex-col overflow-hidden pt-[3rem] lg:ml-arch">
        <h1 className="font-tanker text-[2rem] uppercase leading-[1.2rem] tracking-wider lg:text-[4rem] lg:leading-[3.2rem]">
          {content.title}
        </h1>
        <div className="flex min-h-screen flex-col gap-[1rem]">
          {content.contentModulde?.map((item, index) => (
            // when the ScrollButton is clicked, it will scroll to the id of the element here
            <div
              id={transformId(item.titleBlock || "")}
              key={item._key}
              className="relative flex h-full flex-col gap-[2rem] pb-[8rem] lg:pr-[10rem]"
            >
              <h2 className="pageTitle">{item.titleBlock || ""}</h2>
              <div>
                <div className="flex flex-col gap-[.5rem]">
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
                      {block._type === "multi-images" && (
                        <MultiImagesModule item={block as any} />
                      )}

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
                      {block._type === "link" && (
                        <LinksModule item={block as any} />
                      )}
                      {block._type === "lastEvent" && (
                        <EventsModule
                          events={lastEvent}
                          title={block.lastEventLabel || ""}
                          link={block.goToAllEvents || ""}
                        />
                      )}
                      {block._type === "contact-form" && <FormSubmission />}
                    </div>
                  ))}
                </div>
              </div>
              {/* // 👇🏽 Separator (hide if it's the last element) */}
              {index !== (content?.contentModulde?.length ?? 0) - 1 && (
                <div className="absolute bottom-0 left-0 h-[3px] w-full bg-black lg:w-[calc(100%-3rem)]" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
