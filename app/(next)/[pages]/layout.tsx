import React from "react";

import { sanityFetch } from "@/sanity/lib/fetch";
import { PagesContentQueryResult } from "@/sanity.types";
import { pagesContentQuery } from "@/sanity/lib/queries";
import { notFound } from "next/navigation";
import DesktopNavigationBar from "../components/navbar/navbar-desktop";
import MobileNavigationBar from "../components/navbar/navbar-mobile";

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
    <div className="">
      <h1>{content.title}</h1>
      <nav>
        {/* <NavigationBar content={content} /> */}
        <MobileNavigationBar content={content} />
        <DesktopNavigationBar content={content} />
      </nav>
      {children}
    </div>
  );
}
