import { getDatosPrueba } from "./modelo";
import { cargarTareas, guardarTareas } from "./storage";

let tareas = [];

function inicializarDatos() {
  tareas = cargarTareas();

  if (tareas.length === 0) {
    tareas = getDatosPrueba();
    guardarTareas(tareas);
  }

  return tareas;
}

function getTareas() {
  return [...tareas];
}

function agregarTarea(nuevaTarea) {
  tareas.push(nuevaTarea);
  guardarTareas(tareas);
}

function editarTarea(id, datosActualizados) {
  const indice = tareas.findIndex(t => t.id === id);

  if (indice != -1) {
    tareas[indice] = {...tareas[indice], ...datosActualizados}; // Para no perder id, createdAt...
    guardarTareas(tareas);
  }
}

function eliminarTarea(id) {
  tareas = tareas.filter(t => t.id != id);
  guardarTareas(tareas);
}

function cambiarEstado(id, nuevoEstado) {
  const tarea = tareas.find(t => t.id === id);

  if (tarea) {
    tarea.estado = nuevoEstado;
    guardarTareas(tareas);
  }
}

export { inicializarDatos, getTareas, agregarTarea, editarTarea, eliminarTarea, cambiarEstado };