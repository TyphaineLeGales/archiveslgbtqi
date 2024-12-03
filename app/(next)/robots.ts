const siteURL = process.env.WEBSITE_URL || "http://localhost:3000";

export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/utils/", "/studio/"],
      },
    ],
    sitemap: `${siteURL}/sitemap.xml`,
  };
}
