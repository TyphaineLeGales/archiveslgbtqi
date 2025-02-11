const siteURL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/utils/", "/studio/", "/api/"],
      },
    ],
    host: siteURL,
    sitemap: `${siteURL}/sitemap.xml`,
  };
}
