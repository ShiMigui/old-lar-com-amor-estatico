// Dependências
const arquivo = require("../arquivo");
const path = require("path");
const sass = require("sass");

module.exports = (fName = "") => {
    try {
        const content = sass.compile(path.join(arquivo.dApp, "style", fName), { style: "compressed" }).css;
        arquivo.fCreate(path.join(arquivo.dBuild, "style", fName.replace(".scss", ".css")), content);
        return true;
    }
    catch (error) {
        console.error(`Ocorreu um erro: '${error}'`);
        return false;
    }
}