//Construtor de Menus------------------------------------------------------------------------------------------------------------------

class Menu {
    constructor (tipoDeMenu, classeMenuCSS, opcoesDoMenu) {
        this.classeMenuCSS = classeMenuCSS;
        this.opcoesDoMenu = opcoesDoMenu;
        this.tipoDeMenu = tipoDeMenu;
        this.faixaDePrecos = [];
        this.mostrarQuantosItems = 0;
    }
    definirMenu () {
            this.criarMenuSelecao();
    }
    criarMenuSelecao () { 
        this.opcoesDoMenu.forEach(opcao => {
            let criarInput = document.createElement ("input");
            if (this.tipoDeMenu === "radio") {
                criarInput.setAttribute('type', "radio");
            } else {
            criarInput.setAttribute('type', "checkbox");
            }
            criarInput.setAttribute('class', '');
            console.log(this.tipoDeMenu);

            if (this.tipoDeMenu === "radio") {
                let indicePreco = this.opcoesDoMenu.indexOf(opcao);
                this.limiteDosPrecos(criarInput, indicePreco);                    
            } else {
                criarInput.setAttribute('value', opcao);
            }
    
            let textoDaOpcao = document.createElement ("label");
            textoDaOpcao.setAttribute('for', criarInput.value);
            textoDaOpcao.setAttribute('class', `_${criarInput.value}`);
            criarInput.setAttribute('id', criarInput.value);
            
            if (this.tipoDeMenu !== "button") {
                textoDaOpcao.textContent = opcao;
            }
            /*
            if(this.tipoDeMenu === "checkbox" && this.classeMenuCSS.querySelectorAll('input').length >= 4) {
                textoDaOpcao.setAttribute('class', 'esconder');
            } else if (this.tipoDeMenu === "checkbox" && this.classeMenuCSS.querySelectorAll('input').length <= 4) {
                textoDaOpcao.setAttribute('class', 'mostrar');
            }
            */

                let inserirMenuHTML = [criarInput, textoDaOpcao];
                    inserirMenuHTML.forEach(opcao => {
                        this.classeMenuCSS.appendChild(opcao);
                });

            
        });
    }
    limiteDosPrecos (inputPreco, indice) {
            inputPreco.setAttribute('value', [this.faixaDePrecos.minimo[indice], this.faixaDePrecos.maximo[indice]]);
    }
    }

//Menu cores------------------------------------------------------------------------------------------------------------------

const menuCores = new Menu();
menuCores.classeMenuCSS = document.querySelector(".menuCores");
menuCores.opcoesDoMenu =  ["amarelo", "azul", "branco", "cinza", "laranja", "vermelho", "preto", "verde","diamante"];
menuCores.tipoDeMenu = "checkbox";
menuCores.definirMenu();

//Menu Preços------------------------------------------------------------------------------------------------------------------

const menuPrecos = new Menu();
menuPrecos.classeMenuCSS = document.querySelector(".menuPrecos");
menuPrecos.faixaDePrecos = {
    minimo: [0, 51, 151, 301, 500],
    maximo: [50, 150, 300, 500, "max"],
}

menuPrecos.opcoesDoMenu = [];
for (let i = 0; i < menuPrecos.faixaDePrecos.maximo.length; i++) {
    if ( menuPrecos.faixaDePrecos.maximo[i] === "max") {
        menuPrecos.opcoesDoMenu.push(`a partir de R$${menuPrecos.faixaDePrecos.minimo[i]}`);
    } else{ 
    menuPrecos.opcoesDoMenu.push(`de R$${menuPrecos.faixaDePrecos.minimo[i]} até  R$${menuPrecos.faixaDePrecos.maximo[i]}`)
}
}
menuPrecos.tipoDeMenu = "radio";
menuPrecos.definirMenu();

//Menu Tamanhos------------------------------------------------------------------------------------------------------------------

const menuTamanhos = new Menu();
menuTamanhos.classeMenuCSS = document.querySelector(".menuTamanhos");
menuTamanhos.opcoesDoMenu = ["PP","P", "M", "G", "GG", "U", 36, 38, 40, 42, 44, 46];
menuTamanhos.tipoDeMenu = "button";
menuTamanhos.definirMenu();
