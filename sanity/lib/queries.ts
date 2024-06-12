import { groq } from "next-sanity";

export const settingsQuery = groq`*[_type == "settings"][0]`;

const postFields = /* groq */ `
  _id,
  "status": select(_originalId in path("drafts.**") => "draft", "published"),
  "title": coalesce(title, "Untitled"),
  "slug": slug.current,
  excerpt,
  coverImage,
  "date": coalesce(date, _updatedAt),
  "author": author->{"name": coalesce(name, "Anonymous"), picture},
`;

const sectionsFields = /* groq */ `
  _id,
  _type,
  title,
  slug,
  "content": content[]{
    _ref,
    _type,
    title,
    content,
    "imageUrl": image.asset->url,
    "url": url,
  }
`;

export const headerQuery = groq`*[_type == "header"] {
  "imageUrl": logo.asset->url,
  "url": links[]->{
     title,
     "slug": slug.current
  }
}`;

export const footerQuery = groq`*[_type == "footer"][0] {
  title,
}`;

export const heroQuery = groq`*[_type == "post" && defined(slug.current)] | order(date desc, _updatedAt desc) [0] {
  content,
  ${postFields}
}`;

export const moreStoriesQuery = groq`*[_type == "post" && _id != $skip && defined(slug.current)] | order(date desc, _updatedAt desc) [0...$limit] {
  ${postFields}
}`;

export const postQuery = groq`*[_type == "post" && slug.current == $slug] [0] {
  content,
  ${postFields}
}`;

export const pagesContentQuery = groq`*[_type == "pages" && slug.current == $pages] [0] {
  _id,
  title,
  slug,
  "sections": content[]->{
    _id,
    _ref,
    _type,
    title,
    slug,
    content,
    "imageUrl": image.asset->url,
    "url": url,
  },
}`;

export const sectionQuery = groq`*[_type == "sections" && slug.current == $section] [0] {
  _id,
  _type,
  title,
  slug,
  "content": content[]{
    _ref,
    _type,
    title,
    content,
    "imageUrl": image.asset->url,
    "url": url,
  }
}`;

export const homepageQuery = groq`*[_type == "homepage"][0] {
  hero {
    heading,
    description,
    ctatext,
    "imageUrl": image.asset->url,
    "url": cta->slug,
  },
    "modules": modules[]->{
    ${sectionsFields}
  }
}`;
