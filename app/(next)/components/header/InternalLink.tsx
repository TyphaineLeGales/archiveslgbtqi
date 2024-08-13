"use client";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";
import clsx from "clsx";

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

export default function InternalLink({ link, onclick }: InternalLinkProps) {
  const pathname = usePathname();
  return (
    <Link
      key={link._key}
      href={`/${link.internalLinkDetails?.slug || ""}`}
      onClick={onclick}
      className={clsx(
        "headerItem",
        pathname === `/${link.internalLinkDetails?.slug}`
          ? "text-pink-arch"
          : "",
      )}
    >
      {link.internalLinkDetails?.title || ""}
    </Link>
  );
}
