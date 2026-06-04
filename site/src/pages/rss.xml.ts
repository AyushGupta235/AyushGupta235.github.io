import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import type { APIContext } from "astro";

export async function GET(context: APIContext) {
  const posts = (await getCollection("posts")).filter((p) => !p.data.draft);
  return rss({
    title: "Ayush Gupta — Notes",
    description: "Essays, book notes, and research notes.",
    site: context.site ?? "https://ayushgupta.github.io",
    items: posts
      .sort((a, b) => +b.data.date - +a.data.date)
      .map((p) => ({
        title: p.data.title,
        description: p.data.subtitle ?? p.data.description ?? "",
        pubDate: p.data.date,
        link: `/notes/${p.id}/`,
      })),
  });
}
