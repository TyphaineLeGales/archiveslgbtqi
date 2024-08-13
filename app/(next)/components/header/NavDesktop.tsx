"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { SettingsQueryResult } from "@/sanity.types";
import { Inter } from "next/font/google";
import InternalLink from "./InternalLink";
import ExternalLink from "./ExternalLink";

type NavLinkProps = {
  settings: SettingsQueryResult;
};

export default function NavDesktop({ settings }: NavLinkProps) {
  const router = useRouter();

  return (
    <div className="h-header-size-desktop fixed inset-x-0 top-0 z-40 hidden min-w-[100vw] bg-black lg:flex">
      <nav className="h-header-size-desktop fixed inset-x-0 top-0 z-40 mx-auto hidden w-full max-w-[1440px] items-center overflow-hidden bg-black pr-[3rem] text-white lg:flex">
        <Link
          href="/"
          className="h-header-desktop absolute inset-y-0 left-[3rem] my-auto flex aspect-square w-[8rem] select-none items-center justify-center"
        >
          <Image
            src={
              settings?.header?.logo?.logoImage ||
              "https://via.placeholder.com/100x100"
            }
            alt={settings?.header?.logo?.alt || "Logo"}
            width={50}
            height={50}
            priority
            className="aspect-square h-[125px] w-[125px]"
          />
        </Link>

        <div className="ml-arch flex w-full justify-between">
          {/* LEFT LINKS */}
          <div className="grid grid-flow-col grid-rows-3 gap-x-[3rem]">
            {settings?.header?.links &&
              settings.header.links.map((link, index) => {
                if (link.linkPosition === "left") {
                  if (link.type === "internal") {
                    return <InternalLink key={link._key} link={link as any} />;
                  } else {
                    return <ExternalLink key={link._key} link={link as any} />;
                  }
                }
              })}
          </div>
          {/* Right LINKS */}
          <div className="grid grid-rows-3 place-items-end gap-[.3rem]">
            {settings?.header?.links &&
              settings.header.links.map((link, index) => {
                if (link.linkPosition === "right") {
                  if (link.type === "internal") {
                    return (
                      <InternalLink
                        key={link.externalLinkDetails._key}
                        link={link as any}
                      />
                    );
                  } else {
                    return <ExternalLink key={link._key} link={link as any} />;
                  }
                }
              })}
          </div>
        </div>
      </nav>
    </div>
  );
}
