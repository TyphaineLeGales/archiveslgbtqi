import React from "react";

import Image from "next/image";
import Link from "next/link";

import { SettingsQueryResult } from "@/sanity.types";
import { sanityFetch } from "@/sanity/lib/fetch";
import { settingsQuery } from "@/sanity/lib/queries";
import { MyCustomPortableText } from "../ui";
import { PortableTextBlock } from "next-sanity";
import InternalLink from "../header/InternalLink";
import ExternalLink from "../header/ExternalLink";

export default async function Footer() {
  const settings = await sanityFetch<SettingsQueryResult>({
    query: settingsQuery,
  });

  console.log("Settings: ", settings);

  return (
    <div className="hidden min-h-[390px] bg-black text-white">
      <div>
        <Image
          src={settings?.footer?.logo?.logoImage || ""}
          alt={settings?.footer?.logo?.alt || "Logo pour le footer"}
          width={100}
          height={100}
        />
      </div>
      <div className="flex flex-col">
        <span>{settings?.footer?.addressGroup?.addressTitle}</span>
        <MyCustomPortableText
          value={
            settings?.footer?.addressGroup
              ?.addressContent as PortableTextBlock[]
          }
        />
        <a href={`mailto:${settings?.footer?.addressGroup?.mailAddress}`}>
          {settings?.footer?.addressGroup?.mailAddress}
        </a>

        <span>
          © {new Date().getFullYear()}{" "}
          {settings?.footer?.addressGroup?.addressTitle}
        </span>
      </div>
      <div className="flex flex-col">
        <span>Suivez-nous</span>
        <div className="flex">
          {settings?.footer?.socialGroup?.map((social) => (
            <div
              key={social.socialName}
              className="flex aspect-square h-[3rem] w-[3rem] items-center justify-center rounded-full border-[1px] border-white"
            >
              <a href={social.socialLink || ""} className="">
                <Image
                  src={social.socialLinkImage?.imageUrl || ""}
                  alt={social.socialLinkImage?.alt || ""}
                  width={50}
                  height={50}
                  className="h-[2rem] w-[2rem]"
                />
              </a>
            </div>
          ))}
        </div>
        <span>Newsletter</span>
        <div className="relative">
          <input type="email" className="newsLetterInput" />
          <button className="">Ok</button>
          <div className="absolute inset-x-0 bottom-[1px] h-[1px] w-[calc(100%-1.5rem)] bg-white" />
        </div>
      </div>
      <div>
        {settings?.footer?.footerLinks?.map((modules) => {
          return (
            <div key={modules.groupName}>
              {modules.modules?.map((module) => {
                if (module.type === "internal") {
                  return (
                    <Link
                      key={module.internalLink?.slug}
                      href={`/${module.internalLink?.slug}`}
                    >
                      {module.internalLink?.title}
                    </Link>
                  );
                } else {
                  return (
                    <a
                      key={module.externalLink?.url}
                      href={module.externalLink?.url || ""}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {module.externalLink?.title}
                    </a>
                  );
                }
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}
