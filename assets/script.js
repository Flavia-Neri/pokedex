 const main = document.querySelector("main");
 const button = document.querySelector("button");
 
 const pokemonColors = {
   water:   "#6890f0",
   fire:    "#f08030",
   grass:   "#78c850",
   bug:     "#a8b820",
   normal:  "#a8a878",
   poison:  "#a040a0",
   eletric: "#f8d030",
   ground:  "#e0c068",
   fairy:   "#ee99ac",
   fighting:"#c03028",
   psychic: "#f85888",
   rock:    "#b8a038",
   ghost:   "#705898",
   ice:     "#98d8d8",
   dragon:  "#7038f8"
 };
 
function render(char){

    const sectionPokemonContainer = document.createElement("section");

    sectionPokemonContainer.style.background =
      pokemonColors[char.types[0].type.name] || "#fff";

    const strongName = document.createElement("strong");
    strongName.innerText = char.name;

    const imagePokemon = document.createElement("img");

    imagePokemon.src =
      char.sprites.other["official-artwork"].front_default;

    const pTypeOne = document.createElement("p");
    pTypeOne.innerText = char.types[0].type.name;

    const pTypeTwo = document.createElement("p");
    pTypeTwo.innerText = char.types[1].type.name;

    sectionPokemonContainer.appendChild(imagePokemon);
    sectionPokemonContainer.appendChild(strongName);
    sectionPokemonContainer.appendChild(pTypeOne);
    sectionPokemonContainer.appendChild(pTypeTwo);

    main.appendChild(sectionPokemonContainer);
 
}
function convertToObj(response){
    return response.json();
}
function listPokemons(jsonObj){
    jsonObj.results.forEach(pokemon => {
        fetch(pokemon.url)
        .then(convertToObj)
        .then(render)
    })
}
const generations = [151, 300, 400, 500, 600, 700, 800, 898];
let   counterGeneration = 0;
function startLoad(){
    fetch("https://pokeapi.co/api/v2/pokemon?limit= "+ generations[counterGeneration++] + "&offset=" + (generations[counterGeneration - 2] || 0))
    .then(convertToObj)
    .then(listPokemons)
    .catch((err) => {
        console.error(err);
    });
}

 document.addEventListener("DOMContentLoaded", startLoad);
 button.addEventListener("click", startLoad);

