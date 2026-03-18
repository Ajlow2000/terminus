---
title: Hello, Markdown
date: 2026-03-16
description: The first post on this blog.
---

# GitHub Flavored Markdown Reference

GFM is a strict superset of [CommonMark](https://spec.commonmark.org). Extensions are marked **[GFM]**.

---

## Block Elements

### Headings

```markdown
# H1
## H2
### H3
#### H4
##### H5
###### H6
```

Setext style (H1/H2 only):

```markdown
Heading 1
=========

Heading 2
---------
```

Rules: space required after `#`; 0–3 spaces of indentation allowed; optional closing `#`.

---

### Thematic Break

```markdown
---
***
___
```

Three or more `-`, `*`, or `_`. Spaces between characters are allowed (`- - -`).

---

### Paragraph

Consecutive non-blank lines. Blank line ends a paragraph. First line indented 0–3 spaces (4+ triggers code block).

---

### Block Quote

```markdown
> This is a block quote.
> It can span multiple lines.
>
> New paragraph inside the quote.
```

- `>` optionally followed by a space
- Can contain any block element (headings, lists, code blocks)
- Consecutive lines without `>` are "lazy continuation" and stay in the quote

---

### Lists

**Bullet list** — markers: `-`, `+`, or `*`

```markdown
- item one
- item two
  - nested item (indented 2 spaces)
- item three
```

**Ordered list** — marker: digits + `.` or `)`

```markdown
1. First
2. Second
   1. Nested
3. Third
```

**Tight vs loose**: blank lines between items make a "loose" list, wrapping each item in `<p>` tags.

---

### Task List **[GFM]**

```markdown
- [ ] unchecked
- [x] checked
- [-] dropped (convention, not spec — renders as filled box)
```

Must be a bullet list item. Space inside `[ ]` for unchecked; any character for checked.

---

### Code Block

**Fenced** (preferred):

````markdown
```python
def hello():
    print("world")
```
````

- Opening fence: 3+ backticks or tildes
- Optional info string (language) after opening fence
- Closing fence must match type and be at least as long
- Can interrupt a paragraph; no blank line required

**Indented** (4 spaces):

```markdown
    code here
    more code
```

Cannot interrupt a paragraph; blank line required before it.

---

### Table **[GFM]**

```markdown
| Left | Center | Right |
|:-----|:------:|------:|
| a    |   b    |     c |
| foo  |  bar   |   baz |
```

Alignment: `:---` left, `:---:` center, `---:` right, `---` default.
Escape pipes inside cells with `\|`.
Header cell count must match delimiter row.

---

### HTML Block

Raw HTML passed through as-is. Seven types; most common:

```markdown
<div>
raw html here
</div>
```

Blank line ends the block (for most types). Security note: GitHub sanitizes dangerous tags.

---

### Link Reference Definition

```markdown
[label]: https://example.com "Optional Title"
[label]: <https://example.com> 'alternate title'
```

Not rendered — defines a reusable link target. Label matching is case-insensitive.

---

## Inline Elements

### Emphasis

```markdown
*italic* or _italic_
**bold** or __bold__
***bold italic***
```

`_` delimiters require non-alphanumeric flanking characters to open/close (safer to use `*`).

---

### Strikethrough **[GFM]**

```markdown
~~deleted text~~
```

Renders as `<del>`.

---

### Code Span

```markdown
`inline code`
`` code with a ` backtick ``
```

Whitespace stripped from start/end if present. No markup processed inside.

---

### Links

**Inline**:

```markdown
[link text](https://example.com)
[link text](https://example.com "title")
[link text](<url with spaces>)
```

**Reference**:

```markdown
[link text][label]
[link text][]        <!-- implicit: label = link text -->
```

**Autolink** (angle bracket):

```markdown
<https://example.com>
<user@example.com>
```

**Autolink extension [GFM]** — recognized without angle brackets:

```markdown
www.example.com
https://example.com
user@example.com
```

---

### Images

```markdown
![alt text](url)
![alt text](url "title")
![alt text][label]
```

---

### Hard Line Break

```markdown
line one
line two
```

Two or more trailing spaces, or a trailing backslash `\`:

```markdown
line one\
line two
```

---

### Soft Line Break

A single newline with no trailing spaces becomes a space in output (not a `<br>`).

---

### Backslash Escape

Escapes any ASCII punctuation character:

```markdown
\*not italic\*
\# not a heading
\| not a table cell separator
```

Full set: `` ! " # $ % & ' ( ) * + , - . / : ; < = > ? @ [ \ ] ^ _ ` { | } ~ ``

---

### HTML Entities

```markdown
&nbsp;   &copy;   &mdash;
&#123;           <!-- decimal -->
&#x1F600;        <!-- hex, emoji -->
```

---

## Precedence

Block structure is parsed first, then inline. A list marker or fence always wins over inline constructs. Example: a backtick cannot prevent a `-` from starting a list item.

---

## GFM Extensions Summary

| Extension       | Syntax            | Notes                            |
|-----------------|-------------------|----------------------------------|
| Tables          | `\| col \| col \|` | Requires delimiter row           |
| Task lists      | `- [ ]` / `- [x]` | Bullet list items only           |
| Strikethrough   | `~~text~~`        | Double tilde                     |
| Autolinks       | bare URLs/emails  | `www.` prefix or `https://`      |
| Disallowed HTML | —                 | `<script>`, `<iframe>` etc. filtered by GitHub |

---

## Parsing Model

Two-phase:
1. **Block pass** — identify structure, collect link reference definitions
2. **Inline pass** — parse emphasis, links, code spans within each block
