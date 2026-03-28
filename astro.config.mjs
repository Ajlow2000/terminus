import { defineConfig } from "astro/config";
import { typst } from "astro-typst";
import { SYNTAX_THEME } from "./src/config.ts";

export default defineConfig({
  output: "static",
  markdown: {
    shikiConfig: { theme: SYNTAX_THEME },
  },
  integrations: [typst({ target: () => "html" })],
  vite: {
    ssr: {
      external: ["@myriaddreamin/typst-ts-node-compiler"],
    },
  },
});
