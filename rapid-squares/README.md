# Rapid Squares — UI mockups

Clickable mockups for an aerial roof report tool. These are design mockups only: there is no backend, nothing is saved, and uploads only preview in your browser.

## Screens

| File | Screen |
| --- | --- |
| `index.html` | **My reports**: ordered reports with status filters and search |
| `report-settings.html` | **Report settings**: company name, logo, license number, contact info, and roof photos, with a live report preview |
| `team.html` | **Team & invites** (admin): invite employees, pick a role, and set ordering and settings permissions |
| `account.html` | **Account settings**: locked company field, profile, contact info, billing, and security |

The top nav links all four screens together.

## Viewing

You can view the mockups in either of two ways:

- **Locally:** open `index.html` in a browser. There is no build step.
- **GitHub Pages:** go to the repo's Settings › Pages. Set the source to "Deploy from a branch", then pick `main` and `/ (root)`.

## Notes for reviewers

- Text in brackets, like `[Company Name]` or `[$00]`, is placeholder content.
- Fonts load from Google Fonts: Archivo, IBM Plex Sans, and IBM Plex Mono.
- Shared styles are in `styles.css`. The small amount of interactivity is in `app.js`: filters, role presets, live preview, and upload previews.
