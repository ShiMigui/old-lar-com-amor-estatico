document.querySelectorAll("table").forEach(table => atualizaColoracaoTable(table))

function atualizaColoracaoTable(table=new Element()){
    table.querySelectorAll("tbody tr").forEach((tr, i)=>{
        if(i%2==0) tr.classList.add("dark");
        else tr.classList.remove("dark");
    })
}