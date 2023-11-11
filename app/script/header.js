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

const pesquisa =document.getElementById("pesquisa");
if(pesquisa !=null){
    const inp = pesquisa.querySelector("input[type=text]");
    const btn = pesquisa.querySelector("input[type=image]");
    btn.addEventListener("click", (e)=>{
        e.preventDefault();
        if(inp.value) window.location = `./reposta.html?txt=${inp.value}`;
    })
}