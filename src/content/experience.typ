#let pdf-mode = sys.inputs.at("pdf", default: "false") == "true"

// --- Data ---

#let jobs = (
  (
    title: "Platform/Systems Software Engineer",
    company: "SRAM LLC",
    url: "https://www.sram.com/en/sram",
    location: "Colorado Springs, CO",
    date: "Feb 2025 – Present",
    bullets: (
    "Support development of Tauri desktop applications by building out cross-platform Bluetooth Low Energy connection logic.",
    "Support comprehensive hardware-in-the-loop test coverage of our BLE logic primarily targeting nrf52 peripherals.",
    "Responsive to the rapid upstream hardware iteration of future products.",
    "Maintain Rust <> C/CPP interop via bindgen.",
    ),
  ),
  (
    title: "Application Software Engineer",
    company: "SRAM LLC",
    url: "https://www.sram.com/en/sram",
    location: "Colorado Springs, CO",
    date: "Feb 2023 – Feb 2025",
    bullets: (
    "Extend and maintain Windchill used for managing SRAM’s product data (design, testing, manufacturing). ie: Product Lifecycle Management (PLM).",
    "Contribute new features to and maintain a 20+ year old Java codebase.",
    "Modernized and improved the project’s use of java’s type system to catch more errors at compile time.",
    "Refactored project-wide logging to reduce runtime performance by up to 45%.",
    "Build UI’s with ExtJS.",
    ),
  ),
  (
    title: "Software Engineer (College)",
    company: "Verve Industrial Protection",
    url: "https://verveindustrial.com",
    location: "Madison, WI",
    date: "Sep 2019 – Aug 2021",
    bullets: (
    "Support an ICS/OT Endpoint Management solution by adding new device support. Member of the Agentless Device Inventory (ADI) team.",
    "Research and investigate PLC’s via reading manufacturer provided specifications or reverse engineering communication protocols with Wireshark.",
    "New device support was often written in C, but exposed to the Endpoint Management software via CPython bindings.",
    "Interacted with Rockwell, Hirschmann, and Bachmann family devices.",
    "The Verve EMS interacted closely with aDolus FACT platform to provide visibility into device inventory, software supply chain, and vulnerability.",
    ),
  ),
  (
    title: "Junior Technician",
    company: "Kozar Technologies",
    url: "https://kozartech.com",
    location: "Stevens Point, WI",
    date: "Jun 2018 – Aug 2019",
    bullets: (
    "Deploy and service networking, security, and audio systems in residential and small-medium commercial settings.",
    "Experience with running, terminating cat5e networking as well as some basic network configuration (VLANs).",
    "Experience installing RFID security card readers.",
    "Experience with setting up multi-room speaker systems",
    ),
  ),
)

#let skills = (
  (
    label: "Professional",
    items: ("Rust", "Linux", "Java", "CLI development", "C/C++", "Python", "Reading the docs"),
    strong-items: ("Rust", "Linux"),
  ),
  (
    label: "Hobbyist",
    items: ("NixOS", "Ansible", "Docker", "Golang", "Embedded C", "Nmap", "Wireshark", "Binary Analysis"),
    strong-items: ("NixOS",),
  ),
)

#let education = (
  institution: "University of Wisconsin–Madison",
  degree: "B.S. Computer Science",
  date: "2018 – 2022",
  courses: (
    "Operating Systems",
    "Computer Architecture",
    "Algorithms",
    "Programming Languages",
    "Computer Networks",
    "Distributed Systems",
    "Security",
    "Machine Learning",
  ),
)

// --- Rendering ---

#if pdf-mode {
  import "@preview/modern-cv:0.9.0": *

  show: resume.with(
    author: (
      firstname: "Alec",
      lastname: "Lowry",
      email: "contact@aleclowry.com",
      github: "ajlow2000",
      linkedin: "ajlow2000",
      address: "Colorado Springs, CO",
      positions: ("Systems Software Engineer",),
    ),
    profile-picture: none,
    date: datetime.today().display(),
    language: "en",
    colored-headers: true,
    show-footer: false,
    paper-size: "us-letter",
  )

  [== Experience]

  for job in jobs {
    resume-entry(
      title: job.title,
      location: job.location,
      date: job.date,
      description: job.company,
    )
    for bullet in job.bullets {
      resume-item[#bullet]
    }
  }

  [== Skills]

  for skill in skills {
    resume-skill-item(skill.label, skill.items)
  }

  [== Education]

  resume-entry(
    title: education.degree,
    location: "Madison, WI",
    date: education.date,
    description: education.institution,
  )
  resume-item[Relevant coursework: #education.courses.join(", ")]

} else {
  set text(fill: rgb("#d4d0c8"))

  [= Experience]

  for job in jobs {
    html.elem("div", attrs: (class: "entry"))[
      #html.elem("div", attrs: (class: "entry-header"))[
        #html.elem("span", attrs: (class: "entry-title"))[
          #link(job.url)[#job.title]
        ]
        #html.elem("span", attrs: (class: "entry-date"))[#job.date]
      ]
      #html.elem("div", attrs: (class: "entry-meta"))[
        #job.company #sym.dot.c #job.location
      ]
      #list(..job.bullets.map(b => [#b]))
    ]
  }

  [= Skills]

  html.elem("dl", attrs: (class: "skills"))[
    #for skill in skills {
      html.elem("div", attrs: (class: "skill-row"))[
        #html.elem("dt")[#skill.label]
        #html.elem("dd")[
          #skill.items.map(item => {
            if skill.strong-items.contains(item) { strong(item) } else { item }
          }).join([, ])
        ]
      ]
    }
  ]

  [= Education]

  html.elem("div", attrs: (class: "entry"))[
    #html.elem("div", attrs: (class: "entry-header"))[
      #html.elem("span", attrs: (class: "entry-title"))[#education.institution]
      #html.elem("span", attrs: (class: "entry-date"))[#education.date]
    ]
    #html.elem("div", attrs: (class: "entry-meta"))[#education.degree]
    #html.elem("div", attrs: (class: "entry-courses"))[
      Relevant coursework: #education.courses.join(", ")
    ]
  ]
}
