
//---------------------------------------------------------------------------------------------------------------------------------------

class Filtro {
    constructor (classeFiltroCSS, opcoesDoFiltro, tipoDeFiltro, todosOsProdutos) {
        this.classeFiltroCSS = classeFiltroCSS;
        this.opcoesDoFiltro = opcoesDoFiltro;
        this.tipoDeFiltro = tipoDeFiltro;
        this.todosOsProdutos = todosOsProdutos;
        this.listaFiltrosAtivos = [];
        this.roupasSelecionadas = []; 
    }


    finalizarFiltro () {
        let botoesDoFiltro = this.classeFiltroCSS.querySelectorAll("input");
        botoesDoFiltro.forEach(botao =>{
            botao.addEventListener ("click", this.botaoOnOff.bind(this));
        })
    };


    botaoOnOff () { 
        if (this.tipoDeFiltro === "precos") { // se for a faixa de precos a Seleção muda
            this.ajustarSelecaoPreco();
        };
        this.resetarMenuOrdenar();
    }

    ajustarSelecaoPreco () {
        let botaoPrecoAtivado = "ok";
        let botoesPreco = event.target.parentNode.querySelectorAll("input");
        botoesPreco.forEach (botao => {
            botao.checked = false;
        });

    // a classe serve como controle do que está selecionado ou não
        if (event.target.className === botaoPrecoAtivado) {  //Havia um botão selecionado e o usuário quis desmarcá-lo
            event.target.checked = false;
            event.target.className = "";
        }  
        else {
            event.target.checked = true;  // Não havia nada selecionado e o usuário escolheu algo
            botoesPreco.forEach (botao => {
                botao.className = "";
        });
        }
        event.target.className = botaoPrecoAtivado;  //gravar o botão que o usuário acessou para futuras seleções
    }

    resetarMenuOrdenar () {
        let menuOrdenar = document.querySelector('select');
        menuOrdenar.value = document.querySelector('option').value;
        this.listarFiltrosAtivos();
    }
    
    
    listarFiltrosAtivos () {
        removerCatalogoAnterior();
        this.listaFiltrosAtivos = [];
        this.opcoesDoFiltro.forEach (opcao => {
            if (opcao.checked) {
                this.listaFiltrosAtivos.push(opcao.value);
            }
        });

        this.filtragemDeProdutos();
    };

    filtragemDeProdutos () {
        this.roupasSelecionadas = [];
        this.todosOsProdutos.forEach (produto => {
            if (this.tipoDeFiltro === "precos") {
                this.compararFaixaDeValor (produto);
            } else {
            this.compararPorCategoria (produto);
            }
        });
        filtrarProdutos();
    }

    compararFaixaDeValor (produto) {
        let arranjoMaxMin =  String(this.listaFiltrosAtivos).split(',');
        let limiteMinimo = Number(arranjoMaxMin[0]);
        let limiteMaximo = Number(arranjoMaxMin[1]);

        if (limiteMinimo === 500) {
            if (produto[this.tipoDeFiltro] >= limiteMinimo) {
                this.roupasSelecionadas.push(produto);
            }
        } else {
        if (produto[this.tipoDeFiltro] >= limiteMinimo && produto[this.tipoDeFiltro] <= limiteMaximo) {
            this.roupasSelecionadas.push(produto);
            }   
        }
    }

    compararPorCategoria (produto) {
    let produtoVsFiltro = produto[this.tipoDeFiltro].filter (categoria => -1 !== this.listaFiltrosAtivos.indexOf(categoria));
    if (produtoVsFiltro.length > 0) {
        this.roupasSelecionadas.push(produto);
        }
    }

}

//---------------------------------------------------------------------------------------------------------------------------------------

 const pegarDadosJSON = function () {
    fetch('roupas.json')
    .then(function (resposta) {
        if (resposta.ok) {
            resposta.json()
            .then(function (json) {
                inicializarPagina(json);
            })
        } else {
            console.log('erro em obter resposta ' + resposta.status + ': ' + resposta.statusText);
        }
    });
}

