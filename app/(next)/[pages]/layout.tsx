import React from "react";

import { sanityFetch } from "@/sanity/lib/fetch";
import { PagesContentQueryResult } from "@/sanity.types";
import { pagesContentQuery } from "@/sanity/lib/queries";
import { notFound } from "next/navigation";
import NavigationBar from "../components/navigation-bar";

type Props = {
  children: React.ReactNode;
  params: { pages: string };
};

export default async function Layout({ children, params }: Props) {
  const [content] = await Promise.all([
    sanityFetch<PagesContentQueryResult>({
      query: pagesContentQuery,
      params,
    }),
  ]);

  if (!content?._id) {
    return notFound();
  }
  return (
    <>
      <nav>
        <NavigationBar content={content} />
      </nav>
      {children}
    </>
  );
}
