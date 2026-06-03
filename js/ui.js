import { formatearFecha } from "./utils.js";

function crearTarjeta(tarea) {
  const tarjeta = document.createElement("div");
  tarjeta.classList.add("tarjeta");
  tarjeta.classList.add(`${tarea.prioridad}`);

  tarjeta.innerHTML = `
    <h3>${tarea.titulo}</h3>
    <p>${tarea.descripcion}</p>
    <small>${formatearFecha(tarea.fechaVencimiento)}</small>
    <div class="tarjeta-acciones">
      <button class="btn-editar" data-id="${tarea.id}">Editar</button>
      <button class="btn-eliminar" data-id="${tarea.id}">Eliminar</button>
    </div>
  `;

  tarjeta.dataset.id = tarea.id;

  return tarjeta;
}

function renderizarTablero(tareas, callbacks) {
  document.getElementById("lista-pendiente").innerHTML = "";
  document.getElementById("lista-curso").innerHTML = "";
  document.getElementById("lista-hecha").innerHTML = "";

  tareas.forEach(tarea => {
    const tarjeta = crearTarjeta(tarea);
    
    tarjeta.querySelector(".btn-editar").addEventListener("click", () => callbacks.onEditar(tarea.id));
    tarjeta.querySelector(".btn-eliminar").addEventListener("click", () => callbacks.onEliminar(tarea.id));

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

function habilitarDragDrop(callbacks) {
  // Para las tarjetas
  document.querySelectorAll(".tarjeta").forEach(tarjeta => {
    tarjeta.setAttribute("draggable", "true");

    tarjeta.addEventListener("dragstart", (e) => {
      e.dataTransfer.setData("text/plain", tarjeta.dataset.id);
      tarjeta.style.opacity = "0.6";
    });

    tarjeta.addEventListener("dragend", () => {
      tarjeta.style.opacity = "1";
    });
  });

  // Para las columnas
  document.querySelectorAll(".lista-tareas").forEach(lista => {
    lista.addEventListener("dragover", (e) => {
      e.preventDefault();
      lista.classList.add("drag-over");
    });

    lista.addEventListener("dragleave", () => {
      lista.classList.remove("drag-over");
    });

    lista.addEventListener("drop", (e) => {
      e.preventDefault();
      lista.classList.remove("drag-over");

      const id = e.dataTransfer.getData("text/plain");
      const nuevoEstado = lista.id.replace("lista-", "");
      callbacks.onDrop(id, nuevoEstado);
    });
  });
}

export { renderizarTablero, actualizarStats, limpiarFormulario, habilitarDragDrop }