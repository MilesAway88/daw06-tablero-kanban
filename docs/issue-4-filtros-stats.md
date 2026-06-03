# Issue 4 - Filtros, búsqueda y estadísticas

Se implementan los filtros combinables, la búsqueda inteligente y el panel de estadísticas con cálculo de porcentaje.

## Cambios realizados

- [x] Función `getTareasFiltradas()`: lógica de filtrado separada de la UI
- [x] Filtros combinables por estado y prioridad
- [x] Búsqueda case-insensitive y sin acentos (con `normalize()`) en título y descripción
- [x] Estadísticas en tiempo real: total, por estado y % completadas
- [x] Funciones utilitarias en `utils.js`: `formatearFecha()` y `quitarAcentos()`
