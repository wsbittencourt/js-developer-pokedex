const pokemonList = document.getElementById('pokemonList');
const loadMoreButton = document.getElementById('loadMoreButton');
const pokeList = document.getElementById("pokemonList");
const content = document.getElementsByClassName("content");
const details = document.getElementById("details");

const maxRecords = 151;
const limit = 10;
let offset = 0;

function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <img src="${pokemon.photo}"
                     alt="${pokemon.name}">
            </div>
        </li>
    `
}

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
    })
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})

const updateDetails = (id) => {
    pokeApi.getPokemon(id)
        .then(res => {
            details.innerHTML = `
                <div class="details-content ${res.type}">
                    <div id="header">
                        <button id="backBtn" type="button">
                            <&ensp;Voltar
                        </button>
                        <div id="header-info">
                            <div id="column">
                                <div class="name">${res.name}</div>
                                <div class="details-types">
                                    ${res.types.map((type) => `<div class="type">${type}</div>`).join('')}
                                </div>
                            </div>
                            <div class="details-number">#${res.number}</div>
                        </div>
                    </div>
                    <div id="footer">
                        <div id="img-row">
                            <img src="${res.photo}" id="sprite">
                        </div>
                        <div id="tab">Sobre</div>
                        <div id="details-grid">
                            <div class="label">nome</div>
                            <div id="detail-name">${res.name}</div>
                            <div class="label">altura</div>
                            <div id="height">${res.height}m</div>
                            <div class="label">peso</div>
                            <div id="wieght">${res.weight}</div>
                            <div class="label">habilidades</div>
                            <div id="abilities">${res.abilities}</div>
                        </div>
                    </div>
                </div>
            `;
            const backBtn = document.getElementById("backBtn");

            backBtn.addEventListener("click", () => {
                content[0].classList.remove("hide");
                details.classList.add("hide");
            });
        });
}

pokeList.addEventListener("click", (event) => {
  if (event.target.closest(".pokemon")) {
    const pokemonId = event.target.closest(".pokemon").querySelector(".number").textContent.substring(1);
    updateDetails(pokemonId);
    details.classList.remove("hide");
    content[0].classList.add("hide");
  }
});