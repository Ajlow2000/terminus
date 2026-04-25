import type { ThemeRegistrationRaw } from "shiki";

// Light theme — warm papyrus code blocks
export const syntaxThemeLight: ThemeRegistrationRaw = {
  name: "terminus-light",
  type: "light",
  settings: [],
  colors: {
    "editor.background": "#ece2c5",
    "editor.foreground": "#524a37",
    "editorLineNumber.foreground": "#a89e80",
  },
  tokenColors: [
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

// Dark theme — forest code blocks
export const syntaxThemeDark: ThemeRegistrationRaw = {
  name: "terminus-dark",
  type: "dark",
  settings: [],
  colors: {
    "editor.background": "#2F3D2B",
    "editor.foreground": "#CDD6C7",
    "editorLineNumber.foreground": "#526648",
  },
  tokenColors: [
    {
      scope: ["comment", "punctuation.definition.comment"],
      settings: { foreground: "#7A8971", fontStyle: "italic" },
    },
    {
      scope: ["string", "string.quoted", "string.template"],
      settings: { foreground: "#8BD99E" },
    },
    {
      scope: ["keyword", "storage.type", "storage.modifier"],
      settings: { foreground: "#B898E8", fontStyle: "bold" },
    },
    {
      scope: ["entity.name.function", "support.function", "meta.function-call"],
      settings: { foreground: "#D9A87A" },
    },
    {
      scope: ["entity.name.type", "entity.name.class", "support.type", "support.class"],
      settings: { foreground: "#8FC5D0" },
    },
    {
      scope: ["constant.numeric", "constant.language", "constant.character"],
      settings: { foreground: "#CFAA6A" },
    },
    {
      scope: ["entity.name.tag", "meta.tag"],
      settings: { foreground: "#B898E8" },
    },
    {
      scope: ["entity.other.attribute-name"],
      settings: { foreground: "#D9A87A" },
    },
    {
      scope: ["variable", "variable.other"],
      settings: { foreground: "#CDD6C7" },
    },
    {
      scope: ["punctuation"],
      settings: { foreground: "#8a9e82" },
    },
  ],
};

// Legacy single export for backwards compat
export const syntaxTheme = syntaxThemeDark;
