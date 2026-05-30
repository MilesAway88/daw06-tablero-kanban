function crearTarea(titulo, descripcion, prioridad, estado = "pendiente", fechaVencimiento) {
  return {
    id: crypto.randomUUID(),
    titulo: titulo.trim(),
    descripcion: descripcion?.trim() || "",
    prioridad: prioridad,
    estado: estado,
    fechaVencimiento: fechaVencimiento || null,
    createdAt: new Date().toISOString()
  };
}

function getDatosPrueba() {
  return [
    crearTarea("Estudiar React", "Aprender cómo crear Custom Hooks", "alta", "pendiente", "2026-06-11"),
    crearTarea("Configurar entorno", "Instalar dependencias y revisar requisitos", "alta", "curso", "2026-06-05"),
    crearTarea("Diseñar paleta de colores", "Definir variables CSS y contrastes accesibles", "media", "pendiente", "2026-06-18"),
    crearTarea("Maquetar formulario", "HTML semántico + validación básica", "media", "curso", "2026-06-07"),
    crearTarea("Redactar README", "", "baja", "pendiente", "2026-06-21"),
    crearTarea("Revisar enunciado", "Leer PDF tarea y estructurar proyecto", "baja", "hecha", "2026-06-01"),
  ];
}

export { crearTarea, getDatosPrueba }