# Chrome Media Downloader Extension 📥🎥

A lightweight, robust Google Chrome extension designed to scrape, preview, and download images and videos from any webpage.

## Overview
This extension injects content scripts to scan the current webpage for all visible and hidden media assets (`<img>`, `<video>`, `<source>`). It bypasses common anti-download wrappers and presents a clean, organized gallery interface where users can select and download the media they want.

## Features
- **Deep DOM Scanning:** Extracts image and video URLs even if they are embedded in complex DOM structures or hidden behind overlay divs.
- **Visual Gallery:** Displays a popup gallery interface to preview all found media before downloading.
- **Bulk Download:** Allows selecting multiple files to download them simultaneously.
- **Metadata Support:** Handles base64 encoded images, blob URLs, and standard HTTP/HTTPS media.

## Technical Details
- Built with vanilla JavaScript, HTML, and CSS.
- Uses Chrome Extension Manifest V3.
- Utilizes `chrome.scripting` and `chrome.downloads` APIs.
- Cross-origin resource handling for media extraction.

## Installation (Developer Mode)
1. Clone this repository to your local machine.
2. Open Google Chrome and navigate to `chrome://extensions/`.
3. Enable **Developer mode** in the top right corner.
4. Click **Load unpacked** and select the directory containing this repository.
5. The extension icon will appear in your toolbar, ready to use!

## License
MIT
