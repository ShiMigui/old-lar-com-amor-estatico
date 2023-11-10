// Dependências
const { encoding, spaceChar, buildDir } = require("./config.json");
const path = require("path");
const fs = require("fs");

// Diretórios principais
const dRoot = path.join(__dirname, "..");
const dBuild = path.join(dRoot, buildDir);
const dApp = path.join(dRoot, "app");

// Funções
function fCopy(fPathOrigin = "", fPathDestin = "") {
    try {
        let fName = path.basename(fPathDestin);
        fs.copyFileSync(fPathOrigin, fPathDestin);
        return true;
    }
    catch (error) {
        console.error(`Ocorreu um erro: '${error}'`);
        return false;
    }
}

function init() {
    let folders = [dBuild, path.join(dBuild, "style"), path.join(dBuild, "script")];
    for (let f of folders) if (!fs.existsSync(f)) fs.mkdirSync(f);
}

function fCreate(fPath = "", fContent = "") {
    try {
        fs.writeFileSync(fPath, fContent, { encoding });
        return true;
    }
    catch (error) {
        console.error(`Ocorreu um erro: '${error}'`);
        return false;
    }
}

function fRead(fPath = "") {
    return fs.readFileSync(fPath, { encoding });
}

function formatName(name = "") { return name.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^\w\s]/gi, '').replace(/ /g, spaceChar); }

module.exports = {
    dApp,
    dBuild,
    init,
    fCopy,
    fRead,
    fCreate,
    formatName
}