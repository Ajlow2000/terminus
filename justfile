# Generate PDF resume from experience.typ
resume:
    mkdir -p typst-out
    typst compile --input pdf=true src/content/experience.typ typst-out/resume.pdf
