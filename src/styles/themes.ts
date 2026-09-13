/**
 * Color scheme definitions.
 *
 * Each scheme maps the site's semantic token names to concrete values.
 * Add a new scheme here and pass it to <ColorScheme /> to theme the whole site.
 *
 * The CSS custom property names (--bg, --ink, etc.) are stable — components
 * reference those and never see these raw values. Only ColorScheme.astro
 * consumes this file.
 */

export interface ColorScheme {
  // Surfaces
  bg: string;
  bg2: string;
  bg3: string;
  // Borders
  line: string;
  line2: string;
  // Text
  ink: string;
  ink2: string;
  ink3: string;
  ink4: string;
  // Accent
  forest: string;
  forest2: string;
  forest3: string;
  forestStrong: string;
  // Code blocks
  codeBg: string;
  codeLine: string;
  codeFg: string;
  codeLineNum: string;
  codeComment: string;
  // Elevation
  shadow: string;
}

export const cssVarMap = {
  bg:           '--bg',
  bg2:          '--bg-2',
  bg3:          '--bg-3',
  line:         '--line',
  line2:        '--line-2',
  ink:          '--ink',
  ink2:         '--ink-2',
  ink3:         '--ink-3',
  ink4:         '--ink-4',
  forest:       '--forest',
  forest2:      '--forest-2',
  forest3:      '--forest-3',
  forestStrong: '--forest-strong',
  codeBg:       '--code-bg',
  codeLine:     '--code-line',
  codeFg:       '--code-fg',
  codeLineNum:  '--code-line-num',
  codeComment:  '--code-comment',
  shadow:       '--shadow',
} satisfies Record<keyof ColorScheme, string>;

/** Flat list of allowed CSS custom property names — consumed by the linter. */
export const colorTokenVarNames: string[] = Object.values(cssVarMap);

export const dark: ColorScheme = {
  bg:           'oklch(0.24 0.022 150)',
  bg2:          'oklch(0.28 0.026 150)',
  bg3:          'oklch(0.32 0.030 150)',
  line:         'oklch(0.38 0.032 150)',
  line2:        'oklch(0.34 0.028 150)',
  ink:          'oklch(0.97 0.012 150)',
  ink2:         'oklch(0.86 0.018 150)',
  ink3:         'oklch(0.72 0.022 150)',
  ink4:         'oklch(0.56 0.026 150)',
  forest:       'oklch(0.78 0.11 150)',
  forest2:      'oklch(0.78 0.11 150 / 0.20)',
  forest3:      'oklch(0.78 0.11 150 / 0.10)',
  forestStrong: 'oklch(0.88 0.10 150)',
  codeBg:       'oklch(0.28 0.026 150)',
  codeLine:     'oklch(0.36 0.030 150)',
  codeFg:       '#dddddd',
  codeLineNum:  '#444444',
  codeComment:  '#3a3a3a',
  shadow:       '0 1px 2px rgba(0,0,0,0.3), 0 4px 16px rgba(0,0,0,0.25)',
};

export const light: ColorScheme = {
  bg:           '#f6f0df',
  bg2:          '#ede5cf',
  bg3:          '#e3d9bd',
  line:         '#d2c6a3',
  line2:        '#e0d6b8',
  ink:          '#1f1a12',
  ink2:         '#524a37',
  ink3:         '#7e745b',
  ink4:         '#a89e80',
  forest:       'oklch(0.42 0.08 150)',
  forest2:      'oklch(0.42 0.08 150 / 0.12)',
  forest3:      'oklch(0.42 0.08 150 / 0.05)',
  forestStrong: 'oklch(0.36 0.09 150)',
  codeBg:       '#ece2c5',
  codeLine:     '#d8cca8',
  codeFg:       '#524a37',
  codeLineNum:  '#a89e80',
  codeComment:  '#7e745b',
  shadow:       '0 1px 2px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.04)',
};

// The Bevy renderer reads CSS vars from :root at startup via
// window.getComputedStyle(document.documentElement) and only accepts
// #rrggbb hex strings — var() references and oklch() are silently ignored.
// These hex values are the site scheme tokens converted to sRGB hex so the
// WASM app stays visually in-sync with the site palette.

export interface WasmColorScheme {
  bg:           string;  // --fleetsim-bg
  panel:        string;  // --fleetsim-panel
  surface:      string;  // --fleetsim-surface
  text:         string;  // --fleetsim-text
  textMuted:    string;  // --fleetsim-text-muted
  unit:         string;  // --fleetsim-unit
  unitSelected: string;  // --fleetsim-unit-selected
  obstacle:     string;  // --fleetsim-obstacle
}

/** Dark WASM palette — hex-converted from the site's dark oklch tokens. */
export const wasmDark: WasmColorScheme = {
  bg:           '#18221a',
  panel:        '#202d22',
  surface:      '#28372b',
  text:         '#f0f8f1',
  textMuted:    '#9ba99d',
  unit:         '#82cb92',
  unitSelected: '#a8ebb5',
  obstacle:     '#79371e',
};

/** Light WASM palette — hex-converted from the site's light (papyrus) tokens. */
export const wasmLight: WasmColorScheme = {
  bg:           '#f6f0df',
  panel:        '#ede5cf',
  surface:      '#e3d9bd',
  text:         '#1f1a12',
  textMuted:    '#7e745b',
  unit:         '#295935',
  unitSelected: '#008a39',
  obstacle:     '#95402b',
};
