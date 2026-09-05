chrome.storage.local.get({ library: [] }, (res) => {
let grid = document.getElementById('grid');
res.library.reverse().forEach(img => {
let div = document.createElement('div');
div.style = "background:#222; padding:10px; border-radius:8px;";
div.innerHTML = `
<img src="${img.url}" style="width:100%; border-radius:5px;
cursor:pointer;" onclick="window.open('${img.url}')" title="Clic para
ampliar">
<p style="color:#e74c3c; font-size:12px; margin-bottom:
5px;"><b>Prompt:</b> ${img.prompt}</p>
<button onclick="chrome.downloads.download({url: '${img.url}'})"
style="width:100%; background:#3498db; color:white; border:none; padding:
5px;">Descargar Individual</button>
`;
grid.appendChild(div);
});
});
// Botón Backup
document.getElementById('backup').addEventListener('click', () => {
chrome.storage.local.get({ library: [] }, (res) => {
let blob = new Blob([JSON.stringify(res.library, null, 2)], {type:
"application/json"});
let url = URL.createObjectURL(blob);
chrome.downloads.download({ url: url, filename:
"Backup_Galeria.json" });
});
});
// Descarga en lote
document.getElementById('dlAll').addEventListener('click', () => {
if(confirm("¿Descargar todas las imágenes a tu disco duro de nuevo?")) {
chrome.storage.local.get({ library: [] }, (res) => {
res.library.forEach((img, index) => {
setTimeout(() => chrome.downloads.download({url: img.url}),
index * 300); // 300ms de retraso para no bloquear el navegador
});
});
}
});
