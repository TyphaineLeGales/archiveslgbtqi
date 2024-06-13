"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

type NavLinkProps = {
  link: { title: string | null; slug: string | null };
};

export default function DesktopNavLink({ link }: NavLinkProps) {
  const pathname = usePathname();
  return (
    <Link
      href={`/${link.slug || ""}`}
      className={
        pathname === `/${link.slug}` ? "underline underline-offset-4" : ""
      }
    >
      {link.title || ""}
    </Link>
  );
}
