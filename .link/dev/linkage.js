const path = require("path");
const { JSDOM } = require("jsdom");
const arq = require("../arquivo");

const tech_page = 'html';
const ref_page = `./FILENAME.${tech_page}`;
const DOM = new JSDOM();
const document = DOM.window.document;

function TabList(elemento) {
    if (!elemento) return;

    const tabsItens = elemento.querySelectorAll("tab-item");
    tabsItens.forEach(tab => {
        if (!tab.classList.contains('link-processed')) { // Verifica se a classe foi aplicada
            const href = tab.getAttribute("href") || ref_page;
            const newTab = TabItem(tab, href); // Passando o tab e o href para a função TabItem
            if (newTab) {
                elemento.replaceChild(newTab, tab);
                newTab.classList.add('link-processed');
            }
        }
    });
    elemento.classList.add("tab-list-processed");
    return elemento;
};

function TabItem(elemento, href = ref_page) {
    if (!elemento) return;

    const tab = elemento.getAttribute("tab") || "tab";
    elemento.setAttribute("tab", tab);

    let arr = href.split("?");
    let params = new DOM.window.URLSearchParams(arr[1]);
    params.set("tab", tab);

    const link = document.createElement('a');
    link.href = arr[0] + "?" + params.toString();
    link.innerHTML = elemento.innerHTML || "TAB ITEM";

    elemento.innerHTML = ''; // Limpa o conteúdo do elemento
    elemento.appendChild(link);

    return elemento;
};

function linkage(fRelativePath) {
    const fName = path.basename(fRelativePath);

    let domIndex, domPage;
    let docIndex, docPage;

    try {
        domIndex = new JSDOM(arq.fRead(path.join(arq.app, "base.html")));
        domPage = new JSDOM(arq.fRead(path.join(arq.app, fRelativePath)));
    } catch (error) {
        console.error(`Ocorreu um erro: '${error}'`);
        return false;
    }
    docIndex = domIndex.window.document, docPage = domPage.window.document;

    docIndex.querySelectorAll("[link]").forEach(el => LinkElement(el));

    docIndex.querySelectorAll("[link]").forEach(link => {
        link.removeAttribute("link");
        link.removeAttribute("link-processed");
        link.removeAttribute("link-remove");
    });

    docIndex.querySelectorAll("tab-list:not(.tab-list-processed)").forEach(el => {
        let novoElement = TabList(el);
        el.parentNode.replaceChild(novoElement, el);
    })

    let strContent = domIndex.serialize();
    strContent = strContent.replace(/FILENAME/g, fName.replace(`.${tech_page}`, ""));
    return arq.fCreate(path.join(arq.build, fRelativePath), strContent);

    function LinkElement(elemento) {
        if (elemento.getAttribute("link-processed") === "true") return;
        elemento.setAttribute("link-processed", "true");

        let remove = elemento.getAttribute("link-remove") === "true";

        // Caso o elemento não tenha atributo link ou este seja vazio
        if (!elemento.getAttribute("link")) {
            if (remove) elemento.remove();
            return;
        }

        const elPage = docPage.querySelector(elemento.getAttribute("link"));
        // Verificar se existe um elemento na página de conteúdo
        if (elPage == null) {
            if (remove) elemento.remove();
            return;
        }

        remove = elPage.getAttribute('link-remove') ? elPage.getAttribute('link-remove') === "true" : remove;
        if (remove) {
            elemento.remove();
            elPage.remove();
            return;
        }

        elemento.querySelectorAll("[link]").forEach(el => LinkElement(el));

        for (let i = 0; i < elPage.attributes.length; i++) {
            const attribute = elPage.attributes[i];
            elemento.setAttribute(attribute.name, attribute.value);
        }

        elemento.innerHTML += elPage.innerHTML;
        elPage.remove();
    }
}

module.exports = linkage;