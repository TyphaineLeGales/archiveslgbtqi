"use client";
/**
 * This config is used to set up Sanity Studio that's mounted on the `app/(sanity)/studio/[[...tool]]/page.tsx` route
 */
import { visionTool } from "@sanity/vision";
import { PluginOptions, defineConfig } from "sanity";
import { unsplashImageAsset } from "sanity-plugin-asset-source-unsplash";
import { codeInput } from "@sanity/code-input";
import { media } from "sanity-plugin-media";

import {
  presentationTool,
  defineDocuments,
  defineLocations,
  type DocumentLocation,
} from "sanity/presentation";
import { structureTool } from "sanity/structure";

import { apiVersion, dataset, projectId, studioUrl } from "@/sanity/lib/api";
import { singletonPlugin } from "@/sanity/plugins/settings";
import settings from "@/sanity/schemas/singletons/settings";
import { resolveHref } from "@/sanity/lib/utils";
import { structure } from "./sanity/plugins/structure";

// Singletons
import homepage from "./sanity/schemas/singletons/homepage";

// Documents
import events from "./sanity/schemas/documents/events";

// Content
import content from "./sanity/schemas/contents/content";

// Blocks
import richtext from "./sanity/schemas/block/richtext";
import documentFile from "./sanity/schemas/block/document-file";
import singleImage from "./sanity/schemas/block/single-image";
import multiImages from "./sanity/schemas/block/multi-images";
import link from "./sanity/schemas/block/link";
import blogs from "./sanity/schemas/documents/blogs";
import contactForm from "./sanity/schemas/block/contact-form";
import lastEvent from "./sanity/schemas/block/last-event";
import creationArchives from "./sanity/schemas/block/creation-archives";
import richtextAndTitle from "./sanity/schemas/block/richtext-title";
import customHtml from "./sanity/schemas/block/custom-html";
import pages from "./sanity/schemas/documents/pages";
import listeDesFondsContent from "./sanity/schemas/contents/liste-des-fonds-content";

const homeLocation = {
  title: "Home",
  href: "/",
} satisfies DocumentLocation;

export default defineConfig({
  basePath: studioUrl,
  projectId,
  dataset,
  schema: {
    types: [
      // Singletons
      settings,
      homepage,
      // Documents
      pages,
      events,
      blogs,
      // Content
      content,
      // Blocks
      richtext,
      richtextAndTitle,
      documentFile,
      singleImage,
      multiImages,
      link,
      contactForm,
      lastEvent,
      creationArchives,
      customHtml,
      listeDesFondsContent,
    ],
  },
  plugins: [
    presentationTool({
      resolve: {
        mainDocuments: defineDocuments([
          {
            route: "/posts/:slug",
            filter: `_type == "post" && slug.current == $slug`,
          },
        ]),
        locations: {
          settings: defineLocations({
            locations: [homeLocation],
            message: "This document is used on all pages",
            tone: "caution",
          }),
          post: defineLocations({
            select: {
              title: "title",
              slug: "slug.current",
            },
            resolve: (doc) => ({
              locations: [
                {
                  title: doc?.title || "Untitled",
                  href: resolveHref("post", doc?.slug)!,
                },
                homeLocation,
              ],
            }),
          }),
        },
      },
      previewUrl: { previewMode: { enable: "/api/draft" } },
    }),
    // structureTool({
    //   structure: pageStructure([settings, header, homepage, footer]),
    // }),
    structureTool({
      structure,
    }),
    codeInput(),
    // Configures the global "new document" button, and document actions, to suit the Settings document singleton
    singletonPlugin([settings.name]),
    // Add an image asset source for Unsplash
    unsplashImageAsset(),
    // media plugin
    media(),
    // Sets up AI Assist with preset prompts
    // https://www.sanity.io/docs/ai-assist
    // assistWithPresets(),
    // Vision lets you query your content with GROQ in the studio
    // https://www.sanity.io/docs/the-vision-plugin
    process.env.NODE_ENV === "development" &&
      visionTool({ defaultApiVersion: apiVersion }),
  ].filter(Boolean) as PluginOptions[],
});
