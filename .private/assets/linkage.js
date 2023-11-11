// Dependências
const fs = require("fs");
const arquivo = require("../arquivo");
const path = require("path");
const { JSDOM } = require("jsdom");

// Atributos
// Link
// Remove
// Processed

// Elementos
// tab-list (params: href)
// tab (params: tab)

module.exports = function linkage(fName = "", retirarAts = false) {

    let domIndex, domPage;
    let docIndex, docPage;

    try {
        domIndex = new JSDOM(arquivo.fRead(path.join(arquivo.dApp, "base.html")));
        domPage = new JSDOM(arquivo.fRead(path.join(arquivo.dApp, "page", fName)));
    } catch (error) {
        console.error(`Ocorreu um erro: '${error}'`);
        return false;
    }

    docIndex = domIndex.window.document, docPage = domPage.window.document

    docIndex.querySelectorAll("[link]:not([link] [link])").forEach(link => carregarElemento(link));

    let tabs = docIndex.querySelectorAll("tab-list");
    for (let list of tabs) carregarTabList(list);

    if (retirarAts) {
        docIndex.querySelectorAll("[link],[processed],[remove]").forEach(link => {
            link.removeAttribute("link");
            link.removeAttribute("processed");
            link.removeAttribute("remove");
        });
    }

    let strContent = domIndex.serialize();
    strContent = strContent.replace(/FILENAME/g, fName.replace(".html", ""));
    return arquivo.fCreate(`${arquivo.dBuild}/${fName}`, strContent);

    function carregarElemento(element) {
        if (!element) return;

        if (element.getAttribute("processed") === "true") return;
        element.setAttribute("processed", "true");

        let remove = element.getAttribute("remove") === "true";

        if (!element.getAttribute("link")) {
            if (remove) element.remove();
            return;
        }

        const elPage = docPage.querySelector(element.getAttribute("link"));
        if (elPage == null) {
            if (remove) element.remove();
            return;
        }

        remove = elPage.getAttribute('remove') ? elPage.getAttribute('remove') === "true" : remove;
        if (remove) {
            element.remove();
            elPage.remove();
            return;
        }

        element.querySelectorAll("[link]").forEach(el => carregarElemento(el));

        for (let i = 0; i < elPage.attributes.length; i++) {
            const attribute = elPage.attributes[i];
            element.setAttribute(attribute.name, attribute.value);
        }

        element.innerHTML = element.innerHTML + elPage.innerHTML;
        elPage.remove();
    }

    function carregarTabList(elementTab) {
        // Verificar se elementTab é um elemento válido
        if (!elementTab) {
            console.error("Invalid elementTab");
            return;
        }

        const tabs = elementTab.querySelectorAll("tab");
        let href = elementTab.getAttribute("href") || './FILENAME.html';

        // Log para rastrear a execução da função
        console.log(`Loaded tabs for element: ${elementTab.id || elementTab.tagName}`);

        for (let tab of tabs) {
            const vl = tab.getAttribute("tab") || tab.id;

            // Verificar se vl está presente
            if (vl) {
                const a = docPage.createElement("a");
                a.href = `${href}?tab=${arquivo.formatName(vl)}`;
                a.innerHTML = tab.innerHTML;
                tab.innerHTML = "";
                tab.appendChild(a);
            }
        }
    }

}