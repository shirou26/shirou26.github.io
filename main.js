/*setInterval(function(){ alert("Hello"); }, 3000);

var myVar = setInterval(myTimer, 1000);

function myTimer() {
  var d = new Date();
  var t = d.toLocaleTimeString();
  document.getElementById("demo").innerHTML = t;
}

function myStopFunction() {
  clearInterval(myVar);
}*/
var recha = document.getElementsByTagName("H3")[0];
var fundo = document.getElementsByTagName("BODY")[0];
var porcenta = document.getElementById("para");
var carga = document.getElementById("carga");
var largura = carga.style.width;
var desligar = 1;
var trocar = 0;
var atual = 0;

function recarga() {
    console.log(carga);
    carga.style.width = "100%";
    porcenta.innerHTML = "100%";
    trocar = 1;
    }



function off() {
    desligar = 1;
    document.getElementById("liga").style.backgroundColor = "white";
    document.getElementById("desliga").style.backgroundColor = "yellow";
    fundo.style.backgroundColor = "black";
    recha.style.color = "white";
}

function on() {
    desligar = 0;
    document.getElementById("liga").style.backgroundColor = "yellow";
    document.getElementById("desliga").style.backgroundColor = "white";
    energia(atual);
    fundo.style.backgroundColor = "white";
    recha.style.color = "black";
}


function energia (valor) {
    var interval =
    setInterval (function() {
        if (trocar == 1) {
            clearInterval(interval);
            valor = 100;
            trocar = 0;
            energia(valor);
        }
        if (desligar == 1) {
            valor ++;
            clearInterval(interval);
            atual = valor;
        }
        if (valor == 1) {
            clearInterval(interval);
            fundo.style.backgroundColor = "black";
            recha.style.color = "white";
        }
        valor --;
        carga.style.width = valor + "%";
        porcenta.innerHTML = valor + "%";
        console.log(carga.style.width);
    }, 1000);

    }

energia(100);





