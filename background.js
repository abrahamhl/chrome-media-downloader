chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        id: "download_gallery_pro",
        title: "💾 Guardar en Galería PRO",
        contexts: ["image", "video"]
    });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === "download_gallery_pro") {
        // Aquí está la clave: añadimos .catch() para que no lance el error "Uncaught promise"
        // si la página no se ha recargado o es una página protegida de Chrome.
        chrome.tabs.sendMessage(tab.id, { action: "context_download" }).catch(() => {
            console.warn("⚠️ La extensión no está activa en esta pestaña. Por favor, pulsa F5 para recargar la página.");
        });
    }
});

function cleanTitle(prompt) {
    if (!prompt || prompt.includes("Sin prompt")) return `Img_${Date.now()}`;
    let words = prompt.replace(/[^a-zA-Z0-9 ]/g, '').trim().split(' ');
    let shortName = words.slice(0, 5).join('-');
    return `${shortName}_${Math.floor(Math.random() * 1000)}`;
}

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    if (msg.action === "save_media" && msg.url) {
        let filename = `MiGaleria/${cleanTitle(msg.prompt)}.png`;

        chrome.downloads.download({ url: msg.url, filename: filename, conflictAction: "uniquify" }, (downloadId) => {
            chrome.storage.local.get({ library: [] }, (res) => {
                let lib = res.library;
                lib.push({
                    id: downloadId || Date.now(),
                    url: msg.url, file: filename, prompt: msg.prompt, source: msg.source,
                    timestamp: new Date().toISOString()
                });
                chrome.storage.local.set({ library: lib });
            });
        });
    }
    // Es buena práctica devolver true si vamos a responder asíncronamente (aunque aquí no lo usemos estrictamente)
    return true;
});
