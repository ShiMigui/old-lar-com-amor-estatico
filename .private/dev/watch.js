const build = require("../assets/build");
const linkage = require("../assets/linkage");
const scss = require("../assets/scss");
const arquivo = require("../arquivo");
const dApp = arquivo.dApp;
const fs = require('fs');
const path = require('path');

build(true, true, true);

function processFile(file) {
    const filePath = path.join(dApp, file);
    const relativePath = path.relative(dApp, filePath);

    // Ignora o arquivo base.html
    if (file === 'base.html') {
        build(true);
        return;
    }

    const extension = path.extname(file);
    const fileName = path.basename(file);

    // Obtém o diretório do arquivo
    const fileDirectory = path.dirname(file);

    if (fileDirectory.startsWith("page") || fileDirectory.startsWith("style")) return;
    else {
        // Para outros tipos de arquivos ou pastas diferentes, apenas copie
        const destPath = path.join(arquivo.dBuild, relativePath);
        let ic = arquivo.fCopy(filePath, destPath);
        if (ic) console.log(`Copied: ${relativePath}`);
    }
}

console.log("Observando mudanças em: 'app'");

fs.watch(dApp+"/page", (evento, name)=>{
    if(evento==="change") if(name.endsWith(".html")) {
        let ic = linkage(name);
        if (ic) console.log(`Compiled page: ${name}`);
    }
});

fs.watch(dApp+"/style", (evento, name)=>{
    if(evento==="change") if(name.endsWith(".scss")) {
        let ic = scss(name);
        if (ic) console.log(`Compiled style: ${name}`);
    }
});

fs.watch(dApp, { recursive: true }, (eventType, filename) => {
    if (eventType === 'change') {
        processFile(filename);
    }
});