import { PagesContentQueryResult } from "@/sanity.types";
import { sanityFetch } from "@/sanity/lib/fetch";
import { pagesContentQuery } from "@/sanity/lib/queries";
import { notFound } from "next/navigation";
import React from "react";
import CustomImage from "../components/custom-image";
import Link from "next/link";
import CustomPortableText from "../portable-text";

type Props = {
  params: { pages: string };
};

export default async function Page({ params }: Props) {
  const [content] = await Promise.all([
    sanityFetch<PagesContentQueryResult>({
      query: pagesContentQuery,
      params,
    }),
  ]);

  if (!content?._id) {
    return notFound();
  }
  console.log("Pages Content:", content.content);

  return (
    <div className="container mx-auto min-h-screen px-5">
      <h1 className="text-4xl font-bold">{content.title}</h1>
      <div>
        {content.content?.map((item, index) => (
          <div key={`content-item-${index}`}>
            {(() => {
              switch (item._type as string) {
                case "richtext":
                  return <CustomPortableText value={item?.richtext!} />;
                case "single-image":
                  return (
                    <CustomImage
                      imageUrl={item.imageUrl || ""}
                      title={item.title || ""}
                    />
                  );
                case "link": {
                  const link = item;
                  return (
                    <Link href={`${link.internal?.slug || link.external}`}>
                      {link.label}
                    </Link>
                  );
                }
                default:
                  return null;
              }
            })()}
          </div>
        ))}
      </div>
    </div>
  );
}
