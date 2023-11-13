function ativarElemento(el, ic = "true") {
    el.setAttribute("ativo", ic.toString());
}

document.querySelectorAll("textarea").forEach(el => {
    el.style.height = 'auto';
    el.style.height = (el.scrollHeight) + "px";
    el.addEventListener("input", function () {
        this.style.height = "auto";
        this.style.height = (this.scrollHeight) + "px";
    })
})

function duasCasas(str = "") { return ("00" + str).slice(-2); }

const currentDate = new Date();

function calcDate(ano = 0, mes = 0, dia = 0) {
    const currentDate = new Date();
    let DAY = currentDate.getDate() + dia;
    let YEAR = currentDate.getFullYear() + ano;
    let MONTH = currentDate.getMonth() + 1 + mes;

    // Ajusta o ano e mês para valores válidos
    YEAR += Math.floor((MONTH - 1) / 12);
    MONTH = ((MONTH - 1) % 12) + 1;

    // Obtém o último dia do mês para a data ajustada
    const ultimoDia = new Date(YEAR, MONTH, 0).getDate();

    // Ajusta o dia para um valor dentro do mês
    if (DAY > ultimoDia) {
        DAY -= ultimoDia;
        MONTH++;

        // Ajusta o mês para valores válidos
        YEAR += Math.floor(MONTH / 13);
        MONTH = (MONTH % 13) || 1;
    }

    return `${YEAR}-${duasCasas(MONTH)}-${duasCasas(DAY)}`;
}

function calcHour(hora = 0, minuto = 0) {
    const currentDate = new Date();
    let HOUR = currentDate.getHours() + hora;
    let MINUTE = currentDate.getMinutes() + minuto;

    HOUR += Math.floor(MINUTE / 60);
    MINUTE %= 60;

    HOUR %= 24;

    return `${duasCasas(HOUR)}:${duasCasas(MINUTE)}`;
}

function showMessage(){
    const message = document.getElementById("message");
    if (!message) return;
    if (message.getAttribute("ativo") === "true") {
        message.classList.add("showMessage");
        setTimeout(() => message.classList.remove("showMessage"), 5000)
    }
}

showMessage();