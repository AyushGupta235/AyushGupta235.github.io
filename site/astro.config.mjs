// @ts-check
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import yaml from "@rollup/plugin-yaml";

export default defineConfig({
  site: "https://ayushgupta.github.io",
  integrations: [mdx()],
  markdown: {
    shikiConfig: { theme: "css-variables" },
  },
  vite: {
    plugins: [yaml()],
  },
});
