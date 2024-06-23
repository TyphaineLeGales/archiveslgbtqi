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
              >
                {link.internalLinkDetails?.title || ""}
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
