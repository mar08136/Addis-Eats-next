
import { getDishes } from "../lib/seo-dishes";

export default async function sitemap() {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  const dishes = await getDishes();

  return [
    {
      url: baseUrl,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/menu`,
      changeFrequency: "hourly",
      priority: 0.8,
    },
    ...dishes.map((dish) => ({
      url: `${baseUrl}/menu/${dish.id}`,
      changeFrequency: "weekly",
      priority: 0.7,
    })),
  ];
}