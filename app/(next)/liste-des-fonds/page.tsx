import React from "react";

import { ListeDeFondsQueryResult } from "@/sanity.types";
import { sanityFetch } from "@/sanity/lib/fetch";
import { listeDeFondsQuery } from "@/sanity/lib/queries";

import {
  CreationArchivesModule,
  CustomHtml,
  EventsModule,
  LinksModule,
  MultiImagesModule,
  RichTextAndTitleModule,
  RichTextModule,
  SingleImageModule,
} from "../components/modules";

export default async function Page() {
  const [list] = await Promise.all([
    sanityFetch<ListeDeFondsQueryResult>({
      query: listeDeFondsQuery,
    }),
  ]);
  return (
    <div className="relative mx-auto flex h-full min-h-screen w-auto max-w-[1440px] overflow-hidden p-[1rem] lg:p-0">
      <div className="flex h-full w-full flex-col overflow-hidden pt-[3rem] lg:ml-arch">
        <h1 className="font-tanker text-[2rem] uppercase leading-[1.2rem] tracking-wider lg:text-[4rem] lg:leading-[3.2rem]">
          {list?.title || ""}
        </h1>
        <div className="flex min-h-screen flex-col gap-[1rem]">
          {list?.contentModulde?.map((item, index) => (
            <div
              key={item._key}
              className="relative flex h-full flex-col gap-[2rem] pb-[8rem] lg:pr-[10rem]"
            >
              <div>
                <div className="flex flex-col gap-[.5rem]">
                  {item.contenBlock?.map((block, index) => (
                    <div key={block._key}>
                      {block._type === "richtext" && (
                        <RichTextModule item={block} />
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

                      {block._type === "link" && (
                        <LinksModule item={block as any} />
                      )}
                    </div>
                  ))}
                </div>
              </div>
              {/* // 👇🏽 Separator (hide if it's the last element) */}
              {index !== (list?.contentModulde?.length ?? 0) - 1 && (
                <div className="absolute bottom-0 left-0 h-[3px] w-full bg-black lg:w-[calc(100%-3rem)]" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
