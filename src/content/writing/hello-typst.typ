#metadata((
    title: "Hello, Typst",
    date: "2026-03-17",
    description: "A test post written in Typst.",
    draft: true,
    tags: ("typst", "astro"),
    series: (
        name: "Building a Blog with Astro",
        part: 2,
    )
))<frontmatter>

#import "@preview/cetz:0.3.2": canvas, draw
#import "@preview/lilaq:0.6.0" as lq
#import "../../lib/a11y.typ": frame, captioned, with-filename
#import "../../lib/theme.typ": color-text, color-border, color-accent-subtle

#set text(fill: color-text)
#show math.equation: eq => html.elem(
    "span",
    attrs: (class: "typst-math " + if eq.block { "typst-math-block" } else { "typst-math-inline" }),
    box(html.frame(eq)) + html.elem("span", attrs: (class: "sr-only"), repr(eq)),
)
#show raw.where(block: true): it => html.elem(
    "pre",
    html.elem("code", attrs: (class: "language-" + it.lang), it.text),
)

= Hello from Typst

This post is written in #link("https://typst.app")[Typst]. Typst is a modern
typesetting system designed to be an alternative to LaTeX, with a cleaner
syntax, faster compilation, and first-class support for mathematical notation.

== A code block

#with-filename("example.rs")[```rust
// Build a greeting and print it.
fn greet(name: &str) -> String {
    format!("Hello, {name}!")
}

fn main() {
    println!("{}", greet("world"));
}
```]

== Why Typst?

Typst has great math support: $ x^2 + y^2 = z^2 $

And clean syntax for structured documents. The Pythagorean theorem above is a
classic example, but Typst handles arbitrarily complex expressions just as
elegantly, from Maxwell's equations $nabla dot bold(E) = rho / epsilon_0$
to the Gaussian integral $integral_(-oo)^(oo) e^(-x^2) dif x = sqrt(pi)$.

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
culpa qui officia deserunt mollit anim id est laborum.

== Structured Markup

Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium
doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore
veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim
ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia
consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.

Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur,
adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et
dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis
nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex
ea commodi consequatur.

At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis
praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias
excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui
officia deserunt mollitia animi, id est laborum et dolorum fuga.

== Satisfaction Scores

The chart below shows fictional developer satisfaction scores (0–5) for a
selection of languages and tools.

#frame(
    alt: "Horizontal stem chart: developer satisfaction scores, Rust highest at 4.8, Java lowest at 2.8",
    canvas(length: 0.85cm, {
        import draw: *

        let data = (
            ("Java",       2.8),
            ("TypeScript", 3.7),
            ("Python",     3.9),
            ("Go",         4.2),
            ("Typst",      4.5),
            ("Rust",       4.8),
        )
        let color-bar  = color-accent-subtle
        let color-axis = color-border

        // X gridlines and labels
        for x in range(0, 6) {
            let xv = float(x)
            line((xv, -0.5), (xv, 5.5), stroke: color-axis + 0.3pt)
            content(
                (xv, -0.6),
                anchor: "north",
                text(size: 7pt, fill: color-text, str(x)),
            )
        }

        // Axes
        line((0, -0.5), (5.5, -0.5), stroke: color-axis + 0.8pt)
        line((0, -0.5), (0, 5.5),    stroke: color-axis + 0.8pt)

        // Stems, dots, and y-labels
        for (i, (label, value)) in data.enumerate() {
            let yv = float(i)
            line((0, yv), (value, yv), stroke: color-bar + 1.2pt)
            circle((value, yv), radius: 0.13, fill: color-bar, stroke: none)
            content(
                (-0.15, yv),
                anchor: "east",
                text(size: 7pt, fill: color-text, label),
            )
        }
    })
)

== Monthly Visitors

The chart below shows fictional monthly visitor counts. Each bar represents
one month of traffic, illustrating how readership grew through the first half
of the year.

#frame(
    alt: "Bar chart: monthly visitors growing from 2.3k in Jan to 5.1k in Jun",
    canvas(length: 0.75cm, {
        import draw: *

        let data = (
            ("Jan", 2.3), ("Feb", 2.8), ("Mar", 3.5),
            ("Apr", 4.2), ("May", 3.8), ("Jun", 5.1),
        )
        let bar-w = 0.55
        let spacing = 1.0
        let color-bar  = color-accent-subtle
        let color-axis = color-border

        // Y gridlines and labels
        for y in range(1, 6) {
        let yv = y * 1.0
        line((0, yv), (6.2, yv), stroke: color-axis + 0.3pt)
        content(
            (-0.15, yv),
            anchor: "east",
            text(size: 7pt, fill: color-text, str(y) + "k"),
        )
    }

        // Axes
        line((0, 0), (6.2, 0), stroke: color-axis + 0.8pt)
        line((0, 0), (0, 5.5), stroke: color-axis + 0.8pt)

        // Bars and x-labels
        for (i, (label, value)) in data.enumerate() {
        let x0 = i * spacing + 0.25
        rect((x0, 0), (x0 + bar-w, value), fill: color-bar, stroke: none)
        content(
            (x0 + bar-w / 2, -0.3),
            text(size: 7pt, fill: color-text, label),
        )
    }
    })
)

Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore,
cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod
maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor
repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum
necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae
non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut
reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus
asperiores repellat.

== Vector Field

The diagram below shows a quiver plot of the vector field
$bold(F)(x, y) = (y, -x)$, a classic rotation field.

#frame(
    alt: "Quiver plot of the rotation vector field F(x,y) = (y, -x), showing arrows circling counterclockwise around the origin",
    lq.diagram(
        lq.quiver(
            lq.arange(-2, 3),
            lq.arange(-2, 3),
            (x, y) => (y, -x),
            color: color-accent-subtle,
        )
    )
)

== Language Popularity

The table below shows rough GitHub star counts and YoY growth for a selection
of programming languages as of early 2026.

#captioned(
    caption: "GitHub star counts and YoY growth for selected programming languages, early 2026.",
    table(
        columns: (1fr, 1fr, 1fr),
        align: (left, right, right),
        table.header(
            [*Language*], [*Stars (M)*], [*YoY Growth*],
        ),
        [Rust],    [95.4],  [+18%],
        [Go],      [121.3], [+11%],
        [Zig],     [14.7],  [+43%],
        [Python],  [217.6], [+9%],
        [TypeScript], [101.2], [+14%],
        [Gleam],   [3.1],   [+67%],
    )
)

Qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et
quas molestias excepturi sint occaecati cupiditate non provident. Similique
sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum
fuga, et harum quidem rerum facilis est et expedita distinctio.

Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit
quo minus id quod maxime placeat facere possimus. Omnis voluptas assumenda
est, omnis dolor repellendus, temporibus autem quibusdam et aut officiis
debitis aut rerum necessitatibus saepe eveniet.
