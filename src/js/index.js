mostrarAnimacionCarga();

const $nodoPokemones = document.querySelector("#pokemones");

let pokemonAMostrar = 1;
let limitePokemonesAMostrar = 20;

const $pagina = document.querySelector("body");
$pagina.onload = () => {
  desabilitarTemporalmenteBotonTodos();
  desabilitarTemporalmenteBotonesTipo();
  mostrarPokemones();
  limitePokemonesAMostrar += 20;
  mostrarBotonCargarMasPokemones();
};

const $botonTodosLosPokemones = document.querySelector(".todos-los-pokemones");
$botonTodosLosPokemones.onclick = manejarEventoTodosLosPokemones;

function manejarEventoTodosLosPokemones() {
  desabilitarTemporalmenteBotonTodos();
  ocultarMensajeError();
  eliminarTarjetasAnteriores();
  mostrarAnimacionCarga();
  pokemonAMostrar = 1;
  limitePokemonesAMostrar = 20;
  mostrarPokemones();
  limitePokemonesAMostrar += 20;
  ocultarBotonCargarMasPokemonesPorTipo();
  mostrarBotonCargarMasPokemones();
}

function desabilitarTemporalmenteBotonTodos() {
  $botonTodosLosPokemones.onclick = null;
  setTimeout(() => {
    $botonTodosLosPokemones.onclick = manejarEventoTodosLosPokemones;
  }, 2500)
}

const $botonCargarMasPokemones = document.querySelector(
  "#cargar-mas-pokemones"
);
$botonCargarMasPokemones.onclick = () => {
  ocultarMensajeError();
  mostrarAnimacionCarga();
  mostrarPokemones();
  limitePokemonesAMostrar += 20;
};

function mostrarPokemones() {
  const LIMITE_POKEMONES_POR_DEFAULT = 1009;
  for (
    pokemonAMostrar;
    pokemonAMostrar <= limitePokemonesAMostrar;
    pokemonAMostrar++
  ) {
    if (pokemonAMostrar === LIMITE_POKEMONES_POR_DEFAULT) {
      break;
    }
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonAMostrar}`)
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
}

function eliminarTarjetasAnteriores() {
  const $pokemones = document.querySelectorAll(".tarjeta");
  $pokemones.forEach(($pokemon) => {
    $pokemon.remove();
  });
}

function crearTarjetaPokemon(pokemon) {
  ocultarAnimacionCarga();
  const $tarjetaPokemon = document.createElement("div");
  $tarjetaPokemon.classList.add("tarjeta");
  agregarColorFondoTarjeta($tarjetaPokemon, pokemon);
  agregarImagenPokemon($tarjetaPokemon, pokemon);
  agregarNombrePokemon($tarjetaPokemon, pokemon);
  agregarBotonMasInformacion($tarjetaPokemon);
  $nodoPokemones.appendChild($tarjetaPokemon);
}

function agregarColorFondoTarjeta(tarjeta, pokemon) {
  const clasificacionesPokemon = Object.values(pokemon.types);
  const tipoPrincipalPokemon = clasificacionesPokemon[0].type.name;
  tarjeta.classList.add(`type-${tipoPrincipalPokemon}`);
}

function agregarImagenPokemon(tarjeta, pokemon) {
  const $imagenPokemon = document.createElement("img");
  const imagenPokemon = pokemon.sprites.other["official-artwork"].front_default;
  $imagenPokemon.src = imagenPokemon;
  $imagenPokemon.classList.add("imagen-pokemon");
  tarjeta.appendChild($imagenPokemon);
}

function agregarNombrePokemon(tarjeta, pokemon) {
  const nombrePokemon = document.createElement("p");
  nombrePokemon.textContent = pokemon.name;
  nombrePokemon.classList.add("nombre-pokemon");
  tarjeta.appendChild(nombrePokemon);
}

function agregarBotonMasInformacion(tarjeta) {
  const $botonInformacion = document.createElement("button");
  $botonInformacion.classList.add("btn", "btn-light", "mas-informacion");
  $botonInformacion.textContent = "M??s informaci??n";
  tarjeta.appendChild($botonInformacion);
}

function mostrarBotonCargarMasPokemones() {
  document.querySelector("#cargar-mas-pokemones").classList.remove("oculto");
}

function ocultarBotonCargarMasPokemonesPorTipo() {
  document
    .querySelector("#cargar-mas-pokemones-por-tipo")
    .classList.add("oculto");
}

function mostrarAnimacionCarga() {
  document.querySelector("#animacion-cargando").classList.remove("invisible");
}

function ocultarAnimacionCarga() {
  document.querySelector("#animacion-cargando").classList.add("invisible");
}

function mostrarMensajeError() {
  document.querySelector('#mensaje-error').classList.remove('oculto');
}

function ocultarMensajeError() {
  document.querySelector('#mensaje-error').classList.add('oculto');
}
