import { agregarTarea, cambiarEstado, editarTarea, eliminarTarea, getTareas, getTareasFiltradas, inicializarDatos } from "./crud.js";
import { crearTarea } from "./modelo.js";
import { cargarTareas, guardarTareas } from "./storage.js";
import { renderizarTablero, actualizarStats, limpiarFormulario } from "./ui.js";

let tareaEditando = null;
let formulario, headerFormulario, botonCrear, campoBusqueda, filtroEstado, filtroPrioridad;

function refrescarUI() {
  const filtros = {
    busqueda: campoBusqueda.value.trim(),
    estado: filtroEstado.value,
    prioridad: filtroPrioridad.value
  };

  const tareas = getTareasFiltradas(getTareas(), filtros);

  renderizarTablero(tareas, {
    onEditar: cargarEnFormulario,
    onEliminar: confirmarEliminar,
    onCambiarEstado: cambiarEstado
  });
  
  actualizarStats(tareas);
}

function configurarEventos() {
  // Listeners formulario
  formulario.addEventListener("submit", manejarSubmit);
  formulario.addEventListener("reset", () => {
    tareaEditando = null;
    headerFormulario.textContent = "Crear Tarea";
    botonCrear.textContent = "Crear tarea";
  });

  // Listeners filtros
  campoBusqueda.addEventListener("input", refrescarUI);
  filtroEstado.addEventListener("change", refrescarUI);
  filtroPrioridad.addEventListener("change", refrescarUI);
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
    estado: document.getElementById("estado").value,
    fechaVencimiento: document.getElementById("fechaVencimiento").value,
  };

  if (tareaEditando) {
    editarTarea(tareaEditando, datos);
    tareaEditando = null;
    headerFormulario.textContent = "Crear Tarea";
    botonCrear.textContent = "Crear tarea";
  } else {
    const nuevaTarea = crearTarea(titulo, datos.descripcion, datos.prioridad, datos.estado, datos.fechaVencimiento);
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
  document.getElementById("estado").value = tarea.estado;
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

