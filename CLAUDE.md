# Personal Site — Workspace Guide

A professional portfolio and resume site for Zack Dell, showcasing systems engineering, embedded firmware, PCB design, and manufacturing automation expertise. Deployed to zackdell.com via GitHub Pages.

## Architecture

**Static HTML site with JavaScript-powered content loading:**
- Six main HTML pages (index, about, projects, services, contact, resume)
- Dynamic project gallery populated from `projects.json` via `scripts.js`
- AI-powered resume tailor tool (`resume-generator.js`) using Claude API
- Responsive dark-theme design with modal-based project details
- Contact form integrated with Formspree

## Key Files

### Pages
- [index.html](index.html) — Home with hero carousel and featured projects
- [about.html](about.html) — Professional mission and expertise
- [projects.html](projects.html) — Full projects grid
- [services.html](services.html) — Service offerings (C++, systems design, PCB, automation)
- [contact.html](contact.html) — Email contact form
- [resume.html](resume.html) — Full resume with AI tailor tool

### Data & Assets
- `projects.json` — Central project database (title, description, images, specs, tags, year, role, etc.)
- `resume-data.json` — Resume content (personal, coreskills, experience, merged with projects.json)
- `assets/` — SVG project thumbnails (drink-maker, vulkan-accelerator, rpi-cm5, long-century, placeholder)

### Scripts
- [scripts.js](scripts.js) — Core: hero carousel, project grid/modal, contact form handler, scroll-based background overlay
- [resume-generator.js](resume-generator.js) — Resume AI tailor: Claude API integration, PDF download via html2pdf

### Styling
- [styles.css](styles.css) — Unified dark theme (navy/black gradient, cyan accent, glassmorphic cards, responsive grid)

### CI/CD
- [.github/workflows/deploy.yml](.github/workflows/deploy.yml) — Auto-deploys master → gh-pages branch on push

## Content Flow

1. **Projects Data** (`projects.json`) — single source of truth for all projects
   - Fields: `title`, `description`, `long_description`, `image`, `images[]`, `tags`, `year`, `role`, `specs`, `outcome`, `link`, `repo`, `highlights`
   - Used by: hero carousel, featured grid, full projects page, resume page, modals

2. **Resume Data** (`resume-data.json`)
   - Structure: `personal` (name, title, email, location), `coreskills[]`, `experience[]`, `projects` (merged from projects.json)
   - Rendered on resume.html and by AI tailor tool

3. **Modal System**
   - Project cards → click "Details" → modal opens with carousel, specs, outcome, links
   - Supports keyboard navigation (arrow keys, Esc)
   - Carousel with prev/next buttons and dot indicators

4. **Form Submission**
   - contact.html form posts to Formspree endpoint
   - Fetch-based submission with status feedback

5. **AI Resume Tailor** (resume.html)
   - User pastes job description + provides Claude API key
   - `resume-generator.js` calls Claude Sonnet API
   - AI reorders/highlights relevant experience/projects
   - PDF download via html2pdf library

## Deployment

**GitHub Pages workflow:**
- Trigger: push to master
- Action: deploys `./` (entire root) to `gh-pages` branch
- CNAME: zackdell.com (already configured)

**To deploy manually:**
```bash
git push origin master
```

The workflow automatically runs and publishes to https://zackdell.com

## Development Notes

### Adding/Updating Projects
1. Edit `projects.json` — add/modify project object
2. Add image(s) to `assets/` if needed
3. Commit → auto-published on push

### Updating Resume
1. Edit `resume-data.json` (personal, coreskills, experience)
2. Or edit `projects.json` — projects auto-merge into resume
3. Resume page loads and renders on page open

### Styling
- CSS variables: `--bg`, `--card`, `--accent`, `--accent-2`, `--muted`, `--text` (defined in `:root`)
- Responsive: 900px breakpoint for header layout
- Print-safe: resume styles include `@media print` rules

### SEO & Meta
- Each page has `<meta description>`, Open Graph tags, JSON-LD schema
- robots.txt and sitemap.xml present
- Analytics ready (Plausible stub in comments, can be enabled)

## Common Tasks

### Fix a broken project image
→ Check `projects.json` for correct `assets/filename.svg` path, or upload new image to `assets/`

### Update hero carousel
→ Edit `projects.json` — first 4 projects are used by `scripts.js:initCarousel()`

### Change site colors
→ Update CSS variables in [styles.css:2-9](styles.css#L2-L9)

### Adjust modal width/height
→ [styles.css:70](styles.css#L70) — `.modal-card` max-width/max-height

### Disable resume tailor tool
→ Remove or hide `.resume-generator` div in [resume.html:250-278](resume.html#L250-L278)

## Dependencies

**Client-side only:**
- html2pdf.js (loaded dynamically for PDF export)
- No build step, no package.json

**External Services:**
- Formspree (contact form)
- GitHub Pages (hosting)

## Browser Support

Modern browsers (ES6+). Tested on recent Chrome, Firefox, Safari, Edge.

## Accessibility

- Semantic HTML5 (header, main, footer, article, section, nav)
- Modal has `aria-hidden`, keyboard controls, proper focus
- Images have alt text
- Color contrast meets WCAG AA

## Next Steps / Enhancements

- Auto-generate sitemap from projects.json
- Dark/light mode toggle
- Project search/filter
- Testimonials section
- Blog (extend to markdown)
- Analytics integration (uncomment Plausible in pages if enabled)
