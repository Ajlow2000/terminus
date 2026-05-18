import type { ThemeRegistrationRaw } from "shiki";

// Light theme — warm papyrus code blocks
export const syntaxThemeLight: ThemeRegistrationRaw = {
  name: "terminus-light",
  type: "light",
  colors: {
    "editor.background": "#ece2c5",
    "editor.foreground": "#524a37",
    "editorLineNumber.foreground": "#a89e80",
  },
  settings: [
    {
      scope: ["comment", "punctuation.definition.comment"],
      settings: { foreground: "#7e745b", fontStyle: "italic" },
    },
    {
      scope: ["string", "string.quoted", "string.template"],
      settings: { foreground: "#2A6B3A" },
    },
    {
      scope: ["keyword", "storage.type", "storage.modifier"],
      settings: { foreground: "#6B49B1", fontStyle: "bold" },
    },
    {
      scope: ["entity.name.function", "support.function", "meta.function-call"],
      settings: { foreground: "#A04827" },
    },
    {
      scope: ["entity.name.type", "entity.name.class", "support.type", "support.class"],
      settings: { foreground: "#256C7E" },
    },
    {
      scope: ["constant.numeric", "constant.language", "constant.character"],
      settings: { foreground: "#8B5E1A" },
    },
    {
      scope: ["entity.name.tag", "meta.tag"],
      settings: { foreground: "#6B49B1" },
    },
    {
      scope: ["entity.other.attribute-name"],
      settings: { foreground: "#A04827" },
    },
    {
      scope: ["variable", "variable.other"],
      settings: { foreground: "#524a37" },
    },
    {
      scope: ["punctuation"],
      settings: { foreground: "#7e745b" },
    },
  ],
};

// Dark theme — lackluster (slugbyte/lackluster.nvim)
export const syntaxThemeDark: ThemeRegistrationRaw = {
  name: "terminus-dark",
  type: "dark",
  colors: {
    "editor.background": "#101010",
    "editor.foreground": "#DDDDDD",
    "editorLineNumber.foreground": "#444444",
  },
  settings: [
    {
      scope: ["comment", "punctuation.definition.comment"],
      settings: { foreground: "#3A3A3A" },
    },
    {
      scope: ["string", "string.quoted", "string.template"],
      settings: { foreground: "#708090" },
    },
    {
      scope: ["constant.character.escape", "constant.character.escape.regexp"],
      settings: { foreground: "#789978" },
    },
    {
      scope: ["keyword", "storage.type", "storage.modifier"],
      settings: { foreground: "#666666" },
    },
    {
      scope: ["entity.name.function"],
      settings: { foreground: "#DEEEED" },
    },
    {
      scope: ["support.function", "meta.function-call", "variable.function"],
      settings: { foreground: "#7A7A7A" },
    },
    {
      scope: ["entity.name.type", "entity.name.class", "support.type", "support.class"],
      settings: { foreground: "#AAAAAA" },
    },
    {
      scope: ["constant.numeric", "constant.language", "constant.character"],
      settings: { foreground: "#AAAAAA" },
    },
    {
      scope: ["entity.name.tag", "meta.tag"],
      settings: { foreground: "#555555" },
    },
    {
      scope: ["entity.other.attribute-name"],
      settings: { foreground: "#444444" },
    },
    {
      scope: ["variable", "variable.other"],
      settings: { foreground: "#CCCCCC" },
    },
    {
      scope: ["punctuation"],
      settings: { foreground: "#7A7A7A" },
    },
  ],
};

// Legacy single export for backwards compat
export const syntaxTheme = syntaxThemeDark;
