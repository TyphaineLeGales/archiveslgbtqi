"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { SettingsQueryResult } from "@/sanity.types";

type NavLinkProps = {
  settings: SettingsQueryResult;
};

export default function NavDesktop({ settings }: NavLinkProps) {
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const router = useRouter();

  return (
    <nav className="fixed z-40 hidden max-h-[5rem] w-full items-center justify-between overflow-hidden border-b-[1px] border-black-primary bg-white-primary bg-opacity-50 px-[1rem] backdrop-blur-md lg:flex">
      <Link
        href="/"
        className="relative my-auto flex aspect-square h-[5rem] w-[5rem] items-center justify-center"
      >
        <Image
          src={settings?.header?.logo || "https://via.placeholder.com/100x100"}
          alt="logo"
          width={50}
          height={50}
          priority
          className="aspect-square h-[50px] w-[50px]"
        />
      </Link>
      <div className="flex justify-between gap-[1rem]">
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
      </div>
    </nav>
  );
}
