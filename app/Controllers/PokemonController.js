import PokemonService from "../Services/PokemonService.js";
import store from "../store.js";

//Private
function _draw() {
  let wildPokemon = store.State.wildPokemon;
  let template = ''
  wildPokemon.forEach(pokemon => {
    template += `<button class="btn btn-primary btn-block m-2 text-capitalize col-2" onclick="app.pokemonController.getDetails('${pokemon.name}')">${pokemon.name}</button>`
  })
  document.getElementById("wild-pokemon").innerHTML = template
  console.log(wildPokemon);
}

function _drawDetails() {
  document.getElementById("pokemon-details").innerHTML = store.State.activePokemon.Template
  console.log(store.State)
}

function _drawMyPokemon() {
  console.log("from draw my pokemon", store.State.myPokemon)
  let myPokemon = store.State.myPokemon
  let template = ''
  myPokemon.forEach(pokemon => template += pokemon.Template)
  document.getElementById('my-pokemon').innerHTML = template
}

//Public
export default class PokemonController {
  constructor() {
    store.subscribe("wildPokemon", _draw);
    store.subscribe("activePokemon", _drawDetails)
    store.subscribe('myPokemon', _drawMyPokemon)
  }

  getDetails(pokemonName) {
    PokemonService.getDetails(pokemonName)
  }

  //NOTE doesnt take anything in because our service already knows the active pokemon
  catchActivePokemon() {
    PokemonService.catchActivePokemon()
  }

}
