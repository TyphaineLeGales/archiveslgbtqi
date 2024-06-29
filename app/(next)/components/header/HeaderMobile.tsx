"use client";
import { SettingsQueryResult } from "@/sanity.types";

import React from "react";

type NavLinkProps = {
  settings: SettingsQueryResult;
};

export default function HeaderMobile({ settings }: NavLinkProps) {
  const menuRef = React.useRef<HTMLDivElement>(null);
  const [menu, setMenu] = React.useState(false);

  const handleMenu = () => {
    setMenu((prevMenu) => !prevMenu);

    if (menu) {
      document.body.style.overflow = "auto";
    } else {
      document.body.style.overflow = "hidden";
    }
  };

  return (
    <div className="z-50">
      <button onClick={handleMenu} className="z-50 lg:hidden">
        {menu ? "[close]" : "[menu]"}
      </button>

      {menu && (
        <div
          key={"menu"}
          ref={menuRef}
          className="absolute left-0 top-0 z-50 mt-[5rem] h-screen w-full flex-col gap-[1rem] overflow-hidden bg-white p-[1rem] lg:hidden"
        >
          <nav className="z-50 flex flex-col items-center justify-center gap-[3rem]">
            {settings?.header.links &&
              settings.header.links.map((link, index) => {
                if (link.type === "internal") {
                  return (
                    <a
                      key={link.internalLinkDetails?._id || ""}
                      onClick={handleMenu}
                      href={`/${link.internalLinkDetails?.slug || ""}`}
                      className="headerMobileItem z-50 h-[1.5rem] overflow-hidden"
                    >
                      <div>{link.internalLinkDetails?.title || ""}</div>
                    </a>
                  );
                } else {
                  return (
                    <a
                      key={`link-${index}`}
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
      )}
    </div>
  );
}
