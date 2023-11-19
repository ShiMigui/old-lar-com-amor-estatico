const { encoding } = require("./config.json");
const path = require("path");
const fs = require("fs");

const root = path.join(__dirname, "..");
const build = path.join(root, "build");
const app = path.join(root, "app");

function dEnsure(filePath) {
    const dirname = path.dirname(filePath);
    if (fs.existsSync(dirname)) return true;
    fs.mkdirSync(dirname, { recursive: true });
}

function fCopy(fPathOrigin = "", fPathDestin = "") {
    try {
        dEnsure(fPathDestin);
        fs.copyFileSync(fPathOrigin, fPathDestin);
        return true;
    }
    catch (error) {
        console.error(`Ocorreu um erro: '${error}'`);
        return false;
    }
}

function fCreate(fPath = "", fContent = "") {
    try {
        dEnsure(fPath);
        fs.writeFileSync(fPath, fContent, { encoding });
        return true;
    }
    catch (error) {
        console.error(`Ocorreu um erro: '${error}'`);
        return false;
    }
}

function buildFolders() {
    let folders = [build, path.join(build, "style"), path.join(build, "script")];
    for (let f of folders) if (!fs.existsSync(f)) fs.mkdirSync(f);
}

function fRead(fPath = "") { return fs.readFileSync(fPath, { encoding }) }

module.exports = {
    buildFolders,
    fCreate,
    fCopy,
    fRead,
    build,
    root,
    app,
}