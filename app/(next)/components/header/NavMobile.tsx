"use client";
import { SettingsQueryResult } from "@/sanity.types";

import React from "react";
import clsx from "clsx";
import Link from "next/link";
import Image from "next/image";

type NavLinkProps = {
  settings: SettingsQueryResult;
};

export default function NavMobile({ settings }: NavLinkProps) {
  const menuRef = React.useRef<HTMLDivElement>(null);
  const [menu, setMenu] = React.useState(false);

  const handleMenu = () => {
    // setMenu((prevMenu) => !prevMenu);
    setMenu(!menu);

    if (menu) {
      document.body.style.overflow = "auto";
    } else {
      document.body.style.overflow = "hidden";
    }
  };

  return (
    <nav className="relative z-50 block lg:hidden">
      <div className="fixed top-0 flex h-[5rem] w-full items-center justify-between border-b-[1px] border-black-primary bg-white-primary/70 px-[1rem] backdrop-blur-md">
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
            className="aspect-square h-[50px] w-[50px]"
          />
        </Link>
        <button onClick={handleMenu} className="z-50 lg:hidden">
          {menu ? "[close]" : "[menu]"}
        </button>
      </div>

      <div
        ref={menuRef}
        // className="absolute left-0 top-0 z-50 mt-[5rem] h-screen w-full flex-col gap-[1rem] overflow-hidden bg-white-primary p-[1rem] lg:hidden"
        className={clsx(
          "fixed inset-0 z-50 mt-[5rem] h-screen w-full flex-col gap-[1rem] overflow-hidden bg-white-primary p-[1rem] transition-transform duration-500 ease-tamisitée lg:hidden",
          menu ? "translate-x-0" : "translate-x-[100%]",
        )}
      >
        <nav className="z-50 flex flex-col items-center justify-center gap-[3rem]">
          {settings?.header.links &&
            settings.header.links.map((link, index) => {
              if (link.type === "internal") {
                return (
                  <Link
                    key={link._key}
                    onClick={handleMenu}
                    href={`/${link.internalLinkDetails?.slug || ""}`}
                    className="headerMobileItem z-50 h-[1.5rem] overflow-hidden"
                  >
                    <div>{link.internalLinkDetails?.title || ""}</div>
                  </Link>
                );
              } else {
                return (
                  <a
                    key={link._key}
                    onClick={handleMenu}
                    href={link.externalLinkDetails.url || ""}
                    target="_blank"
                    rel="noreferrer"
                    className="headerMobileItem h-[1.5rem] overflow-hidden"
                  >
                    <div>{link.externalLinkDetails.title}</div>
                  </a>
                );
              }
            })}
        </nav>
      </div>
    </nav>
  );
}
