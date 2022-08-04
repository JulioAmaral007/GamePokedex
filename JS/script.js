const pokemonName = document.querySelector('.pokemon__name');
const pokemonNumber = document.querySelector('.pokemon__number');
const pokemonImage = document.querySelector('.pokemon__image');

const form = document.querySelector('.form');
const input = document.querySelector('.input__search');
const buttonPrev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');

let searchPokemon = 1;

/**
 * It takes a pokemon name as an argument, fetches the pokemon's data from the PokeAPI, and returns the
 * data if the request was successful.
 * @param pokemon - The name of the pokemon you want to fetch.
 * @returns The data object.
 */
const fetchPokemon = async (pokemon) => {
  const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

  if (APIResponse.status === 200) {
    const data = await APIResponse.json();
    return data;
  }
}

/**
 * It takes a pokemon name as an argument, fetches the pokemon data from the pokeapi, and then renders
 * the pokemon's name, number, and image to the DOM.
 * @param pokemon - the name of the pokemon
 */
const renderPokemon = async (pokemon) => {

  pokemonName.innerHTML = 'Loading...';
  pokemonNumber.innerHTML = '';

  const data = await fetchPokemon(pokemon);

  if (data) {
    pokemonImage.style.display = 'block';
    pokemonName.innerHTML = data.name;
    pokemonNumber.innerHTML = data.id;
    pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
    input.value = '';
    searchPokemon = data.id;
  } else {
    pokemonImage.style.display = 'none';
    pokemonName.innerHTML = 'Not found :c';
    pokemonNumber.innerHTML = '';
  }
}

/* Preventing the default action of the form from happening. */
form.addEventListener('submit', (event) => {
  event.preventDefault();
  renderPokemon(input.value.toLowerCase());
});

/* Listening for a click event on the buttonPrev element. If the searchPokemon variable is greater than
1, it will subtract 1 from the searchPokemon variable and then call the renderPokemon function with
the new value of searchPokemon. */
buttonPrev.addEventListener('click', () => {
  if (searchPokemon > 1) {
    searchPokemon -= 1;
    renderPokemon(searchPokemon);
  }
});

/* Listening for a click event on the buttonNext element. If the searchPokemon variable is greater than
1, it will subtract 1 from the searchPokemon variable and then call the renderPokemon function with
the new value of searchPokemon. */
buttonNext.addEventListener('click', () => {
  searchPokemon += 1;
  renderPokemon(searchPokemon);
});

/* Calling the renderPokemon function with the value of the searchPokemon variable. */
renderPokemon(searchPokemon);
