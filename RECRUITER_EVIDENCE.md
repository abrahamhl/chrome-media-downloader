# Recruiter Evidence

This document maps engineering claims to specific evidence in the codebase.

---

### Claim 1: Strong understanding of DOM manipulation and event handling
**EXACT CODE/TEST EVIDENCE:** `content.js` -> `checkTrigger`, event listener capture phase (`document.addEventListener(..., true)`), and element selection via `closest()` and `querySelector()` in `extractDataAndSend`.
**WHAT IT PROVES:** Demonstrates the ability to securely intercept user interactions (mouse and keyboard events) globally on arbitrary web pages, process them, and extract specific DOM structures safely without interfering with normal page behavior.
**TARGET ROLE:** Frontend/Product Engineering, Browser Tooling.
**LIMITATION:** Relies heavily on exact class names (`.card`, `.promptHover`) for specific site integrations which makes it brittle for general-purpose use without updates.

---

### Claim 2: Effective Browser Extension Architecture & Message Passing
**EXACT CODE/TEST EVIDENCE:** `background.js` -> `chrome.runtime.onMessage.addListener`, `manifest.json` -> Background Service Worker configuration.
**WHAT IT PROVES:** Shows competence in Manifest V3 architectural patterns, specifically the boundary separation between isolated content scripts and the centralized background service worker handling the Chrome Downloads API and Local Storage.
**TARGET ROLE:** Puma Browser Engineering, Browser Extension Developer.
**LIMITATION:** Background script handles all downloads synchronously relative to incoming messages, which might bottleneck under extreme load of simultaneous requests.
