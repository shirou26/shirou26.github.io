var recha = document.getElementById("recharge");
var ativa = document.getElementById("liga");
var largura = recha.offsetHeight;
var status = 0;
var estilo = recha.style.height;


let minireco = liga.addEventListener('click', function () {
    if (largura >= 20) {
        let retrai = setInterval(function () {
            if (largura > 0) {
                largura -= 7;
                recha.style.height = largura + "px";
            } else {
                clearInterval(retrai);
            }
        }, 1);
        console.log(largura);
        } else {
            let expande = setInterval(function () {
                if (largura < 250) {
                    largura += 7;
                    recha.style.height = largura + "px";
                } else {
                    clearInterval(expande);
                }
            }, 1);
        }
});

