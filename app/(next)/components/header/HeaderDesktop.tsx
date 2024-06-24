"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SettingsQueryResult } from "@/sanity.types";

type NavLinkProps = {
  settings: SettingsQueryResult;
};

export default function HeaderDesktop({ settings }: NavLinkProps) {
  return (
    <nav className="hidden gap-[1rem] lg:flex">
      {settings?.header.links &&
        settings.header.links.map((link, index) => {
          if (link.type === "internal") {
            return (
              <Link
                key={`link-${index}`}
                href={`/${link.internalLinkDetails?.slug || ""}`}
                className="headerItem group relative flex h-[1rem] w-fit flex-col overflow-hidden"
              >
                <span className="transition-transform duration-700 ease-tamisitée group-hover:translate-y-[-100%]">
                  {link.internalLinkDetails?.title || ""}
                </span>
                <span className="transition-transform duration-700 ease-tamisitée group-hover:translate-y-[-100%]">
                  {link.internalLinkDetails?.title || ""}
                </span>
              </Link>
            );
          } else {
            return (
              <a
                key={`link-${index}`}
                href={link.externalLinkDetails.url || ""}
                target="_blank"
                rel="noreferrer"
              >
                {link.externalLinkDetails.title}
              </a>
            );
          }
        })}
    </nav>
  );
}
