// Atajo por defecto: Shift + Clic Izquierdo
let savedTrigger = { type: 'mouse', button: 0, key: null, ctrl: false, shift: true, alt: false };
let lastContextTarget = null;

// Cargar tu atajo guardado
chrome.storage.local.get(['customTrigger'], (res) => {
    if (res.customTrigger) savedTrigger = res.customTrigger;
});

// Actualizar al instante si cambias algo en el popup
chrome.storage.onChanged.addListener((changes) => {
    if (changes.customTrigger) savedTrigger = changes.customTrigger.newValue;
});

// Comprueba si el evento que acabas de hacer coincide exactamente con tu atajo
function checkTrigger(e, type) {
    if (!savedTrigger) return false;
    if (savedTrigger.type !== type) return false;
    if (savedTrigger.ctrl !== e.ctrlKey) return false;
    if (savedTrigger.shift !== e.shiftKey) return false;
    if (savedTrigger.alt !== e.altKey) return false;

    if (type === 'mouse' && savedTrigger.button !== e.button) return false;
    if (type === 'key' && savedTrigger.key !== e.key.toLowerCase()) return false;

    return true;
}

// Manejador principal
function handleTriggerEvent(e, type) {
    if (checkTrigger(e, type)) {
        // Bloquear comportamiento por defecto del navegador (como abrir pestañas, etc.)
        e.preventDefault();
        e.stopPropagation();

        // Buscar el contenedor de la imagen en Perchance
        let cardWrapper = e.target.closest('.card');

        // Si tocamos dentro de la tarjeta, o directamente sobre una imagen/vídeo
        if (cardWrapper || e.target.tagName === 'IMG' || e.target.tagName === 'VIDEO') {
            extractDataAndSend(cardWrapper, e.target);
        }
    }
}

// Interceptar eventos de ratón y teclado en FASE DE CAPTURA (true)
document.addEventListener('mousedown', (e) => handleTriggerEvent(e, 'mouse'), true);
document.addEventListener('keydown', (e) => handleTriggerEvent(e, 'key'), true);

// IMPORTANTE: Si tu atajo incluye Clic Derecho, tenemos que bloquear el molesto menú de Windows
document.addEventListener('contextmenu', (e) => {
    lastContextTarget = e.target; // Esto sirve para el botón manual del menú contextual

    if (savedTrigger && savedTrigger.type === 'mouse' && savedTrigger.button === 2) {
        // Si coincide con tus modificadores (ej: tenías pulsado Shift), bloqueamos el menú
        if (savedTrigger.ctrl === e.ctrlKey && savedTrigger.shift === e.shiftKey && savedTrigger.alt === e.altKey) {
            let cardWrapper = e.target.closest('.card');
            if (cardWrapper || e.target.tagName === 'IMG') {
                e.preventDefault();
            }
        }
    }
}, true);

// Escuchar orden manual desde el menú del navegador
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "context_download" && lastContextTarget) {
        let cardWrapper = lastContextTarget.closest('.card');
        extractDataAndSend(cardWrapper, lastContextTarget);
    }
});

// El raspador exacto del HTML de Perchance
function extractDataAndSend(cardWrapper, directTarget) {
    let mediaUrl = null;
    let promptText = "Sin prompt detectado";

    if (cardWrapper) {
        let imgEl = cardWrapper.querySelector('img');
        let hoverEl = cardWrapper.querySelector('.promptHover');
        if (imgEl) mediaUrl = imgEl.src || imgEl.dataset.src;
        if (hoverEl) promptText = hoverEl.innerText || hoverEl.textContent;
    } else {
        mediaUrl = directTarget.src || directTarget.currentSrc;
    }

    if (mediaUrl) {
        chrome.runtime.sendMessage({
            action: "save_media",
            url: mediaUrl,
            prompt: promptText.trim(),
            source: window.location.href
        });
    }
}
