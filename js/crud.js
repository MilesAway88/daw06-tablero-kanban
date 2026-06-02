import { getDatosPrueba } from "./modelo.js";
import { cargarTareas, guardarTareas } from "./storage.js";
import { quitarAcentos } from "./utils.js";

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
  const indice = tareas.findIndex((t) => t.id === id);

  if (indice != -1) {
    tareas[indice] = { ...tareas[indice], ...datosActualizados }; // Para no perder id, createdAt...
    guardarTareas(tareas);
  }
}

function eliminarTarea(id) {
  tareas = tareas.filter((t) => t.id != id);
  guardarTareas(tareas);
}

function cambiarEstado(id, nuevoEstado) {
  const tarea = tareas.find((t) => t.id === id);

  if (tarea) {
    tarea.estado = nuevoEstado;
    guardarTareas(tareas);
  }
}

function getTareasFiltradas(tareas, filtros) {
  const { busqueda = "", estado = "todos", prioridad = "todas" } = filtros;

  return tareas.filter(t => {
    const coincideEstado = estado === "todos" || t.estado === estado;
    const coincidePrioridad = prioridad === "todas" || t.prioridad === prioridad;

    const textoBusqueda = quitarAcentos(busqueda);
    const coincideTexto = busqueda === "" ||
                          quitarAcentos(t.titulo).includes(textoBusqueda) ||
                          (t.descripcion && quitarAcentos(t.descripcion).includes(textoBusqueda));

    return coincideEstado && coincidePrioridad && coincideTexto;
  });
}

export {
  inicializarDatos,
  getTareas,
  agregarTarea,
  editarTarea,
  eliminarTarea,
  cambiarEstado,
  getTareasFiltradas
};