pegarDadosJSON();

//---------------------------------------------------------------------------------------------------------------------------------------

const removerCatalogoAnterior = function () {
    let catalogo = document.querySelector('main')
    let sesoesAtivas = catalogo.querySelectorAll("section");
    sesoesAtivas.forEach(sesao => {
        sesao.parentNode.removeChild(sesao);    
    });
}

//---------------------------------------------------------------------------------------------------------------------------------------

const inicializarPagina = function  (json) {
    inicializarPagina.produtos = json;
    inicializarPagina.produtosNoCarrinho = 0;
    inicializarPagina.areaDoCatalogo = document.querySelector('main');
    
    renderizarProdutos (inicializarPagina.produtos);
    criarFiltros(inicializarPagina.produtos);
    filtrarProdutos.finalizarRefinado = json;
    ordenarProdutos ();
}

//---------------------------------------------------------------------------------------------------------------------------------------

const criarFiltros = function (produtos) {

    criarFiltros.filtros = [criarFiltros.filtroCores, criarFiltros.filtroTamanhos, criarFiltros.filtroPrecos];
    nomeFiltros = ["Cores", "Tamanhos", "Precos"];

    for (i = 0; i < criarFiltros.filtros.length; i++) {
        criarFiltros.filtros[i] = new Filtro();
        criarFiltros.filtros[i].todosOsProdutos = produtos;

        criarFiltros.filtros[i].tipoDeFiltro = nomeFiltros[i].toLowerCase();
        criarFiltros.filtros[i].classeFiltroCSS = document.querySelector(`.menu${nomeFiltros[i]}`);

        criarFiltros.filtros[i].opcoesDoFiltro = criarFiltros.filtros[i]
        .classeFiltroCSS.querySelectorAll("input");
        
        criarFiltros.filtros[i].finalizarFiltro();

    }
}

//---------------------------------------------------------------------------------------------------------------------------------------

const filtrarProdutos = function () {
    filtrarProdutos.SelecaoParcial = [];
    qtdFiltrosAtivos = 0;
    filtrarProdutos.finalizarRefinado = [];
    AnalisarFiltrosParciais();
    
    function AnalisarFiltrosParciais () {
    criarFiltros.filtros.forEach (filtro => {
        if (filtro.listaFiltrosAtivos.length > 0) {
            qtdFiltrosAtivos++;
        }
        filtrarProdutos.SelecaoParcial = [...filtrarProdutos.SelecaoParcial, ...filtro.roupasSelecionadas];
    });


    AlgumFiltroSelecionado();
    }
            
    function AlgumFiltroSelecionado () {
        if (qtdFiltrosAtivos === 0) {
            renderizarProdutos (inicializarPagina.produtos);
            filtrarProdutos.finalizarRefinado = inicializarPagina.produtos;
        } else {
            finalizarFinal (filtrarProdutos.SelecaoParcial, qtdFiltrosAtivos);
        }
    
    function finalizarFinal (produtosRepetidos, qtdFiltrosAtivos) {
        FormatarProdutosRepetidos = JSON.stringify(produtosRepetidos);

        ocorrenciasDoProduto = 0;   
        for (produto of inicializarPagina.produtos) { 
            NomeDoProduto = new RegExp(produto.nome, "g");
            ocorrenciasDoProduto = FormatarProdutosRepetidos.match(NomeDoProduto);
            if (ocorrenciasDoProduto instanceof Object) {
                if (ocorrenciasDoProduto.length === qtdFiltrosAtivos) {
                    filtrarProdutos.finalizarRefinado.push(produto); 
                }
            }
            ocorrenciasDoProduto = 0; // resetar ocorrencias
        }
        renderizarProdutos (filtrarProdutos.finalizarRefinado);
        finalizarRefinado = [];
    }
}
}

//--------------------------------------------------------------------------------------------------------------------------------------- 

