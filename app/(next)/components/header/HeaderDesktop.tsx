"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SettingsQueryResult } from "@/sanity.types";
import TransitionLink from "../ui/TransitionLink";

type NavLinkProps = {
  settings: SettingsQueryResult;
};

export default function HeaderDesktop({ settings }: NavLinkProps) {
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const router = useRouter();

  return (
    <nav className="hidden gap-[1rem] lg:flex">
      {settings?.header.links &&
        settings.header.links.map((link, index) => {
          if (link.type === "internal") {
            return (
              <Link
                key={link._key}
                href={`/${link.internalLinkDetails?.slug || ""}`}
                className="headerItem group relative flex h-[.7rem] w-fit flex-col overflow-hidden"
              >
                <span className="transition-transform duration-700 ease-tamisitée group-hover:translate-y-[-100%]">
                  {link.internalLinkDetails?.title || ""}
                </span>
                <span className="transition-transform duration-700 ease-tamisitée group-hover:translate-y-[-100%]">
                  {link.internalLinkDetails?.title || ""}
                </span>
                {/* </button> */}
              </Link>
            );
          } else {
            return (
              <a
                key={link._key}
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
