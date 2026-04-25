import type { ThemeRegistrationRaw } from "shiki";

// palette (mirrors src/lib/theme.typ and Layout.astro)
const white       = "#ffffff";
const linen       = "#E6E6E6";
const mist        = "#BAC8B1";
const sage        = "#7B9669";
const slate       = "#6C8480";
const forest      = "#3A4A35";
const forestMid   = "#526648";
const forestDark  = "#252E21";

export const syntaxTheme: ThemeRegistrationRaw = {
  name: "terminus-dark",
  type: "dark",
  colors: {
    "editor.background":  forest,
    "editor.foreground":  linen,
    "editorLineNumber.foreground": forestMid,
  },
  tokenColors: [
    // comments — subtle green
    {
      scope: ["comment", "punctuation.definition.comment"],
      settings: { foreground: sage, fontStyle: "italic" },
    },
    // strings — mist
    {
      scope: ["string", "string.quoted", "string.template"],
      settings: { foreground: mist },
    },
    // keywords — slate
    {
      scope: ["keyword", "storage.type", "storage.modifier"],
      settings: { foreground: slate, fontStyle: "bold" },
    },
    // functions / identifiers — white
    {
      scope: ["entity.name.function", "support.function", "meta.function-call"],
      settings: { foreground: white },
    },
    // types / classes — linen
    {
      scope: ["entity.name.type", "entity.name.class", "support.type", "support.class"],
      settings: { foreground: linen },
    },
    // numbers, booleans, constants — mist
    {
      scope: ["constant.numeric", "constant.language", "constant.character"],
      settings: { foreground: mist },
    },
    // tags (HTML/JSX) — slate
    {
      scope: ["entity.name.tag", "meta.tag"],
      settings: { foreground: slate },
    },
    // attributes — sage
    {
      scope: ["entity.other.attribute-name"],
      settings: { foreground: sage },
    },
    // variables — linen (default)
    {
      scope: ["variable", "variable.other"],
      settings: { foreground: linen },
    },
    // punctuation — slightly muted
    {
      scope: ["punctuation"],
      settings: { foreground: "#8a9e82" },
    },
  ],
};
