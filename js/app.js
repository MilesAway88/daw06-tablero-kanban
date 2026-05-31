import { crearTarea } from "./modelo.js";
import { cargarTareas, guardarTareas, inicializarDatos } from "./storage.js";
import { renderizarTablero, actualizarStats, limpiarFormulario } from "./ui.js";

// ESTADO GLOBAL
let tareas = [];
let tareaEditando = null;

// Referencias a elementos del DOM (luego se cargan cuando el DOM esté listo)
let formulario, botonCrear, campoBusqueda, filtroEstado, filtroPrioridad;

function configurarEventos() {
  // Listener formulario
  formulario.addEventListener("submit", (e) => {
    e.preventDefault();
    //validarFormulario();
  })

  // Listener búsqueda
  campoBusqueda.addEventListener("input", () => {
    // TODO: Filtrar por palabras
  })

  // Listeners filtros
  filtroEstado.addEventListener("change", () => {
    // TODO: Filtrar por estado
  })

  filtroPrioridad.addEventListener("change", () => {
    // TODO: Filtrar por prioridad
  })
}

function validarFormulario() {
  // TODO
}

document.addEventListener("DOMContentLoaded", () => {
  // 1. Obtener elementos DOM
  formulario = document.getElementById("formulario-tarea");
  botonCrear = document.getElementById("boton-crear");
  campoBusqueda = document.getElementById("campo-busqueda");
  filtroEstado = document.getElementById("filtro-estado");
  filtroPrioridad = document.getElementById("filtro-prioridad");

  // 2. Cargar tareas
  tareas = inicializarDatos();
  console.log("App inicializada. Tareas cargadas:", tareas.length);

  // 3. Actualizar stats
  //actualizarStats();

  // 4. Renderizar tablero
  //renderizarTablero();

  // 5. Manejar eventos
  //configurarEventos();
});

