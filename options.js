let combo = { button: 0, ctrl: false, shift: true, alt: false, meta: false }; // Shift + Clic izquierdo por defecto

const recordArea = document.getElementById('recordArea');
const currentDisplay = document.getElementById('currentDisplay');
const saveBtn = document.getElementById('saveBtn');

// Nombres de los botones del ratón
const mouseButtons = { 0: "Clic Izquierdo", 1: "Rueda Central", 2: "Clic Derecho", 3: "Botón Lateral Atrás", 4: "Botón Lateral Adelante" };

// Función para mostrar visualmente la combinación
function updateDisplay(c) {
    let parts = [];
    if (c.ctrl) parts.push("Ctrl");
    if (c.shift) parts.push("Shift");
    if (c.alt) parts.push("Alt");
    if (c.meta) parts.push("Win/Cmd");
    parts.push(mouseButtons[c.button] || `Botón ${c.button}`);
    currentDisplay.innerText = parts.join(" + ");
}

// Cargar la combinación guardada al abrir la página
chrome.storage.local.get(['customCombo'], (res) => {
    if (res.customCombo) combo = res.customCombo;
    updateDisplay(combo);
});

// Grabadora de eventos en el recuadro
recordArea.addEventListener('mousedown', (e) => {
    e.preventDefault(); // Evitar que seleccione texto o abra menús

    combo = {
        button: e.button,
        ctrl: e.ctrlKey,
        shift: e.shiftKey,
        alt: e.altKey,
        meta: e.metaKey
    };

    updateDisplay(combo);
    recordArea.innerText = "¡Capturado! Pulsa Guardar.";
    recordArea.style.borderColor = "#2ecc71";
});

// Prevenir el menú contextual estándar dentro del área de grabación si se usa clic derecho
recordArea.addEventListener('contextmenu', e => e.preventDefault());

// Guardar en la base de datos de la extensión
saveBtn.addEventListener('click', () => {
    chrome.storage.local.set({ customCombo: combo }, () => {
        alert("Combinación guardada correctamente.\nRecarga la pestaña de Perchance para que haga efecto.");
        recordArea.innerText = "Haz clic en este recuadro usando la combinación de teclas + botón del ratón que quieras grabar.";
        recordArea.style.borderColor = "#e74c3c";
    });
});
