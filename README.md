# Chrome Media Downloader

## WHAT IT IS
Chrome Media Downloader is a Manifest V3 Google Chrome extension designed to extract, preview, and download images and videos from arbitrary webpages. It provides a visual gallery interface and supports bulk downloads, while overcoming common DOM encapsulation techniques.

## WHY IT EXISTS
This project serves as a demonstration of browser extension engineering. It handles DOM injection, cross-context message passing, background service workers, and secure storage management. It is designed as a professional case study for frontend and extension architecture.

## SCREENSHOT/DEMO
A synthetic demo page is available in `demo/demo.html`.
*(In a real deployed scenario, a Vercel-hosted link to the demo would be provided here.)*

## ARCHITECTURE
- **Manifest V3:** Adheres to modern extension standards.
- **Service Worker (`background.js`):** Manages context menus, asynchronous download tasks, and metadata generation. Uses ES modules for cleaner code separation.
- **Content Scripts (`content.js`):** Injected into webpages to scan the DOM (`<img>`, `<video>`, shadow boundaries where applicable), handle customized trigger events, and pass metadata back to the background script.
- **UI (`popup.html`, `gallery.html`, `options.html`):** Vanilla HTML/JS/CSS interfaces for extension interaction, gallery viewing, and settings configuration.
- **Storage:** Utilizes `chrome.storage.local` to persist user preferences and the local library state.

## HOW TO RUN
1. Clone this repository.
2. Ensure you have `pnpm` installed (`corepack enable pnpm`).
3. Run `pnpm install` to install developer dependencies.
4. Open Google Chrome and navigate to `chrome://extensions/`.
5. Enable **Developer mode** in the top right.
6. Click **Load unpacked** and select the directory containing this repository.
7. Click the extension icon to interact with it, or right click on media on webpages.

## HOW TO TEST
This project uses vanilla Node.js tests (`node:test` and `node:assert`) for pure functional logic.
Run the tests using:
```bash
pnpm test
```

## KEY TECHNICAL DECISIONS
- **Vanilla JavaScript:** Chosen for zero-dependency runtime execution in the browser to ensure the smallest possible footprint and strict security.
- **Minimal Permissions:** `<all_urls>` is necessary for the core functionality (downloading media from any site the user visits), but other permissions are strictly limited to necessary APIs (`activeTab`, `scripting`, `downloads`, `storage`, `contextMenus`).
- **Strict CSP:** A strict Content Security Policy (`script-src 'self'; object-src 'self';`) is enforced via the manifest to restrict extension-page script sources and reduce script-injection risk.

## VERIFICATION
- Functional testing of core logic is done via `node:test`.

- Automated CI pipeline runs on GitHub Actions.

## HONEST LIMITATIONS
- The extension currently relies on `<all_urls>` which is a broad permission. Future versions could adopt an active-tab-only approach if background scraping isn't required.
- The DOM scraper may not perfectly extract media from heavily obfuscated canvas elements or proprietary DRM-protected video players.
- It is a local-only tool; data is not synced across devices via cloud services (to maintain strict privacy).

## AUTHORSHIP / ATTRIBUTION
Original Author: Abraham Haddioui Lastras
See `ATTRIBUTIONS.md` for full details.
