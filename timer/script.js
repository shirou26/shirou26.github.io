let numeros = /[0-9]+/;
let input = document.querySelectorAll("input");
let play = document.getElementsByClassName("fa-play-circle");
let btn = document.getElementsByTagName("button");
let clock = document.getElementsByTagName("span");
let bordas = document.getElementsByClassName("relogio");
let horario = document.getElementsByClassName("horario");
let replay = document.getElementsByClassName("fa-history");
const C4 = new Audio("sounds/Temple Bell Huge-SoundBible.com-695883450.mp3");



const playSound = audio => {
    const clone = audio.cloneNode();
    clone.play();
    setTimeout(() => (clone.volume = 0.8), 2500);
  };


btn[0].disabled = true;

window.addEventListener ('load', function () {
    btn[0].classList.toggle("fa-play-circle");
});


btn[0].addEventListener ('click', function troca() {
    btn[0].classList.toggle("fa-play-circle");
    btn[0].classList.toggle("fa-pause-circle");
});

input.forEach (function (item) {
    item.addEventListener('keyup', function () {
        if (this.value.match(numeros) == null || this.value < 0) {
            this.value = "";
        }
        if (Number(this.value) > 59) {
            this.value = 59;
        }
        if (item.value != 0) {
            btn[0].disabled = false;
        } else {
            btn[0].disabled = true;
        }
    });
})

btn[0].addEventListener('click', function () {
    verificar();
    if (btn[0].classList.contains("fa-pause-circle")) {
        horario[0].style.visibility = "hidden";
        contador = setInterval(function regressivo () {
        relogio();
        if (input[2].value > 0) {
            input[2].value--;
        } else {
            if (input[1].value > 0) {
                input[1].value--;
                input[2].value = 59;
            } else {
                if (input[0].value > 0) {
                    input[0].value--;
                    input[1].value = 59;
                    input[2].value = 59;
                } else {
                    clearInterval(contador);
                }
            }
        }    
    }, 1000);
}
});


btn[0].addEventListener('click', function () {
    if (btn[0].classList.contains("fa-play-circle")) {
        clearInterval(contador);
}
});


function verificar () {
    input.forEach (function (item) {
        if (item.value == "") {
            item.value = 0;
        }
    });
}


function relogio () {
    let store = ["","",""];
    let i = 0;
    input.forEach (function (item) {
        if (item.value < 10) {
            store[i] = "0" + item.value;
        } else {
            store[i] = item.value;
        }
        i++;
    });
    clock[0].textContent = store[0] + " : " + store[1] + " : "; 
    clock[1].textContent = store[2];
    console.log(bordas[0].style.visiblity);
    bordas[0].style.visibility = "visible";
    replay[0].style.visibility = "visible";
    console.log(clock[0].textContent);
    console.log(clock[1].textContent);
    if (clock[0].textContent == "00 : 00 : " && clock[1].textContent == "00") {
        playSound(C4);
            btn[0].disabled = true;
            music = setInterval (function () {
                playSound(C4);
            }, 2500);
        }
    }


replay[0].addEventListener ('click', function () {
    input.forEach (function (item) { 
        item.value = undefined;
    });
    horario[0].style.visibility = "visible";
    bordas[0].style.visibility = "hidden";
    if (btn[0].classList.contains("fa-pause-circle")) {
        btn[0].classList.toggle("fa-play-circle");
        btn[0].classList.toggle("fa-pause-circle");
    }
    clearInterval(contador);
    btn[0].disabled = true;
    C4.pause();
    C4.currentTime = 0;
    C4.muted = true;
    C4.currentTime = 0;
    clearInterval(music);
});