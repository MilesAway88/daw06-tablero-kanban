import { getDatosPrueba } from "./modelo.js";

const CLAVE_STORAGE = "tareasKanban";

function cargarTareas() {
  try {
    const datos = localStorage.getItem(CLAVE_STORAGE);
    return datos ? JSON.parse(datos) : [];
    console.log("Tareas cargadas OK");
  } catch (error) {
    console.error("Error al cargar las tareas:", error);
    return [];
  }
}

function guardarTareas(listaTareas) {
  try {
    localStorage.setItem(CLAVE_STORAGE, JSON.stringify(listaTareas));
    console.log("Tareas guardadas OK");
  } catch (error) {
    console.error("Error al guardar las tareas:", error)
  }
}

function inicializarDatos() {
  let tareas = cargarTareas();

  if (tareas.length === 0) {
    tareas = getDatosPrueba();
    guardarTareas(tareas);
    console.log("Datos de prueba inicializados");
  }

  return tareas;
}

function limpiarStorage() {
  localStorage.removeItem(CLAVE_STORAGE);
}

export { cargarTareas, guardarTareas, inicializarDatos, limpiarStorage }