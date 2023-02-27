let tipoPokemon;

const $tiposPokemones = document.querySelector(".tipos-pokemones");
$tiposPokemones.onclick = (e) => {
  const $elementoSeleccionado = e.target;
  if (
    $elementoSeleccionado.classList.contains("nav-item") &&
    !$elementoSeleccionado.classList.contains("todos-los-pokemones")
  ) {
    pokemonAMostrar = 1;
    limitePokemonesAMostrar = 20;
    tipoPokemon = $elementoSeleccionado.textContent.toLowerCase();
    eliminarTarjetasAnteriores();
    mostrarAnimacionCarga();
    obtenerListaPokemones(tipoPokemon);
    mostrarBotonCargarMasPokemonesPorTipo();
    ocultarBotonCargarMasPokemones();
  }
};

const $botonCargarMasPokemonesPorTipo = document.querySelector(
  "#cargar-mas-pokemones-por-tipo"
);
$botonCargarMasPokemonesPorTipo.onclick = () => {
  obtenerListaPokemones(tipoPokemon);
};

function obtenerListaPokemones(tipoPokemon) {
  fetch(`https://pokeapi.co/api/v2/type/${tipoPokemon}`)
    .then((respuesta) => {
      if (respuesta.ok) {
        return respuesta.json();
      }
      throw new Error("No se pudo encontrar el Pokemon");
    })
    .then((pokemones) => {
      const listaPokemones = pokemones.pokemon;
      mostrarPokemonesPorTipo(listaPokemones);
    })
    .catch((error) => {
      console.error(error);
    });
}

function mostrarPokemonesPorTipo(listaPokemones) {
  for (
    pokemonAMostrar;
    pokemonAMostrar <= limitePokemonesAMostrar;
    pokemonAMostrar++
  ) {
    const pokemonActual = listaPokemones[pokemonAMostrar - 1];
    if (pokemonActual === undefined) {
      break;
    }
    const nombrePokemon = listaPokemones[pokemonAMostrar - 1].pokemon.name;
    fetch(`https://pokeapi.co/api/v2/pokemon/${nombrePokemon}`)
      .then((respuesta) => {
        if (respuesta.ok) {
          return respuesta.json();
        }
        throw new Error("No se pudo encontrar el Pokemon");
      })
      .then((pokemon) => {
        crearTarjetaPokemon(pokemon);
      })
      .catch((error) => {
        console.error(error);
      });
  }
  limitePokemonesAMostrar += 20;
}

function mostrarBotonCargarMasPokemonesPorTipo() {
  document.querySelector("#cargar-mas-pokemones-por-tipo").classList.remove("oculto");
}

function ocultarBotonCargarMasPokemones() {
  document
    .querySelector("#cargar-mas-pokemones")
    .classList.add("oculto");
}
