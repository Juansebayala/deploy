let tipoPokemon;

setTimeout(() => {
  eventoTiposPokemones();
}, 3000);

function eventoTiposPokemones() {
  const $tiposPokemones = document.querySelector(".tipos-pokemones");
  $tiposPokemones.onclick = manejarEventoTiposPokemones;
}

function manejarEventoTiposPokemones(e) {
  const $elementoSeleccionado = e.target;
  if (
    $elementoSeleccionado.classList.contains("nav-item") &&
    !$elementoSeleccionado.classList.contains("todos-los-pokemones")
  ) {
    desabilitarTemporalmenteBotonesTipo();
    eliminarTarjetasAnteriores();
    mostrarAnimacionCarga();
    pokemonAMostrar = 1;
    limitePokemonesAMostrar = 20;
    tipoPokemon = $elementoSeleccionado.textContent.toLowerCase();
    ocultarMensajeError();
    obtenerListaPokemones(tipoPokemon);
    mostrarBotonCargarMasPokemonesPorTipo();
    ocultarBotonCargarMasPokemones();
  }
}

function desabilitarTemporalmenteBotonesTipo() {
  const $tiposPokemones = document.querySelector(".tipos-pokemones");
  $tiposPokemones.onclick = null;
  setTimeout(() => {
    $tiposPokemones.onclick = manejarEventoTiposPokemones;
  }, 2500)
}

const $botonCargarMasPokemonesPorTipo = document.querySelector(
  "#cargar-mas-pokemones-por-tipo"
);
$botonCargarMasPokemonesPorTipo.onclick = () => {
  ocultarMensajeError();
  obtenerListaPokemones(tipoPokemon);
};

function obtenerListaPokemones(tipoPokemon) {
  fetch(`https://pokeapi.co/api/v2/type/${tipoPokemon}`)
    .then((respuesta) => {
      if (respuesta.ok) {
        return respuesta.json();
      }
      throw new Error();
    })
    .then((pokemones) => {
      const listaPokemones = pokemones.pokemon;
      mostrarPokemonesPorTipo(listaPokemones);
    })
    .catch(() => {
      mostrarMensajeError();
      ocultarAnimacionCarga();
      eliminarTarjetasAnteriores();
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
        throw new Error();
      })
      .then((pokemon) => {
        crearTarjetaPokemon(pokemon);
      })
      .catch(() => {
        mostrarMensajeError();
        ocultarAnimacionCarga();
        eliminarTarjetasAnteriores();
        pokemonAMostrar = 1;
        limitePokemonesAMostrar = 20;
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
