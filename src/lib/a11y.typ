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
