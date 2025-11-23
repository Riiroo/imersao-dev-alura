let cardContainer = document.querySelector(".card-container");
let campoBusca = document.querySelector("input[type='text']");
let dados = [];

// Função para carregar os dados do JSON ao iniciar a página
async function carregarDados() {
    try {
        let resposta = await fetch("data.json");
        dados = await resposta.json();
        renderizarCards(dados); // Exibe todos os cards inicialmente
    } catch (error) {
        console.error("Erro ao carregar os dados:", error);
    }
}

function iniciarBusca() {
    const termoBusca = campoBusca.value.toLowerCase();

    if (termoBusca.trim() === "") {
        renderizarCards(dados); // Se a busca estiver vazia, mostra todos
        return;
    }

    const resultados = dados.filter(dado => 
        dado.nome.toLowerCase().includes(termoBusca) || 
        dado.descricao.toLowerCase().includes(termoBusca)
    );

    renderizarCards(resultados);
}

function renderizarCards(dados) {
    cardContainer.innerHTML = ""; // Limpa os cards existentes antes de renderizar novos
    for (let dado of dados) {
        let article = document.createElement("article");
        article.classList.add("card");
        article.innerHTML = `
         <h2>${dado.nome}</h2>
                <p><strong>Ano de criação:</strong> ${dado.data_criacao}</p>
                <p>${dado.descricao}</p>
                <a href="${dado.link}" target="_blank">Saiba mais</a>
        `
        cardContainer.appendChild(article);
    
    }
}

// Chama a função para carregar os dados quando o script é executado
carregarDados();