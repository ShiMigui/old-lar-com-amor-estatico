const linkage = require("./linkage");
const scss = require("./scss");
const arquivo = require("../arquivo");
const fs = require("fs");
const path = require("path");

module.exports = function (ichtml = false, icscss = false, icothers = false) {
    arquivo.init();

    console.log("Building...");
    if (ichtml) {
        const pages = fs.readdirSync(arquivo.dApp + "/page");
        for (let page of pages) {
            if (page.endsWith(".html")) {
                let ic = linkage(page);
                if (ic) console.log(`Compiled page: ${page}`);
            }
        }
    }

    if (icscss) {
        const dStyle = arquivo.dApp + "/style";
        const styles = fs.readdirSync(dStyle);
        for (let file of styles) {
            if (file.endsWith(".scss")) {
                let ic = scss(file);
                if (ic) console.log(`Compiled style: ${file}`);
            }
            else if (file.endsWith(".css")) {
                let ic = arquivo.fCopy(`${dStyle}/${file}`, `${arquivo.dBuild}/style/${file}`);
                if (ic) console.log(`Copied style: ${file}`);
            }
        }
    }

    if (icothers) {
        const dApp = arquivo.dApp;
        const dBuild = arquivo.dBuild;

        const ignoreFolders = ['page', 'style']; // Adicione qualquer pasta que deseja ignorar

        const copyFilesRecursively = (source, destination) => {
            const files = fs.readdirSync(source);

            for (const file of files) {
                if (file !== "base.html") {
                    const sourcePath = path.join(source, file);
                    const destinationPath = path.join(destination, file);

                    const isDirectory = fs.statSync(sourcePath).isDirectory();

                    if (isDirectory && !ignoreFolders.includes(file)) {
                        fs.mkdirSync(destinationPath, { recursive: true });
                        copyFilesRecursively(sourcePath, destinationPath);
                    } else if (!isDirectory) {
                        arquivo.fCopy(sourcePath, destinationPath);
                        console.log(`Copied: ${path.relative(dApp, sourcePath)}`);
                    }
                }
            }
        };

        copyFilesRecursively(dApp, dBuild);
    }
}