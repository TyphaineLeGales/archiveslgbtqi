"use client";
import { HeaderQueryResult, SettingsQueryResult } from "@/sanity.types";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

type NavLinkProps = {
  settings: SettingsQueryResult;
};

export default function MobileHeader({ settings }: NavLinkProps) {
  const menuRef = React.useRef<HTMLDivElement>(null);
  const [menu, setMenu] = React.useState(false);

  const handleMenu = () => {
    setMenu(!menu);
    menuRef.current?.classList.toggle("hidden");
  };
  return (
    <div>
      <button onClick={handleMenu} className="lg:hidden">
        [menu]
      </button>

      <div
        ref={menuRef}
        className="fixed inset-0 z-50 hidden flex-col gap-[1rem] bg-white p-[1rem] lg:hidden"
      >
        <button
          onClick={handleMenu}
          className="absolute right-[1rem] top-[1rem]"
        >
          [close]
        </button>
        <nav className="flex flex-col gap-[1rem] p-[1rem]">
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
      </div>
    </div>
  );
}
