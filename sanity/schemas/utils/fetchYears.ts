import { client } from "@/sanity/lib/client";

export const fetchYears = async (): Promise<string[]> => {
  const years: string[] = await client.fetch(`*[_type == "blogs"].year`);
  // const uniqueYears = [...new Set(years)].sort((a, b) => b - a); // Sort years in descending order
  // return uniqueYears;
  const uniqueYears = [...new Set(years)].sort(
    (a, b) => parseInt(b) - parseInt(a),
  ); // Sort years in descending order
  return uniqueYears;
};
