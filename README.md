# Tablero MilesBan

## UT8. Documentación y control de versiones

* **Módulo:** Despliegue de Aplicaciones Web
* **Autora:** Milena Sánchez Navarro
* **Fecha:** junio de 2026

## Descripción del proyecto

Tablero Kanban desarrollado con `HTML` - `CSS` - `JS` para la gestión de tareas en un equipo de trabajo.

Incluye un formulario para la creación o modificación de una tarea, filtros y campo de búsqueda, así como el tablero en sí con 3 columnas de trabajo según el estado de la tarea.

## ¿Qué permite hacer?

* Crear una **nueva tarea**, asignándole un `Estado`, una `Prioridad` y una `Fecha límite`
* **Modificar** una tarea existente
* Modificar el **estado** de la tarea ➔ `Pendiente`, `En Curso` o `Hecha`
* **Buscar tareas** por palabra/s clave/s (tanto en el título como en la descripción)
* **Filtrar tareas** por estado y por prioridad ➔ `Baja`, `Media` o `Alta`
* **Cambiar tarea de columna** mediante `Drag & Drop`

## Guía rápida de uso

> Deberás tener instalado Node.js previamente.

### 1. Creación / modificación de tareas

* **Nueva tarea:** Rellena el formulario y pulsa en `Crear tarea`
* **Modificar tarea:** Haz clic en `Editar` en la tarjeta que desees, modifica los campos correspondientes y pulsa en `Guardar cambios`.

### 2. Búsqueda y filtrado

Para refinar la búsqueda, puedes combinar el `buscador` con el `filtro de estado` y el `filtro de prioridad`. Se mostrarán los resultados que cumplan con tus selecciones.

### 3. Visualización y cambio de estado de tareas

Las tareas se visualizan en 3 columnas distintas según su estado.

Para cambiarlas de columnas puedes hacerlo editando la tarea o, de forma más sencilla, arrastrando y soltando la tarjeta en la columna correspondiente (`Drag&Drop`).

## Estructura del proyecto

```text
proyecto/
├── css/
│   └── estilos.css
├── docs/           # Documentación de las issues
├── img/
├── js/
│   ├── app.js      # Entrada a la app
│   ├── crud.js     # Lógica de negocio y filtros
│   ├── modelo.js   # Definición y creación de tarea
│   ├── storage.js  # Persistencia de datos
│   ├── ui.js       # Manipulación del DOM y renderizado
│   └── utils.js    # Funciones de ayuda
├── .gitignore
├── index.html
└── README.md
```

## Capturas de pantalla

> Dale [aquí](https://MilesAway88.github.io/daw06-tablero-kanban/) para acceder al proyecto desplegado en GitHub Pages.