const renderizarProdutos = function (produtosFinais) {
    let PromisesRenderizarItems = [];
    let displaySemProdutos = inicializarPagina.areaDoCatalogo.querySelector('p');
    renderizarProdutos.numeroDisplayInicial = 6;
    renderizarProdutos.dados = [];
    renderizarProdutos.lista = produtosFinais 

    if (produtosFinais.length === 0) {
        displaySemProdutos.classList.replace('esconder', 'mostrar');
    } else {
        displaySemProdutos.classList.replace('mostrar', 'esconder');
    }

    renderizarProdutos.lista.map(produto => {
        PromisesRenderizarItems.push(fetchBlob(produto));
    });

    renderizarProdutos.finalizar = Promise.all(PromisesRenderizarItems);

    renderizarProdutos.finalizar
    .then(resultado => {
        limitarDisplay(resultado, renderizarProdutos.numeroDisplayInicial);
        renderizarProdutos.dados = resultado;

        if (resultado.length <= renderizarProdutos.numeroDisplayInicial) {
            esconderMenuCarregar();
        } else {
            mostrarMenuCarregar();
        }

        return resultado;
    })
    .then(() => {
        adicionarAoCarrinho();
        carregarMais();
    })

    // pegar dados de imagem etc (fetch)
    function fetchBlob(produto) {
    let url = 'imagens/' + produto.imagem;

    return fetch(url)
        .then((resposta) => {
        return resposta.blob()
        .then(function(blob) {
        let objectURL = URL.createObjectURL(blob);
        return objectURL;
        })
        .then((objectURL) => {
        return criarProdutoHTML(objectURL, produto);
        })
    });  
}

    function criarProdutoHTML(objectURL, produto) {

        criarProdutoHTML.secaoProduto = document.createElement ('section');

        let conteudoDaSesao = {
        imagem: document.createElement ('img'),
        descricao: document.createElement ('p'),
        preco: document.createElement ('p'),
        parcelas:document.createElement ('p'),
        botao: document.createElement ('button'),
        }
    
        conteudoDaSesao.descricao.textContent = produto.nome;
        conteudoDaSesao.preco.textContent = 'R$' + produto.precos.toFixed(2);
        conteudoDaSesao.parcelas.textContent = `até ${produto.parcelas}x de R$${(produto.precos / produto.parcelas).toFixed(2)}`;
        conteudoDaSesao.botao.textContent = produto.comprar;

        conteudoDaSesao.preco.setAttribute("class", "precoNegrito");
        conteudoDaSesao.botao.setAttribute("class", "botaoComprar");
        criarProdutoHTML.secaoProduto.setAttribute('class', produto.nome);

        conteudoDaSesao.imagem.src = objectURL;
        conteudoDaSesao.imagem.alt = produto.nome;
    
        inicializarPagina.areaDoCatalogo.appendChild(criarProdutoHTML.secaoProduto);

        for (let key in conteudoDaSesao) {
            criarProdutoHTML.secaoProduto.appendChild(conteudoDaSesao[key]);
        }  
        return criarProdutoHTML.secaoProduto;
    }

}

//---------------------------------------------------------------------------------------------------------------------------------------

const limitarDisplay =  function (produtos, valorLimite) {
    let i = valorLimite;
    for (i; i < produtos.length; i++) {
        produtos[i].setAttribute('name', 'esconder');
    }
}

//---------------------------------------------------------------------------------------------------------------------------------------

const carregarMais = function () {
    let i = renderizarProdutos.numeroDisplayInicial;
    let produtosDaPagina = renderizarProdutos.dados;
    let botaoCarregar = document.querySelector ('#carregarMais');

    botaoCarregar.addEventListener('click', function () {
        let limite = i * 2;
        for (i; i < limite; i++) {
            if (produtosDaPagina[i] === undefined) {
                esconderMenuCarregar();
                break
            }
            produtosDaPagina[i].removeAttribute('name');
        }
    })
}

//---------------------------------------------------------------------------------------------------------------------------------------

