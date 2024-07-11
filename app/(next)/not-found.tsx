import { MainPagesContentQueryResult } from "@/sanity.types";
import { sanityFetch } from "@/sanity/lib/fetch";

import Link from "next/link";
import React from "react";

type Props = {
  block: {
    content: string;
    link: {
      ctaTitle: string;
      href: string;
    };
  };
};

export default async function NotFound() {
  // const [notFound] = await Promise.all([
  //   sanityFetch<NotFoundQueryResult>({
  //     query: notFoundQuery,
  //   }),
  // ]);

  // console.log("Page:", notFound);

  return (
    <div className="flex min-h-[calc(100vh-5rem)] flex-col items-center justify-center bg-white-primary"></div>
  );
}
