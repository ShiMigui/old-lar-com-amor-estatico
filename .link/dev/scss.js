const path = require("path");
const sass = require("sass");
const arq = require("../arquivo");

module.exports = (fRelativePath) => {
    try {
        const content = sass.compile(path.join(arq.app, fRelativePath), { style: "compressed" }).css;
        arq.fCreate(path.join(arq.build, fRelativePath.replace(".scss", ".css")), content);
        return true;
    }
    catch (error) {
        console.error(`Ocorreu um erro: '${error}'`);
        return false;
    }
}