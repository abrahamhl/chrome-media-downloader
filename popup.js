let currentTrigger = null;
let isRecording = false;

const recordBox = document.getElementById('recordBox');
const display = document.getElementById('macroDisplay');

// Formatea el objeto para que lo leas bonito en la pantalla
function formatTrigger(t) {
    if (!t) return "Ninguna";
    let parts = [];
    if (t.ctrl) parts.push("Ctrl");
    if (t.shift) parts.push("Shift");
    if (t.alt) parts.push("Alt");

    if (t.type === 'mouse') {
        const btns = {0: "Clic Izquierdo", 1: "Rueda Central", 2: "Clic Derecho", 3: "Atrás", 4: "Adelante"};
        parts.push(btns[t.button] || `Ratón ${t.button}`);
    } else if (t.type === 'key') {
        parts.push(`Tecla [ ${t.key.toUpperCase()} ]`);
    }
    return parts.join(" + ");
}

// Cargar lo que tenías guardado
chrome.storage.local.get(['customTrigger'], (res) => {
    if (res.customTrigger) {
        currentTrigger = res.customTrigger;
        display.innerText = formatTrigger(currentTrigger);
    } else {
        display.innerText = "Shift + Clic Izquierdo (Por defecto)";
    }
});

// Botón: Iniciar Grabación
document.getElementById('btnRecord').addEventListener('click', () => {
    isRecording = true;
    recordBox.innerText = "🔴 ESCUCHANDO... \nMantén pulsado el Shift/Ctrl si quieres, y haz el clic o pulsa la tecla final.";
    recordBox.classList.add('recording');
    recordBox.focus();
});

// Capturar el evento Exacto
function handleInput(e, type) {
    if (!isRecording) return;
    e.preventDefault();
    e.stopPropagation();

    // Ignorar si solo pulsa "Shift" sin nada más. Queremos que pulse "Shift + Algo"
    if (type === 'key' && ['Shift', 'Control', 'Alt', 'Meta'].includes(e.key)) return;

    currentTrigger = {
        type: type,
        button: type === 'mouse' ? e.button : null,
        key: type === 'key' ? e.key.toLowerCase() : null,
        ctrl: e.ctrlKey,
        shift: e.shiftKey,
        alt: e.altKey
    };

    isRecording = false;
    recordBox.innerText = "✅ Combinación capturada.\n¡Dale a Guardar!";
    recordBox.classList.remove('recording');
    display.innerText = formatTrigger(currentTrigger);
}

// Escuchadores de la caja de grabación
recordBox.addEventListener('mousedown', (e) => handleInput(e, 'mouse'));
recordBox.addEventListener('keydown', (e) => handleInput(e, 'key'));
recordBox.addEventListener('contextmenu', e => e.preventDefault()); // Evitar el menú molesto al grabar clic derecho

// Botón: Guardar
document.getElementById('btnSave').addEventListener('click', () => {
    if (!currentTrigger) return alert("Primero graba una combinación.");

    chrome.storage.local.set({ customTrigger: currentTrigger }, () => {
        let btn = document.getElementById('btnSave');
        btn.innerText = "¡Guardado!";
        btn.style.background = "#2ecc71";
        setTimeout(() => {
            btn.innerText = "Guardar";
            btn.style.background = "#e74c3c";
        }, 2000);
    });
});

// Abrir la galería
document.getElementById('openGallery').addEventListener('click', () => {
    chrome.tabs.create({ url: chrome.runtime.getURL("gallery.html") });
});
