# LanguageTool Angular 18 Demo

Single-page Angular app that calls a LanguageTool server (`/v2/check`) and:
- highlights errors using `offset/length`
- shows suggestions in a dropdown when caret moves into an error
- supports Tab / Shift+Tab navigation across errors
- applies chosen correction and re-checks
- shows Original vs Corrected with diff highlighting

## Prereqs
- Node.js 18+ (recommended)
- Angular CLI 18 (`npm i -g @angular/cli@18`)

## Start LanguageTool
Run LanguageTool server on:
- `http://localhost:8081`

Example (docker) if you use it in your environment (optional):
- Ensure it exposes port 8081

## Run the app
```bash
npm install
npm start
```
Open:
- http://localhost:4200

The app uses a proxy to avoid CORS:
- `/lt` -> `http://localhost:8081` (see `proxy.conf.json`)

## Notes
- A native `<textarea>` cannot style ranges inside it. This demo uses a 2-layer editor:
  - an underlay div that renders highlights
  - a real textarea over it for editing


### Proxy note
This project sets `proxyConfig` in `angular.json` **and** uses `npm start` with `--proxy-config` as a belt-and-suspenders approach.
If you run `ng serve` directly, the proxy should still work.


### Where are console logs?
Client logs (`console.info`) appear in your **browser DevTools Console** (F12), not in VS Code terminal.
V3 also shows the latest request/response in the UI under **Request/Response Logs**.


## V4
- Editor expanded to ~10 rows by default.
- Fixed highlight overlay misalignment (removed border-bottom; uses inset box-shadow).


## V4.1 (stability patch)
- Fixed overlay clumsiness by stabilizing scrollbar space (`scrollbar-gutter: stable`) and forcing both layers to reserve scrollbar width (`overflow: scroll`).
- Highlights layer now has `pointer-events: none` to prevent click/selection interference.


## V4.2
- Fixed editor overlay layout so highlight underlay does not render as a second textarea.
- Preserves baseline original text from the first user-initiated Check; auto re-check after applying suggestions no longer overwrites Original.


## V4.3
- 'Original' baseline is captured only once (until Clear) so it always reflects what the user entered at the beginning.
- Increased contrast for diff highlights in the comparison view.
