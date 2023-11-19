const linkage = require("./linkage");
const scss = require("./scss");
const arq = require("../arquivo");
const fs = require("fs");
const path = require("path");
const { ignore } = require("../config.json");

console.log(`Criando build...`);
function readDir(dir) {
    const files = fs.readdirSync(dir);
    files.forEach(file => {
        const fPath = path.join(dir, file);
        const fRelative = fPath.replace(arq.app, "");

        if (!ignore.includes(fRelative)) {
            if (fs.statSync(fPath).isDirectory()) readDir(fPath);
            else {
                console.log(`Compilando: ${fRelative}`);
                if (file.endsWith(".html")) linkage(fRelative);
                else if (file.endsWith(".scss")) scss(fRelative);
                else arq.fCopy(fPath, path.join(arq.build, fRelative));
            }
        }
    })
}

readDir(arq.app);