# terminus improvements

## semantic css
- [x] expand `:root` in `Layout.astro` with a full color token set (headings, body, muted, accent, borders, code-bg)
- [x] replace all hardcoded colors across all files with the new variables
- [x] consolidate the four muted gray shades (`#aaa`, `#888`, `#666`, `#555`) into 2–3 intentional semantic levels
- [x] extract series slug generation into a shared utility (duplicated in `BlogPost.astro` and `series/[series].astro`)
- [x] extract date formatting into a shared utility (duplicated across 5 files)

## mobile
- [x] add `@media (max-width: 600px)` to `BlogPost.astro`: stack `.title-row` vertically (title above date)
- [x] add responsive stacking to post/tag/series list items (title above date on narrow screens)
- [x] reduce h1 font size on mobile (`1.75rem` → ~`1.35rem` in BlogPost, `2rem` → ~`1.5rem` on index)
- [x] wrap tables in `BlogPost.astro` with an `overflow-x: auto` container
- [x] add padding to nav links in `Layout.astro` to meet 44px touch target minimum

## accessibility
- [x] fix color contrast: `.series-part` (`#555` on `#0f0f0f` is ~2.6:1, below WCAG AA)
- [x] audit other low-contrast grays (`#666`, `#888`) against WCAG AA (4.5:1 for normal text)

## meta / seo
- [ ] add `<meta name="description">` to `Layout.astro` (accept optional prop, use post description when available)
- [ ] add Open Graph tags (`og:title`, `og:description`, `og:type`)
- [ ] add a favicon

## misc
- [ ] add `series` and `tags` links to the nav in the top level writing page
