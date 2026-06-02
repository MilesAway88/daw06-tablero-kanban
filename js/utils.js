function formatearFecha(fechaISO) {
  if (!fechaISO) return "Sin fecha límite";
  const [anyo, mes, dia] = fechaISO.split("-");
  return `${dia}/${mes}/${anyo}`;
}

function quitarAcentos(texto) {
  return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

export { formatearFecha, quitarAcentos }