"use client";
import { SettingsQueryResult } from "@/sanity.types";

import React from "react";

import Link from "next/link";
import Image from "next/image";

import clsx from "clsx";

import InternalLink from "./InternalLink";
import ExternalLink from "./ExternalLink";
import HambugerButton from "../ui/icon/HambugerButton";

type NavLinkProps = {
  settings: SettingsQueryResult;
};

export default function NavMobile({ settings }: NavLinkProps) {
  const menuRef = React.useRef<HTMLDivElement>(null);
  const [menu, setMenu] = React.useState(false);

  const handleMenu = () => {
    setMenu(!menu);
  };

  menu
    ? (document.body.style.overflow = "hidden")
    : (document.body.style.overflow = "auto");

  return (
    <nav className="relative z-40 block lg:hidden">
      <div className="fixed top-0 flex h-[5rem] w-full items-center justify-between bg-black px-[1rem] text-white">
        <Link
          href="/"
          onClick={() => {
            setMenu(false);
          }}
        >
          <Image
            src={
              settings?.header?.logo || "https://via.placeholder.com/100x100"
            }
            alt="logo"
            width={50}
            height={50}
            priority
            className="aspect-square h-[80px] w-[80px]"
          />
        </Link>
        <HambugerButton
          onclick={handleMenu}
          menu={menu}
          className="z-50 flex flex-col gap-[.5rem] lg:hidden"
        />
      </div>

      <div
        ref={menuRef}
        className={clsx(
          "fixed inset-0 z-50 mt-[5rem] h-screen w-full flex-col gap-[1rem] overflow-hidden bg-white-primary p-[1rem] transition-transform duration-500 ease-tamisitée lg:hidden",
          menu ? "translate-x-0" : "translate-x-[100%]",
        )}
      >
        <nav className="z-50 flex flex-col items-end justify-center gap-[1rem]">
          {settings?.header.links &&
            settings.header.links.map((link, index) => {
              if (link.type === "internal") {
                return (
                  <InternalLink
                    key={link._key}
                    link={link as any}
                    onclick={() => {
                      setMenu(false);
                    }}
                  />
                );
              } else {
                return <ExternalLink key={link._key} link={link as any} />;
              }
            })}
        </nav>
      </div>
    </nav>
  );
}
