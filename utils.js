export function cleanTitle(prompt) {
    if (!prompt || prompt.includes("Sin prompt")) return `Img_${Date.now()}`;
    let words = prompt.replace(/[^a-zA-Z0-9 ]/g, '').trim().split(' ');
    let shortName = words.slice(0, 5).join('-');
    return `${shortName}_${Math.floor(Math.random() * 1000)}`;
}
