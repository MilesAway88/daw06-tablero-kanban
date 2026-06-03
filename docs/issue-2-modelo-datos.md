# Issue 2 - Modelo de datos y persistencia con localStorage

Se ha creado la capa de almacenamiento y se ha inicializado la aplicación con datos de prueba.

## Cambios realizados

- [x] Modelo `tarea` con campos: `id` (UUID), `titulo`, `descripcion`, `prioridad`, `estado`, `fechaVencimiento`, `createdAt`
- [x] Módulo de persistencia con `cargarTareas()` y `guardarTareas()` usando `localStorage`
- [x] Inicialización: carga datos existentes o genera datos de prueba solo si el storage está vacío
- [x] Arquitectura modular (`modelo.js`, `storage.js`, `ui.js`, `app.js`)
- [x] Clave de almacenamiento clara: `"tareasKanban"`
