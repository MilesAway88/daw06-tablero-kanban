import { formatearFecha } from "./utils.js";

function crearTarjeta(tarea, callbacks) {
  const tarjeta = document.createElement("div");
  tarjeta.classList.add("tarjeta", "draggable", tarea.prioridad);
  tarjeta.dataset.id = tarea.id;
  tarjeta.setAttribute("draggable", "true");
  
  addDragDropTarjeta(tarjeta, tarea.id);

  tarjeta.innerHTML = `
    <h3>${tarea.titulo}</h3>
    <p>${tarea.descripcion}</p>
    <small>${formatearFecha(tarea.fechaVencimiento)}</small>
    <div class="tarjeta-acciones">
      <button class="btn-editar">Editar</button>
      <button class="btn-eliminar">Eliminar</button>
    </div>
  `;

  tarjeta.querySelector(".btn-editar").addEventListener("click", () => callbacks.onEditar(tarea.id));
  tarjeta.querySelector(".btn-eliminar").addEventListener("click", () => callbacks.onEliminar(tarea.id));

  return tarjeta;
}

function renderizarTablero(tareas, callbacks) {
  document.getElementById("lista-pendiente").innerHTML = "";
  document.getElementById("lista-curso").innerHTML = "";
  document.getElementById("lista-hecha").innerHTML = "";

  tareas.forEach(tarea => {
    const tarjeta = crearTarjeta(tarea, callbacks);
    document.getElementById(`lista-${tarea.estado}`).appendChild(tarjeta);
  });
}

function actualizarStats(tareas) {
  const total = tareas.length;
  const pendientes = tareas.filter(tarea => tarea.estado === "pendiente").length;
  const curso = tareas.filter(tarea => tarea.estado === "curso").length;
  const hechas = tareas.filter(tarea => tarea.estado === "hecha").length;

  const porcentaje = total > 0 ? ((hechas / total) * 100).toFixed(1) : "0.0";
  
  document.getElementById("stat-total").textContent = total;
  document.getElementById("stat-pendientes").textContent = pendientes;
  document.getElementById("stat-curso").textContent = curso;
  document.getElementById("stat-hechas").textContent = hechas;
  document.getElementById("stat-porcentaje").textContent = porcentaje;
}

function limpiarFormulario() {
  document.getElementById("formulario-tarea").reset();
}

function addDragDropTarjeta(tarjeta, id) {
  tarjeta.addEventListener("dragstart", (e) => {
    e.dataTransfer.setData("text/plain", id);
    tarjeta.style.opacity = "0.6";
  });

  tarjeta.addEventListener("dragend", () => {
    tarjeta.style.opacity = "1";
  });
}

function addDragDropColumnas(callbacks) {
  document.querySelectorAll(".columna").forEach(columna => {
    columna.addEventListener("dragover", (e) => {
      e.preventDefault();
      columna.classList.add("drag-over");
    });

    columna.addEventListener("dragleave", () => {
      columna.classList.remove("drag-over");
    });

    columna.addEventListener("drop", (e) => {
      e.preventDefault();
      columna.classList.remove("drag-over");

      const id = e.dataTransfer.getData("text/plain");
      const nuevoEstado = columna.id.replace("col-", "");
      callbacks.onDrop(id, nuevoEstado);
    });
  });
}

export { renderizarTablero, actualizarStats, limpiarFormulario, addDragDropColumnas }