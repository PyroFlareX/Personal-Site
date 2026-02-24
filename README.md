# Personal Site

A minimal static portfolio site built with vanilla HTML, CSS, and JavaScript.

- **Portfolio items**: Edit `projects.json` to add/modify projects
- **Pages**: Edit `index.html`, `projects.html`, `resume.html`, `services.html`, `contact.html`
- **Styles**: Modify `styles.css`
- **Scripts**: Update `scripts.js`

## Contact Form

The contact form in `contact.html` currently uses [Formspree](https://formspree.io/) to receive messages.

## Personal Site Info

This repository holds a small, self-contained static portfolio website for myself.

Features

- Clean, responsive single-page sections for Home, Projects, Services, Resume, and Contact
- Projects are driven by a `projects.json` file so you can add or reorder entries without changing markup
- Lightweight vanilla JavaScript (`scripts.js`) for project gallery, modal details, and a hero carousel
- Accessible, mobile-friendly layout and simple CSS (`styles.css`) for quick customization
- Contact form integration (placeholder action to Formspree) for simple message handling
- Deployable to GitHub Pages with optional custom domain via `CNAME`

Contents

- `index.html` — Home and hero
- `about.html` — Intro, goals, and hands-on interests
- `projects.html` — Full projects grid
- `services.html` — Services offered
- `resume.html` — Resume and project highlights
- `contact.html` — Contact form and contact info
- `projects.json` — Project data (title, description, images, tags)
- `styles.css`, `scripts.js`, `assets/` — Styling, behavior, and media

Notes

- The site is intentionally small and dependency-free for easy hosting on any static host.
- The contact form currently points to Formspree; replace the `action` in `contact.html` if you prefer another form backend.
- DNS and Pages deployment details are tracked in `.github/workflows/deploy.yml` and the `CNAME` file when using a custom domain.

The workflow at `.github/workflows/deploy.yml` automatically:
