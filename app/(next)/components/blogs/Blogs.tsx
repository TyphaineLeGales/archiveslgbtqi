import React from "react";
import { BlogsQueryResult } from "@/sanity.types";

import BlogsDesktop from "./BlogsDesktop";
import BlogsMobile from "./BlogsMobile";

type BlogsProps = {
  blogs: BlogsQueryResult;
};

export default function Blogs({ blogs }: BlogsProps) {
  return (
    <>
      <BlogsMobile blog={blogs} />
      <BlogsDesktop blog={blogs} />
    </>
  );
}
