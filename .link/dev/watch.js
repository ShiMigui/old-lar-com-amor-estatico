const linkage = require("./linkage");
const scss = require("./scss");
const arq = require("../arquivo");
const fs = require("fs");
const path = require("path");
const { ignore } = require("../config.json");

console.log(`Assistindo...`);
fs.watch(arq.app, { recursive: true }, (eventType, file) => {
    if (eventType !== 'change' || !file) return;

    const fPath = path.join(arq.app, file);
    const fRelative = fPath.replace(arq.app, "");
    if (!ignore.includes(fRelative)) {
        console.log(`Compilando: ${fRelative}`);
        if (fRelative.endsWith(".html")) linkage(fRelative);
        else if (fRelative.endsWith(".scss")) scss(fRelative);
        else arq.fCopy(fPath, path.join(arq.build, fRelative));
    }
});