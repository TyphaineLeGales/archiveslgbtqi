"use client";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import HeaderTransitionLink from "./HeaderTransitionLink";

type InternalLinkProps = {
  link: {
    _key: string;
    internalLinkDetails: {
      _id: string;
      _key: string;
      _type: string;
      title: string | null;
      slug: string | null;
    } | null;
  };
  onclick?: () => void;
};

export default function InternalLink({ link }: InternalLinkProps) {
  const pathname = usePathname();
  return (
    <HeaderTransitionLink
      key={link._key}
      href={`/${link.internalLinkDetails?.slug || ""}`}
      className={clsx(
        "headerItem",
        pathname === `/${link.internalLinkDetails?.slug}`
          ? "text-pink-arch"
          : "",
      )}
    >
      {link.internalLinkDetails?.title || ""}
    </HeaderTransitionLink>
  );
}