const esconderMenuCarregar = function () {
    let carregarMais = document.querySelector ('#carregarMais');
    carregarMais.classList.replace('mostrar', 'esconder');
}

//---------------------------------------------------------------------------------------------------------------------------------------

const mostrarMenuCarregar = function () {
    let carregarMais = document.querySelector ('#carregarMais');
    carregarMais.classList.replace('esconder', 'mostrar');
}


const adicionarAoCarrinho = function () {
    let botoesCompra = document.querySelectorAll(".botaoComprar");
    let bolsaCompras = document.querySelector('.fa');
    let numeroComprados = bolsaCompras.querySelector('p');
    
    botoesCompra.forEach (botao => {
        botao.addEventListener('click', somarProduto);
    })

    function somarProduto () {
        if (inicializarPagina.produtosNoCarrinho === 0) {
            numeroComprados.setAttribute('class', 'qtdCompras')
        }
        inicializarPagina.produtosNoCarrinho++;
        numeroComprados.textContent = inicializarPagina.produtosNoCarrinho;
    }
}

//---------------------------------------------------------------------------------------------------------------------------------------

const ordenarProdutos = function () {
    let opcoesDeOrdem = document.querySelectorAll("option");
    let produtosParaOrdem;

    opcoesDeOrdem.forEach (opcao => {
        opcao.addEventListener('click', organizar);
    })
    

    function organizar () {
        produtosParaOrdem = filtrarProdutos.finalizarRefinado;
        if (event.target.value === "Menor Preço") {
            removerCatalogoAnterior();
            ordemCrescente();
        } 
        else if (event.target.value === "Maior Preço") {
            removerCatalogoAnterior();
            ordemDecrescente();
        }
    }

    function ordemCrescente () {
        let crescente = preOrdenar();
        renderizarProdutos(crescente);
    }

    function ordemDecrescente () {
        let crescente = preOrdenar();
        renderizarProdutos(crescente.reverse());
    }

    function preOrdenar () {
        let arrayOrdenador = [];
        let resultadoDeOrdenar = [];
        produtosParaOrdem.forEach (produto => {
            arrayOrdenador.push([produto.precos, produto])
        })
        arrayOrdenador.sort(parametroDeOrdenacao);

        arrayOrdenador.forEach (item => {
            resultadoDeOrdenar.push(item[1])
        })
        return resultadoDeOrdenar;
    }

    function parametroDeOrdenacao(a, b) {
        if (a[0] === b[0]) {
            return 0;
        }
        else {
            return (a[0] < b[0]) ? -1 : 1;
        }
    }
}

//---------------------------------------------------------------------------------------------------------------------------------------

const mostrarAlgumasCores = function () {
    let menuCores = document.querySelector('.menuCores');
    let mostrarQuantasOpcoes = 3;
    mostrarAlgumasCores.opcoesMenu = [...menuCores.querySelectorAll('label')];

    mostrarAlgumasCores.esconder = mostrarAlgumasCores.opcoesMenu.filter ((opcaoCor, index) => index > mostrarQuantasOpcoes)
    mostrarAlgumasCores.esconder.map((elemento) => elemento.classList.add('colapsar'))
}

mostrarAlgumasCores();

//---------------------------------------------------------------------------------------------------------------------------------------

const mostrarMaisOuMenosCores = function () {
    let botaoTodasCores = document.getElementById('mostrarMais');
    botaoTodasCores.addEventListener('click', function remover () {
        if (botaoTodasCores.textContent === "Veja todas as cores ") {
            mostrarAlgumasCores.opcoesMenu.map((opcao) => opcao.classList.remove('colapsar'))
            botaoTodasCores.innerHTML = 'Mostrar Menos <i class="fa fa-angle-up" aria-hidden="true"></i>';
        } else {
            mostrarAlgumasCores();
            botaoTodasCores.innerHTML = 'Veja todas as cores <i class="fa fa-angle-down" aria-hidden="true"><i>'
        }
    })
}

mostrarMaisOuMenosCores();
