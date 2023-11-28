

function addEventsToIcons() {
    document.querySelectorAll(".icon-accept-order").forEach(el => el.removeEventListener("click", AceitarPedido))
    document.querySelectorAll(".icon-refuse-order").forEach(el => el.removeEventListener("click", RecusarPedido))

    document.querySelectorAll(".icon-accept-order").forEach(el => el.addEventListener("click", AceitarPedido))
    document.querySelectorAll(".icon-refuse-order").forEach(el => el.addEventListener("click", RecusarPedido))
}

function AceitarPedido() {
    console.log("Aceitando pedido...");
    const ic = confirm("Você deseja confirmar este pedido?")
    if (ic) console.log("> Permitido");
    else {
        console.error("Pedido não confirmado");
        return;
    }
}

function RecusarPedido() {
    console.log("Cancelando pedido...");
    const ic = confirm("Você deseja cancelar este pedido?")
    if (ic) console.log("> Cancelado");
    else {
        console.error("Pedido não cancelado");
        return;
    }
}

addEventsToIcons()