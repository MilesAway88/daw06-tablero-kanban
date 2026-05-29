let tareas = [];
let tareaEditando = null;

const formulario = document.getElementById("formulario-tarea");
const botonCrear = document.getElementById("boton-crear");
const campoBusqueda = document.getElementById("campo-busqueda");
const filtroEstado = document.getElementById("filtro-estado");
const filtroPrioridad = document.getElementById("filtro-prioridad");

document.addEventListener("DOMContentLoaded", () => {
  // TODO: Cargar tareas

  // TODO: Pintar tablero

  // Listener formulario
  formulario.addEventListener("submit", (e) => {
    e.preventDefault();

    // TODO: Validar y crear/editar
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
});