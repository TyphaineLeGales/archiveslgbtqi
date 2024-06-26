"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SettingsQueryResult } from "@/sanity.types";
import ExitLayer from "../ui/transition/ExitLayer";
import { AnimatePresence, motion } from "framer-motion";

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
              // <motion.button
              //   key={`link-${index}`}
              //   // href={`/${link.internalLinkDetails?.slug || ""}`}
              //   onClick={() => {
              //     setIsClicked(true);
              //     setTimeout(() => {
              //       setIsClicked(false);
              //       router.push(`/${link.internalLinkDetails?.slug || ""}`);
              //     }, 1000);
              //   }}
              //   className="headerItem group relative flex h-[.8rem] w-fit flex-col overflow-hidden"
              // >
              <Link
                key={`link-${index}`}
                href={`/${link.internalLinkDetails?.slug || ""}`}
                className="headerItem group relative flex h-[.8rem] w-fit flex-col overflow-hidden"
              >
                <span className="transition-transform duration-700 ease-tamisitée group-hover:translate-y-[-100%]">
                  {link.internalLinkDetails?.title || ""}
                </span>
                <span className="transition-transform duration-700 ease-tamisitée group-hover:translate-y-[-100%]">
                  {link.internalLinkDetails?.title || ""}
                </span>
                {/* </motion.button> */}
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
