export const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL && process.env.NODE_ENV !== "development"
    ? `https://${process.env.NEXT_PUBLIC_SITE_URL}`
    : "http://localhost:3000";
