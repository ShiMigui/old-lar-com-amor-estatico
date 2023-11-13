const addPix = document.getElementById("add-pix");
const listPix = document.getElementById("list-pix");

const objTipoPix = {
    0: "Selecione",
    1: "CNPJ",
    2: "CPF",
    3: "Email",
    4: "TEL"
};

if (addPix) {
    addPix.addEventListener("click", () => {
        limparListPix();
        let select = document.createElement("select");
        for (let i in objTipoPix) {
            let opt = document.createElement("option");
            opt.innerText = objTipoPix[i];
            opt.value = i;
            select.appendChild(opt);
        }
        select.classList.add("input-line-25");

        let inp = document.createElement("input");
        inp.type = "text";
        inp.classList.add("input-line-75");

        let line = document.createElement("div");
        line.classList.add("input-line");
        line.appendChild(select);
        line.appendChild(inp);

        listPix.appendChild(line);
    })
}

function limparListPix() {
    const lines = listPix.querySelectorAll(".input-line");
    lines.forEach(el => {
        let inp = el.querySelector("input");
        if (inp.value.trim() == "") el.remove();
    })
}

