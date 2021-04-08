const main = document.querySelector("main");
const button = document.querySelector("button");
const sectionModal = document.getElementById("modal");
const backBtn = document.getElementById("back");
 
const pokemonColors = {
    water:   "#6890f0",
    fire:    "#f08030",
    grass:   "#78c850",
    bug:     "#a8b820",
    normal:  "#a8a878",
    poison:  "#a040a0",
    electric: "#f8d030",
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
    sectionPokemonContainer.addEventListener("click", function(event){
        modal(event, char);
    });
}
function convertToObj(response){
    return response.json();
}
function listPokemons(jsonObj){
    const requests = jsonObj.results.map(pokemon => fetch(pokemon.url));
    Promise.all(requests)
    .then((responses)=> Promise.all(responses.map(r=> r.json())))
    .then((pokemons)=>pokemons.forEach(pokemon=> render(pokemon)))
    .then(() => {
        button.classList.remove('loading');
        console.log(counterGeneration)
    });
    
}

const generationsIndex = [151, 251, 386, 493, 649, 721, 809, 898];
const generationsQtd = [151, 100, 135, 107, 156, 82, 88, 89];
let   counterGeneration = 0;

function startLoad(){
    button.classList.add('loading');

    fetch("https://pokeapi.co/api/v2/pokemon?limit= "+ generationsQtd[counterGeneration] + "&offset=" + (generationsIndex[counterGeneration - 1] || 0))
    .then(convertToObj)
    .then(listPokemons)
    .then(() => {
        counterGeneration++
        if(counterGeneration >= generationsQtd.length){
            button.classList.add('off');
        }
    })
    .catch((err) => {
        console.error(err);
    });

}

function modal(event,char){
    document.body.style.overflow= 'hidden';

    sectionModal.classList.add("on");

    const background = document.getElementById("bgImage");
    const pokemonImg = document.getElementById("pokemonImg");
    const namePokemon = document.getElementById("namePokemon");
    const idPokemon = document.getElementById("idPokemon");
    const height = document.querySelector('[data-height]');
    const weight = document.querySelector('[data-weight]');
    const divAbilities = document.getElementById('abilities');
    const divType = document.getElementById('divType');
    
    background.src=char.sprites.other["official-artwork"].front_default;
    
    pokemonImg.src=char.sprites.other["official-artwork"].front_default;
    
    namePokemon.innerText = char.name;
    idPokemon.innerText = "#00"+char.id;

    divType.innerHTML = '<h3 class="titleChar">Type:</h3>';

    char.types.forEach(types => {
        const typeElementSec = document.createElement('span');
        typeElementSec.innerText=types.type.name;
        typeElementSec.classList.add("charElement");
        typeElementSec.classList.add("type");
        
        divType.appendChild(typeElementSec);
    });

    height.innerText=(char.height / 10+" m").replace('.', ',');
    weight.innerText=(char.weight/10+" kg");

    divAbilities.innerHTML = '<h3 class="titleChar">Abilities:</h3>'

    char.abilities.forEach(ability=>{
        const newAbility = document.createElement("span");

        newAbility.innerText = ability.ability.name;

        newAbility.classList.add("charElement");
        divAbilities.appendChild(newAbility);

    });
}
function back(){
    document.body.style.overflow= '';
    sectionModal.classList.remove("on");
}
document.addEventListener("DOMContentLoaded", startLoad);
button.addEventListener("click", startLoad);
backBtn.addEventListener("click", back);