# LanguageTool Angular 18 Demo (V4.2)

A single-page **Angular 18** demo application that consumes the **LanguageTool `/v2/check` API** to detect grammar and spelling issues, highlight them inline, and apply suggested corrections.

This version (**V4.2**) stabilizes the editor UI, fixes proxy routing issues, preserves the original text baseline correctly, and highlights differences between original and corrected text.

---

## Features

### Core Grammar Check
- User enters text in a multi-line editor (≈10 rows)
- Click **Check Grammar** to invoke LanguageTool
- Grammar/spelling issues detected via:
  - `matches[].offset`
  - `matches[].length`
  - `matches[].replacements[]`

### Inline Error Highlighting
- Errors are highlighted directly in the editor
- Highlights are based strictly on LanguageTool offsets
- Visual underline uses **non-layout-affecting styles** to avoid text shifting

### Suggestions UI
- When the caret moves inside an error:
  - A dropdown appears with suggested corrections
- Keyboard support:
  - `Tab / Shift+Tab` → jump between errors
  - `Arrow Up / Down` → navigate suggestions
  - `Enter` → apply suggestion
  - `Esc` → close suggestions

### Original vs Corrected Comparison
- The **original text** is captured **only once**:
  - When the user explicitly clicks **Check Grammar**
- Auto re-checks after applying suggestions do **not** overwrite the original
- Bottom section shows:
  - Original text
  - Corrected text
  - Inline diff highlighting:
    - **Green** → added text
    - **Red (strikethrough)** → removed text

### Debug & Transparency
- Console logging (`console.info`) for:
  - Request payload
  - Raw LanguageTool response
  - Parsed matches
- In-page **Request / Response Logs** panel for easy inspection
- Helpful for demos and troubleshooting

---

## Architecture Overview

### Editor Design (Important)
This app intentionally uses a **stable two-layer editor pattern**:

- **Highlight Underlay (`div.highlights`)**
  - Absolutely positioned
  - Renders highlighted text using `<mark>`
  - `pointer-events: none`
- **Textarea Overlay**
  - Real editable control
  - Transparent text with `text-shadow` for visibility
  - Caret and selection remain native

This avoids the complexity and instability of `contenteditable` while keeping full control over offsets.

---

## Proxy & API Configuration

### Why a Proxy Is Required
LanguageTool rejects requests when `/v2/` is not at the root path.  
Angular’s dev proxy is used to fix this cleanly.

### Proxy Setup (`proxy.conf.json`)
```json
{
  "/lt": {
    "target": "http://localhost:8081",
    "secure": false,
    "changeOrigin": true,
    "logLevel": "debug",
    "pathRewrite": {
      "^/lt": ""
    }
  }
}
```

### Effective Routing
| Angular Request | Proxied To |
|-----------------|-----------|
| `/lt/v2/check`  | `http://localhost:8081/v2/check` |

---

## Prerequisites

- **Node.js** 18+
- **Angular CLI** 18  
  ```bash
  npm install -g @angular/cli@18
  ```
- **LanguageTool Server** running locally:
  - `http://localhost:8081`

---

## Running the Application

```bash
npm install
ng serve --proxy-config proxy.conf.json
```

Open in browser:
```
http://localhost:4200
```

### Where Logs Appear
- **Browser DevTools Console (F12)**  
  → `console.info` logs
- **Terminal running `ng serve`**  
  → Proxy logs (`logLevel: debug`)
- **In-page Logs Section**  
  → Last request, response, and error

---

## Version History (Condensed)

### V4.2 (Current)
- Fixed “two textareas” / layout duplication
- Stabilized highlight overlay positioning
- Preserved original text baseline correctly
- Correct diff highlighting between original and corrected

### V4.1
- Scrollbar and overlay stabilization (`scrollbar-gutter`, `pointer-events`)

### V4
- Expanded editor to ~10 rows

### V3
- Fixed proxy path issue with `pathRewrite`
- Added request/response logging

---

## Known Limitations
- Offsets become stale if the user types after a grammar check  
  → Expected behavior; user should re-run **Check Grammar**
- Very large texts (>10k chars) may affect performance (demo-oriented)

---

## Intended Use
- LanguageTool demos
- Grammar UX prototyping
- Angular + NLP integration examples

---

## License
Demo / internal use only.  
LanguageTool is subject to its own license.