"use client";
import { HeaderQueryResult } from "@/sanity.types";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

type NavLinkProps = {
  headerContents: HeaderQueryResult;
};

export default function MobileHeader({ headerContents }: NavLinkProps) {
  const pathname = usePathname();

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

      <nav
        ref={menuRef}
        className="fixed inset-0 z-50 hidden flex-col gap-[1rem] bg-white p-[1rem] lg:hidden"
      >
        <button
          onClick={handleMenu}
          className="absolute right-[1rem] top-[1rem]"
        >
          [close]
        </button>
        {headerContents[0].url?.map((link) => (
          <div key={link.slug} className="flex flex-col">
            <Link
              href={`/${link.slug || ""}`}
              onClick={handleMenu}
              className="flex flex-col"
            >
              {link.title || ""}
            </Link>
          </div>
        ))}
      </nav>
    </div>
  );
}
