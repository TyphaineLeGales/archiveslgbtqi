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

export const moreStoriesQuery = groq`*[_type == "post" && _id != $skip && defined(slug.current)] | order(date desc, _updatedAt desc) [0...$limit] {
  ${postFields}
}`;

export const postQuery = groq`*[_type == "post" && slug.current == $slug] [0] {
  content,
  ${postFields}
}`;

/** My Query **/

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

export const pagesContentQuery = groq`*[_type == "pages" && slug.current == $pages][0] {
  _id,
  title,
  slug,
  "navigation": navigation[]->{
    _id,
    title,
    slug,
  },
  "content": content[]{
    _type,

    // richtext
    "richtext": text[],

    // single-image
    "imageTitle": title,
    "imageUrl": image.asset->url,

    // link
    "linkLabel": label,
    // external
    external,
    // internal
    "internal": internal->{
      _id,
      _type,
      title,
      "slug": slug.current,
    },
  }
}`;

export const homepageQuery = groq`*[_type == "homepage"][0] {
  "heroes": heroes[]{
    title,
    paragraph,
    "image": image{
      "imageUrl": image.asset->url,
      alt,
    },
    "cta": cta{
      ctaLabel,
      "ctaLink": ctaLink->{
        _id,
        _type,
        title,
        "slug": slug.current,
      },
    },
  },
}`;

export const eventsQuery = groq`*[_type == "events"] | order(eventDate.eventStartDate desc) {
  _id,
  eventTitle,
  slug,
  eventDate,
  eventDescription,
  eventLocation,
  "image": eventImage{
      "imageUrl": image.asset->url,
      alt,
    },
}`;

export const eventQuery = groq`*[_type == "events" && slug.current == $event] [0]{
  _id,
  eventTitle,
  slug,
  eventDate,
  eventDescription,
  eventLocation,
  "image": eventImage{
      "imageUrl": image.asset->url,
      alt,
    },
}`;
