let lista = document.getElementById("lista");


let botao = document.getElementById("button");
let input = document.getElementById("get");

botao.addEventListener("click", function() {
    if (input.value != "") {
        let item = document.createElement("LI");
        item.innerHTML = "<button onclick =" + "clicar()>x</button>" + input.value;
        console.log(item.innerHTML);
        document.getElementById("lista").appendChild(item);
        input.value = "";
    }
});


function clicar () {
    let filho = event.target.parentNode;
    lista.removeChild(filho);
    console.log(filho);
}