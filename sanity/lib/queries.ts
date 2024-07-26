import { groq } from "next-sanity";

export const settingsQuery = groq`*[_type == "settings"][0] {
  "globalSettings": {
    "siteTitle": globalSettings.siteTitle,
    "ogImage": globalSettings.ogImage.asset->url,
    "altText": globalSettings.ogImage.alt,
    "svg": globalSettings.svgIcon,
  },
  "header": {
    "logo": header.logo.asset->url,
    "links": header.headerLinks[] {
      _key,
      type,
      linkPosition,
      "internalLinkDetails": internalLink-> {
        _id,
        _key,
        _type,
        title,
        "slug": slug.current
      },
      "externalLinkDetails": {
        _key,
        "title": externalLink.title,
        "url": externalLink.url
      }
    }
  },
  "footer": {
    _id,
    "moduleGroups": footer.moduleGroups[] {
      _id,
      _key,
      groupName,
      "modules": modules[] {
        _key,
        _id,
        type,
        "internalDetails": internalLink-> {
          _key,
          _id,
          _type,
          title,
          "slug": slug.current
        },
        "externalDetails": {
          "title": externalLink.title,
          "url": externalLink.url
        },
        "text": text
      }
    }
  }
}`;

// Type

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

export const heroFields = /* groq */ `
    ...,
    _id,
    _key,
    "image": image{
      "imageUrl": image.asset->url,
      alt,
    },
    cta {
      ctaLabel,
      ctaLink->{
        _type,
        "slug": slug.current
      }
    }
`;

export const secondPartFields = /* groq */ `
  ...,
  _id,
  _key,
  "image": image{
    "imageUrl": image.asset->url,
    alt,
  },
  cta {
    ctaLabel,
    ctaLink->{
      _type,
      "slug": slug.current
    },
    ctaScrollTo
  },
`;

export const eventFields = /* groq */ `
  _id,
  eventType,
  eventTitle,
  slug,
  eventDate,
  eventDescription,
  eventLocation,
  "image": eventImage{
      "imageUrl": image.asset->url,
      alt,
    },
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

export const homepageQuery = groq`*[_type == "homepage"][0] {
  _key,
  _id,
  _type,

  "heroVisibility": hero.heroVisibility,
  "hero": hero.hero[]{
    ${heroFields}
  },

  "secondPartVisibility": secondPart.secondPartVisibility,
  "secondPart": secondPart.block[]{
   ${secondPartFields}
  },

  introText {
    introTextVisibility,
    introTextContent[]{
      ...,
  },
    newsletterTextContent
  },

  "upcomingEventsSection": upcomingEventsSection {
    upcomingEventsSectionVisibility,
    upcomingEventsTitle,
    upcomingEventsCTA{
      eventsCTATitle,
      eventsCTA->,
    },
    "upcomingEvents": upcomingEvents[]-> {${eventFields}},
    upcomingEventsCTATitle,
  },

  marqueeCTA {
    marqueeCTAVisibility,
    marqueeContent,
    marqueeLink,
  }
 
}`;

export const eventsQuery = groq`*[_type == "events" ] | order(eventDate.eventStartDate desc) {
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

export const eventQuery = groq`*[_type == "events" && slug.current == $event][0]{
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

export const lastEventQuery = groq`*[_type == "events" && defined(eventDate) && eventDate.eventStartDate >= now()] | order(eventDate.eventDateStart asc) [0...5] {
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

export const blogsQuery = groq`*[_type == "blogs" ] | order(eventDate.eventStartDate desc) {
  _id,
  blogTitle,
  slug,
  blogContentText,
  "blogImages": blogImages[] {
    "imageUrl": image.asset->url,
    alt,
  },
}`;

export const blogQuery = groq`*[_type == "blogs" && slug.current == $blog][0]{
  _id,
  blogTitle,
  slug,
  blogContentText,
  "blogImages": blogImages[] {
    "imageUrl": image.asset->url,
    alt,
  },
}`;

export const lesArchivesVivantesQuery = groq`*[_type == "lesArchivesVivantes"][0]`;

// export const eventFields = /* groq */ `
//   _id,
//   eventTitle,
//   slug,
//   eventDate,
//   eventDescription,
//   eventLocation,
//   "image": eventImage{
//       "imageUrl": image.asset->url,
//       alt,
//     },
// `;

export const richTextFields = /* groq */ `
  _id,
  _key,
  "richtext": text[],
`;

export const richTextAndTitleFields = /* groq */ `
  _id,
  "richTextTitle": title,
  "richtextTitleText": text[],
`;

export const singleImageFields = /* groq */ `
  _id,
  "imageTitle": title,
  "imageUrl": image.asset->url,
`;

export const multiImagesFields = /* groq */ `
  _id,
  "multiImages": images[] {
        "imageUrl": image.asset->url,
        alt,
      },
`;

export const linkFields = /* groq */ `
  _id,
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
  "mail": mail,
`;

export const lastEventFields = /* groq */ `
  _id,
  "isDisplayed": event.isDisplayed,
  "lastEventLabel": event.title,
  "goToAllEvents": event.ctaToEvents,
`;

export const creationArchivesFields = /* groq */ `
  _id,
  "creationArchivesTitle": intro[],
  "creationArchivesArchive": archive[] {
    title,
    description[],
    status,
    },
`;

export const customHtmlFields = /* groq */ `
  _id,
  "customHtml": html,
  "codeTitle": codeTitle,
  "isAddFiles": isAddFiles,
  "fileGroup": fileGroup[] {
    title,
    files[] {
      asset->,
      },
      },
`;

export const documentFileFields = /* groq */ `
  _id,
  title,
  "fileUrl": file.asset->url,
  "fileName": file.asset->originalFilename,
`;

export const pagesContentQuery = groq`*[_type == "pages" && slug.current == $pages][0] {
  _id,
  title,
  "slug": slug.current,
  "contentModulde": content[]{
    _id,
    _key,
    _type,
    titleBlock,
    "contenBlock": block[]{
      // ...,
      _type,
      ${richTextFields}
      ${richTextAndTitleFields}
      ${singleImageFields}
      ${multiImagesFields}
      ${linkFields}
      ${lastEventFields}
      ${creationArchivesFields}
      ${customHtmlFields}
      ${documentFileFields}
    },
  }
}
`;
