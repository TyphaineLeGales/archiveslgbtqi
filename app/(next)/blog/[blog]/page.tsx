import React from "react";
import { BlogQueryResult } from "@/sanity.types";
import { sanityFetch } from "@/sanity/lib/fetch";
import { blogQuery } from "@/sanity/lib/queries";

import Blog from "../../components/blogs/Blog";

type Blogs = {
  params: {
    blog: string;
  };
};

export default async function Page({ params }: Blogs) {
  const [blog] = await Promise.all([
    sanityFetch<BlogQueryResult>({
      query: blogQuery,
      params: { blog: params.blog },
    }),
  ]);
  return (
    <div className="min-h-[100dvh] py-[1rem]">
      <Blog
        params={{
          blog: params.blog,
        }}
        blog={blog}
      />
    </div>
  );
}
