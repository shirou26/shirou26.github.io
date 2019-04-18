let lista = document.getElementById("lista");
let botao = document.getElementById("button");
let input = document.getElementById("get");
let tarefas = 0;
let faltam = document.getElementsByTagName("H3")[0];
strike = "";
texte = "<button onclick =" + "clicar()></button> <input type=" + "checkbox" + " onclick=" + "clicar2() class=" + "checar";

faltam.innerText = "Tarefa(s) restante(s): " + tarefas;

botao.addEventListener("click", function() {
    if (input.value != "") {
        let item = document.createElement("LI");
        item.innerHTML = texte + ">" + strike + "       " + input.value;
        console.log(item.innerHTML);
        document.getElementById("lista").appendChild(item);
        input.value = "";
        tarefas++;
        faltam.innerText = "Tarefa(s) restante(s): " + tarefas;
    }
});


function clicar () {
    let filho = event.target.parentNode;
    lista.removeChild(filho);
    console.log(filho);
    if (tarefas > 0) {        
        tarefas --;
    }
    faltam.innerText = "Tarefa(s) restante(s): " + tarefas;
}

function clicar2 () {
    let tmp = event.target.parentNode.innerText;
    console.log(tmp);
    if (event.target.checked) {
        event.target.parentNode.innerHTML = texte + " checked>"   +  "<strike>" + tmp; 
        event.target.checked = true;
        if (tarefas > 0) {        
            tarefas --;
        }
    } else {
        event.target.parentNode.innerHTML = texte + ">" + tmp;
        tarefas ++; 
    }
    faltam.innerText = "Tarefa(s) restante(s): " + tarefas;
}