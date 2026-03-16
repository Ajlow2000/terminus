import { defineConfig } from "astro/config";
import { typst } from "astro-typst";

export default defineConfig({
  output: "static",
  integrations: [
    typst({
      target: () => "html",
    }),
  ],
  vite: {
    ssr: {
      external: ["@myriaddreamin/typst-ts-node-compiler"],
    },
  },
});
