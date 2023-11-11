const inpVacinas = document.getElementById("inpVacinas");
const listVacinas = document.getElementById("listVacinas");
const vacinas = document.getElementById("vacinas-panel");
const msgNoVaccines = vacinas.querySelector(".msg-sem-vacina");
let values = [];

inpVacinas.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
        const vl = this.value;
        const opts = listVacinas.querySelectorAll("option");
        for (let opt of opts) {
            if (opt.value === vl) {
                const cd = opt.getAttribute("cd");
                if (!values.includes(cd)) {
                    values.push(cd);
                    const line = document.createElement("div");
                    line.classList.add("item-list");
                    line.innerHTML = vl;
                    line.setAttribute("cd", cd);

                    const img = document.createElement("img");
                    img.addEventListener("click", deleteItem);
                    img.src = "./img/icons/close.png";
                    img.classList.add("pointer");

                    line.appendChild(img);
                    vacinas.appendChild(line);
                    format();
                    break;
                }
            }
        }
    }
});

function format() {
    let opts = vacinas.querySelectorAll(".item-list");
    msgNoVaccines.hidden = opts.length !== 0;
    opts.forEach((el, i) => {
        if (i % 2 === 1) el.classList.add("dark");
        else el.classList.remove("dark");
    });
}

function deleteItem() {
    const valueToRemove = this.parentNode.getAttribute("cd");
    this.parentNode.remove();

    const index = values.indexOf(valueToRemove);
    if (index !== -1) values.splice(index, 1);
    format();
}
