"use client";
import React from "react";
import type { HEADER_QUERYResult } from "@/sanity.types";
import { useRouter } from "next/navigation";
import Link from "next/link";

type NavLinkProps = {
  link: { title: string | null; slug: string | null };
};

export default function NavLink({ link }: NavLinkProps) {
  const router = useRouter();
  return <Link href={link.slug || ""}>{link.title || ""}</Link>;
}
