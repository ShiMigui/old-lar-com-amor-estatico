function ativarElemento(el, ic = "true"){
    el.setAttribute("ativo", ic.toString());
}

document.querySelectorAll("textarea").forEach(el=>{
    el.style.height = 'auto';
    el.style.height = (el.scrollHeight)+"px";
    el.addEventListener("input", function(){
        this.style.height = "auto";
        this.style.height = (this.scrollHeight)+"px";
    })
})