function crearTarjeta(tarea) {
  const tarjeta = document.createElement("div");
  tarjeta.classList.add("tarjeta");
  tarjeta.classList.add(`${tarea.prioridad}`);

  tarjeta.innerHTML = `
    <h3>${tarea.titulo}</h3>
    <p>${tarea.descripcion}</p>
    <small>${tarea.fechaVencimiento}</small>
    <div class="tarjeta-acciones">
      <button class="btn-editar" data-id="${tarea.id}">Editar</button>
      <button class="btn-eliminar" data-id="${tarea.id}">Eliminar</button>
      <select class="select-estado" data-id="${tarea.id}">
        <option value="pendiente" ${tarea.estado === "pendiente" ? "selected" : ""}>Pendiente</option>
        <option value="curso" ${tarea.estado === "curso" ? "selected" : ""}>En curso</option>
        <option value="hecha" ${tarea.estado === "hecha" ? "selected" : ""}>Hecha</option>
      </select>
    </div>
  `;

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
    tarjeta.querySelector(".select-estado").addEventListener("change", (e) => callbacks.onCambiarEstado(tarea.id, e.target.value));

    document.getElementById(`lista-${tarea.estado}`).appendChild(tarjeta);
  });
}

function actualizarStats(tareas) {
  const statTotal = document.getElementById("stat-total");
  const statPendientes = document.getElementById("stat-pendientes");
  const statCurso = document.getElementById("stat-curso");
  const statHechas = document.getElementById("stat-hechas");

  statTotal.textContent = tareas.length;
  statPendientes.textContent = tareas.filter(tarea => tarea.estado === "pendiente").length;
  statCurso.textContent = tareas.filter(tarea => tarea.estado === "curso").length;
  statHechas.textContent = tareas.filter(tarea => tarea.estado === "hecha").length;
}

function limpiarFormulario() {
  document.getElementById("formulario-tarea").reset();
}

export { renderizarTablero, actualizarStats, limpiarFormulario }