#let frame(alt: "", body) = html.elem(
  "figure",
  attrs: (class: "typst-figure"),
  html.frame(body) + html.elem("figcaption", alt),
)

#let captioned(caption: "", body) = html.elem(
  "figure",
  attrs: (class: "typst-figure"),
  body + html.elem("figcaption", caption),
)

#let with-filename(filename, code) = html.elem(
  "div",
  attrs: (class: "code-with-filename"),
  html.elem("div", attrs: (class: "code-filename"), filename) + code,
)
