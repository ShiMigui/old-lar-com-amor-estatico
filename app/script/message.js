const message = document.getElementById("message");
if (message != null) {
    mostrarMessage();
}

function mostrarMessage(){
    let ativo = message.hasAttribute("ativo");
    if(ativo){
        message.style.right="10px";
        setTimeout(() => message.style.right="-100%", 5000);
    }
}