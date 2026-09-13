/**
 * Stylelint plugin: site/semantic-color-tokens
 *
 * Enforces that color-related CSS properties in component files only use
 * the site's semantic token var()s — no raw color literals, no ad-hoc vars.
 *
 * Reads the allowlist from src/styles/token-allowlist.json, which is
 * generated from themes.ts by `scripts/gen-token-allowlist.mjs`.
 * Run `npm run gen-tokens` (or let prebuild do it) to refresh after adding
 * a new token to themes.ts.
 */

import stylelint from 'stylelint';
import { colorTokenVarNames } from './src/styles/themes.ts';

const { createPlugin } = stylelint;

const ruleName = 'site/semantic-color-tokens';

// CSS properties whose values are colour-bearing and therefore must use
// semantic tokens. Box-shadow is intentionally excluded — it contains
// geometric values alongside colour, and the --shadow token handles it.
const COLOR_PROPS = new Set([
  'color',
  'background',
  'background-color',
  'border-color',
  'border-top-color',
  'border-right-color',
  'border-bottom-color',
  'border-left-color',
  'outline-color',
  'fill',
  'stroke',
  'text-decoration-color',
  'caret-color',
  'accent-color',
  'column-rule-color',
]);

// Matches raw color literals: hex, rgb/rgba, hsl/hsla, oklch, oklab, lch, lab, hwb, color().
const RAW_COLOR_RE = /#[0-9a-fA-F]{3,8}\b|(?:rgba?|hsla?|oklch|oklab|lch|lab|hwb|color)\s*\(/i;

// Values that look like colors but are valid non-token usage.
const ALLOWED_KEYWORDS = new Set([
  'transparent',
  'currentcolor',
  'inherit',
  'initial',
  'unset',
  'revert',
  'revert-layer',
]);

const messages = {
  rawColor: (prop, value) =>
    `Raw color literal in '${prop}: ${value}' — use a semantic token (var(--...)).`,
  unknownToken: (varName) =>
    `'${varName}' is not a semantic color token. Add it to src/styles/themes.ts.`,
};

const meta = { url: 'https://github.com/ajlow2000/ajlow2000_terminus' };

const plugin = createPlugin(ruleName, (primary, secondary) => {
  return (root, result) => {
    if (!primary) return;

    const allowlist = new Set([
      ...colorTokenVarNames,
      ...(secondary?.allowVars ?? []),
    ]);

    root.walkDecls((decl) => {
      if (!COLOR_PROPS.has(decl.prop.toLowerCase())) return;

      const value = decl.value.trim().toLowerCase();
      if (ALLOWED_KEYWORDS.has(value)) return;

      // Flag raw color literals.
      if (RAW_COLOR_RE.test(decl.value)) {
        result.warn(messages.rawColor(decl.prop, decl.value), {
          node: decl,
          ruleName,
          word: decl.value,
        });
        return;
      }

      // Flag var() references that aren't in the allowlist.
      const varRefs = [...decl.value.matchAll(/var\(\s*(--[\w-]+)/g)].map((m) => m[1]);
      for (const v of varRefs) {
        if (!allowlist.has(v)) {
          result.warn(messages.unknownToken(v), {
            node: decl,
            ruleName,
            word: v,
          });
        }
      }
    });
  };
});

plugin.ruleName = ruleName;
plugin.messages = messages;
plugin.meta = meta;

export default plugin;
