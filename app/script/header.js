const menu = document.getElementById("menu-hamburguer");
const nav = document.querySelector("nav");

if (menu != null) menu.addEventListener("click", () => {
    let ic = !(menu.getAttribute("ativo") == "true");
    ativarElemento(menu, ic);
    ativarElemento(nav, ic);
})

const arrowDown = document.getElementById("arrow-down");
if (arrowDown != null) {
    arrowDown.addEventListener("click", () => {
        let ic = !(arrowDown.getAttribute("ativo") == "true");
        ativarElemento(arrowDown, ic);
    })
}