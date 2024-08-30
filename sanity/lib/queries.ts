import { groq } from "next-sanity";

// 👇🏽 Settings Query
export const settingsQuery = groq`*[_type == "settings"][0] {
  "globalSettings": {
    "siteTitle": globalSettings.siteTitle,
    "siteDescription": globalSettings.siteDescription,
    "ogImage": globalSettings.ogImage.asset->url,
    "altText": globalSettings.ogImage.alt,
  },
  "header": header{
    "logo": logo {
      "logoImage": logoImage.asset->url,
      alt,
    },
    "links": headerLinks[] {
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
  "footer": footer{
    "logo": logo {
      "logoImage": logoImage.asset->url,
      alt,
    },
    "addressGroup": addressGroup {
      addressTitle,
      addressContent[]{
        ...,
      },
      mailAddress,
    },
    "socialGroup": socialGroup[] {
      socialName,
      socialLink,
      socialLinkImage{
        "imageUrl": asset->url,
        alt,
      },
    },
    "footerLinks": footerLinks[]{
      _key,
      groupName,
      modules[]{
        type,
        "internalLink": internalLink->{
          title,
          "slug": slug.current
        },
        externalLink{
          title,
          url
        },
        text
      }
  }

  }
}`;

// 👇🏽 HomePage Query

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

// 👇🏽 Agenda Query

export const eventQuery = groq`*[_type == "events" && slug.current == $event][0]{
  _id,
  eventType,
  eventTitle,
  slug,
  eventEntrance,
  eventDate,
  eventDescription,
  eventLocation,
  "image": eventImage{
      "imageUrl": image.asset->url,
      alt,
    },
}`;

export const pastEventQuery = groq`*[_type == "events" && defined(eventDate) && eventDate.eventStartDate <= now()] | order(eventDate.eventStartDate desc)[0...3]{
  _id,
  eventType,
  eventTitle,
  slug,
  eventEntrance,
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
  eventType,
  eventTitle,
  slug,
  eventEntrance,
  eventDate,
  eventDescription,
  eventLocation,
  "image": eventImage{
    "imageUrl": image.asset->url,
    alt,
  },
}`;

// 👇🏽 Blogs Query

export const blogsQuery = groq`*[_type == "blogs"  && year >= $minYear && year <= $maxYear] | order(year desc)  {
  _id,
  title,
  subTitle,
  author,
  year,
  date,
  contentBlock[]{
    _type == "richText" => {
      "richText": text
    },
    _type == "singleImage" => {
      "singleImage": {
        "imageUrl": image.asset->url,
        alt
      }
    },
    _type == "multiImagesObject" => {
      "multiImagesObject": multiImages[]{
        "imageUrl": image.asset->url,
        alt
      }
    },
    _type == "links" => {
      "links": {
        label,
        type,
        "internalLink": internal->title,
        external,
        mail
      }
    }
  }
}`;

// 👇🏽 Pages Query

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

export const pagesContentQuery = groq`*[_type == "pages" && slug.current == $slug][0] {
  _id,
  title,
  "slug": slug.current,
  "contentModulde": content[]{
    _id,
    _key,
    _type,
    titleBlock,
    "contenBlock": block[]{
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

export const listeDeFondsQuery = groq`*[_type == "pages" && slug.current == "liste-des-fonds"][0] {
  _id,
  title,
  "slug": slug.current,
  "contentModule": contentFromListeDeFonds[]{
    _id,
    _key,
    _type,
    titleBlock,
    "contenBlock": block[]{
      _type,
      ${richTextFields}
      ${singleImageFields}
      ${multiImagesFields}
      ${linkFields}
    },
  }
}
`;
