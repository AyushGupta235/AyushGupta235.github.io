import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const posts = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/posts" }),
  schema: z.object({
    title: z.string(),
    subtitle: z.string().optional(),
    date: z.coerce.date(),
    tags: z.array(z.string()).default([]),
    kind: z.enum(["essay", "book-note", "research-note"]).default("essay"),
    description: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/projects" }),
  schema: z.object({
    title: z.string(),
    category: z.enum(["research", "applied", "workbench"]),
    filed: z.coerce.date(),
    stack: z.array(z.string()).default([]),
    outcome: z.string(),
    repo: z.string().url().optional(),
    demo: z.string().url().optional(),
    featured: z.boolean().default(false),
    order: z.number().default(100),
  }),
});

const oss = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/oss" }),
  schema: z.object({
    repo: z.string(),
    kind: z.enum(["pr", "issue", "maintainer", "review"]),
    title: z.string(),
    url: z.string().url(),
    filed: z.coerce.date(),
    status: z.enum(["open", "merged", "closed", "ongoing"]),
    note: z.string(),
  }),
});

export const collections = { posts, projects, oss };
