# Saravanan J — Digital Marketing Freelancer Portfolio

A static HTML/CSS/JS build of the portfolio brief: dark-mode-first, glassmorphic
cards, animated gradient blobs, floating badge chips on the hero photo, an
animated stats strip, and the core lead-gen features (WhatsApp button, call
button, exit-intent popup, cookie consent, newsletter, contact form).

## Structure
```
index.html        Home (hero, stats, services preview, why-choose-me,
                   testimonials, certifications, case study, blog preview, CTA)
about.html         Story, mission/vision/values, skills, career timeline
services.html      All 15+ services in detail + pricing CTA + FAQ accordion
portfolio.html     Filterable project cards with result stats
contact.html       Full contact form + WhatsApp / call / email / meet / Calendly
css/style.css      Theme tokens, glassmorphism, blobs, animations
js/main.js         Theme toggle, mobile menu, counters, reveal, slider, FAQ,
                   filters, form validation, cookie banner, exit popup
assets/avatar.svg  Placeholder cut-out headshot — swap for the real photo
robots.txt / sitemap.xml
```

## Before going live
1. **Replace the photo** — swap `assets/avatar.svg` for the real cut-out
   headshot (PNG/WebP, transparent background) and update the `<img src>`
   references in `index.html` and `about.html`.
2. **Update contact details** — WhatsApp number, phone number and email are
   placeholders (`910000000000`, `hello@saravananj.com`) in every page footer
   and on `contact.html`.
3. **Wire the contact form** — the form currently validates client-side only.
   Connect it to an email service, form backend, or serverless function, and
   add real reCAPTCHA/spam protection server-side.
4. **Connect Calendly / Google Meet links** on `contact.html`.
5. **Add analytics** — drop in your GA4, GTM, Meta Pixel, LinkedIn Insight Tag
   and Microsoft Clarity snippets before `</head>` on each page.
6. **Update `sitemap.xml` / `robots.txt` / canonical URLs** once the real
   domain is live.

## Notes
- Built with Tailwind CDN for fast iteration — for production, consider
  compiling Tailwind to a static stylesheet to remove the CDN warning and
  reduce payload.
- Dark mode is the default and persists via `localStorage`; the toggle is in
  the header on every page.
- All animations respect `prefers-reduced-motion`.
