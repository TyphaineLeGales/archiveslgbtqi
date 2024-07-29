import { client } from "@/sanity/lib/client";

export const fetchYears = async (): Promise<number[]> => {
  const years: number[] = await client.fetch(`*[_type == "blogs"].year`);
  const uniqueYears = [...new Set(years)].sort((a, b) => b - a); // Sort years in descending order
  return uniqueYears;
};
