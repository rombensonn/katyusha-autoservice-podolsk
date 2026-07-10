import type { MetadataRoute } from "next";
import { servicePages } from "@/lib/service-pages";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://rombensonn.github.io/katyusha-autoservice-podolsk").replace(/\/$/, "");
  const now = new Date();

  return [
    {
      url: siteUrl,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1
    },
    ...servicePages.map((page) => ({
      url: `${siteUrl}/services/${page.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8
    })),
    {
      url: `${siteUrl}/privacy`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3
    },
    {
      url: `${siteUrl}/personal-data-consent`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3
    }
  ];
}
