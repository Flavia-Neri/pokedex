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
    const sectionText = document.createElement("section");
    const sectionImage = document.createElement("section");
    const pId = document.createElement("p");
    sectionPokemonContainer.style.backgroundColor =
      pokemonColors[char.types[0].type.name] || "#c9c9c9";

    const strongName = document.createElement("strong");
    strongName.innerText = char.name;

    const imagePokemon = document.createElement("img");

    imagePokemon.src =
      char.sprites.other["official-artwork"].front_default;

    const pTypeOne = document.createElement("div");
    pTypeOne.innerText = char.types[0].type.name;

    pId.innerText = "#00"+char.id;

    sectionPokemonContainer.style.boxShadow= "0px 5px 20px "+ pokemonColors[char.types[0].type.name] || "#c9c9c9";
    sectionPokemonContainer.classList.add("sectionPokemonContainer");
    sectionText.classList.add("sectionText");
    sectionImage.classList.add("sectionImage");
    pTypeOne.classList.add("typeOne");
    imagePokemon.classList.add("imagePokemon");
    pId.classList.add("pId");

    sectionText.appendChild(strongName);
    sectionText.appendChild(pTypeOne);
    sectionImage.appendChild(pId);
    sectionImage.appendChild(imagePokemon);
    sectionPokemonContainer.appendChild(sectionText);
    sectionPokemonContainer.appendChild(sectionImage);
    
    if(char.types.length > 1)
    {
        const pTypeTwo = document.createElement("div");
        pTypeTwo.innerText = char.types[1].type.name;
        pTypeTwo.classList.add("typeTwo");
        sectionText.appendChild(pTypeTwo);
    }
    main.appendChild(sectionPokemonContainer);
}
function convertToObj(response){
    return response.json();
}
function listPokemons(jsonObj){
    const requests = jsonObj.results.map(pokemon => fetch(pokemon.url));
    Promise.all(requests)
    .then((responses)=> Promise.all(responses.map(r=> r.json())))
    .then((pokemons)=>pokemons.forEach(pokemon=> render(pokemon)));
}
const generations = [151, 251, 386, 493, 649, 721, 809];
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

