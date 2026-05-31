import { agregarTarea, cambiarEstado, editarTarea, eliminarTarea, getTareas, inicializarDatos } from "./crud.js";
import { crearTarea } from "./modelo.js";
import { cargarTareas, guardarTareas } from "./storage.js";
import { renderizarTablero, actualizarStats, limpiarFormulario } from "./ui.js";

let tareaEditando = null;
let formulario, headerFormulario, botonCrear, campoBusqueda, filtroEstado, filtroPrioridad;

function refrescarUI() {
  const tareas = getTareas();

  renderizarTablero(tareas, {
    onEditar: cargarEnFormulario,
    onEliminar: confirmarEliminar,
    onCambiarEstado: cambiarEstado
  });
  
  //actualizarStats(tareas);
}

function configurarEventos() {
  // Listeners formulario
  formulario.addEventListener("submit", (e) => manejarSubmit);
  formulario.addEventListener("reset", (e) => {
    tareaEditando = null;
    headerFormulario.textContent = "Crear Tarea";
    botonCrear.textContent = "Crear tarea";
  });

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

function manejarSubmit(e) {
  e.preventDefault();
  
  const titulo = document.getElementById("titulo").value.trim();
  if (!titulo) {
    alert("El título es obligatorio");
    return;
  }

  const datos = {
    titulo: titulo,
    descripcion: document.getElementById("descripcion").value.trim(),
    prioridad: document.getElementById("prioridad").value,
    fechaVencimiento: document.getElementById("fechaVencimiento").value,
  };

  if (tareaEditando) {
    editarTarea(tareaEditando, datos);
    tareaEditando = null;
    headerFormulario.textContent = "Crear Tarea";
    botonCrear.textContent = "Crear tarea";
  } else {
    const nuevaTarea = crearTarea(titulo, datos.descripcion, datos.prioridad, "pendiente", datos.fechaVencimiento);
    agregarTarea(nuevaTarea);
  }

  limpiarFormulario();
  refrescarUI();
}

function cargarEnFormulario(id) {
  const tareas = getTareas();
  const tarea = tareas.find(t => t.id === id);
  if (!tarea) return;

  document.getElementById("titulo").value = tarea.titulo;
  document.getElementById("descripcion").value = tarea.descripcion;
  document.getElementById("prioridad").value = tarea.prioridad;
  document.getElementById("fechaVencimiento").value = tarea.fechaVencimiento;

  tareaEditando = id;
  headerFormulario.textContent = "Editar Tarea";
  botonCrear.textContent = "Guardar cambios";
  document.getElementById("titulo").focus();
}

function confirmarEliminar(id) {
  if (confirm("¿Eliminar esta tarea?")) {
    eliminarTarea(id);

    if (tareaEditando === id) {
      tareaEditando = null;
      headerFormulario.textContent = "Crear Tarea";
      botonCrear.textContent = "Crear tarea";
      limpiarFormulario();
    }

    refrescarUI();
  }
}

document.addEventListener("DOMContentLoaded", () => {
  // 1. Obtener elementos DOM
  formulario = document.getElementById("formulario-tarea");
  headerFormulario = document.getElementById("header-formulario");
  botonCrear = document.getElementById("boton-crear");
  campoBusqueda = document.getElementById("campo-busqueda");
  filtroEstado = document.getElementById("filtro-estado");
  filtroPrioridad = document.getElementById("filtro-prioridad");

  // 2. Cargar tareas
  inicializarDatos();
  
  // 3. Actualizar tablero
  refrescarUI();

  // 4. Manejar eventos
  configurarEventos();
});

