"use client";
import React from "react";
import type { HEADER_QUERYResult } from "@/sanity.types";
import { useRouter } from "next/navigation";
import Link from "next/link";

// create a navlink component

type NavLinkProps = {
  link: { title: string | null; slug: string | null };
};

export default function NavLink({ link }: NavLinkProps) {
  const router = useRouter();

  // check if the current path is the same as the link path
  //   const isActive = router.pathname === link.slug;

  return <Link href={link.slug || ""}>{link.title || ""}</Link>;
}
