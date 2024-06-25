import { FooterQueryResult, SettingsQueryResult } from "@/sanity.types";
import { sanityFetch } from "@/sanity/lib/fetch";
import { footerQuery, settingsQuery } from "@/sanity/lib/queries";
import settings from "@/sanity/schemas/singletons/settings";
import Link from "next/link";
import React from "react";

export default async function Footer() {
  const settings = await sanityFetch<SettingsQueryResult>({
    query: settingsQuery,
  });

  return (
    <div className="relative flex min-h-[10rem] w-full flex-col justify-start bg-slate-100 p-[1rem] text-end lg:flex-row lg:pl-[calc(25%+.5rem)] lg:text-start">
      {settings?.footer?.moduleGroups?.map && (
        <div className="grid h-fit w-auto grid-rows-3 items-start gap-[2rem] lg:grid-cols-3 lg:grid-rows-none lg:gap-[5rem]">
          {settings.footer.moduleGroups.map((moduleGroup) => (
            <div
              key={moduleGroup.groupName}
              className="flex flex-col gap-[1rem]"
            >
              <h1 className="h-fit text-[.8rem] uppercase leading-[1rem] tracking-tighter">
                {moduleGroup.groupName}
              </h1>
              <div className="flex w-full flex-col items-end justify-start lg:items-start">
                {moduleGroup?.modules?.map((module) => (
                  <div key={module.internalDetails?._id}>
                    {module.type === "internal" && (
                      <Link href={module.internalDetails?.slug || ""}>
                        {module.internalDetails?.title || ""}
                      </Link>
                    )}
                    {module.type === "external" && (
                      <a
                        href={module.externalDetails.url || ""}
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        {module.externalDetails.title}
                      </a>
                    )}
                    {module.type === "text" && <p>{module.text}</p>}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
      <span className="absolute bottom-[1rem] right-[1rem] text-[.7rem] uppercase leading-[1rem] tracking-tighter">
        &copy; {new Date().getFullYear()} {settings?.globalSettings.siteTitle}
      </span>
    </div>
  );
}
