import { FooterQueryResult } from "@/sanity.types";
import { sanityFetch } from "@/sanity/lib/fetch";
import { footerQuery } from "@/sanity/lib/queries";
import React from "react";

export default async function Footer() {
  const footerContents = await sanityFetch<FooterQueryResult>({
    query: footerQuery,
  });

  console.log("footerContents", footerContents);
  return (
    <div className="flex w-full items-center justify-center p-[1rem]">
      <div>
        <h1>{footerContents?.title}</h1>
      </div>
    </div>
  );
}
