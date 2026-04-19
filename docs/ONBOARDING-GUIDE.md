# Guia de Onboarding / Onboarding Guide

## Objetivo / Goal

Usa este proyecto para ayudar a nuevas personas del equipo a entender como se estructura una aplicacion full-stack moderna.  
Use this project to help new teammates understand how a modern full-stack application is structured.

## Recorrido sugerido para el primer dia / Suggested first-day walkthrough

1. empezar en el `README.md` de la raiz
2. abrir la app en el navegador
3. visitar `/products`
4. cambiar entre `mock`, `api` y `db`
5. visitar `/admin`
6. revisar las paginas de arquitectura
7. leer la carpeta `docs/`

1. start at the root `README.md`
2. open the app in the browser
3. visit `/products`
4. switch between `mock`, `api`, and `db`
5. visit `/admin`
6. review the architecture pages
7. read the `docs/` folder

## Que explicar en el navegador / What to explain in the browser

### Home page

- el proyecto es app real y guia didactica al mismo tiempo
- el selector de modo cambia el origen de datos

- the project is both a real app and a teaching guide
- the mode selector changes the data source

### Catalog pages

- los listados viven en route files
- las product cards son componentes reutilizables
- el detalle usa un dynamic segment

### Admin pages

- el fake auth existe solo para ensenar
- los forms llaman al API de Express
- el CRUD muestra validation y cambio de repository

### Architecture pages

- convierten estructura de archivos en lenguaje claro
- sirven muy bien para una presentacion en vivo

## Que explicar en el codebase / What to explain in the codebase

### Frontend

- por que `src/app` es para routing
- por que `src/components` vive fuera de las rutas
- por que `src/services` oculta el origen de datos

### Backend

- por que validation ocurre antes del service
- por que repositories aislan storage details
- por que `schema.prisma` funciona como fuente de verdad

### Docs

- por que las explicaciones de arquitectura deben ser buscables
- por que el material de onboarding merece mantenimiento real

## Git para principiantes / Git guidance for beginners

Los mensajes de commit deben escribirse en ingles porque:

- equipos de distintas regiones pueden leerlos
- herramientas y PR history son mas faciles de buscar
- el historial queda mas estandarizado

Commit messages should be written in English because:

- teams across regions can read them
- tools and PR history are easier to search
- the history stays more standardized

### Buenos ejemplos / Good Conventional Commits

- `feat(frontend): add catalog product detail route`
- `feat(backend): add repository switch for api and db modes`
- `docs(project): add onboarding and architecture guides`
- `docs(i18n): translate onboarding docs to bilingual Spanish-English format`

### Malos ejemplos / Bad commit messages

- `changes`
- `fix stuff`
- `update`
- `misc`

## Preguntas utiles para mentoring / Useful mentoring questions

- que archivo decide si los datos vienen de mocks o del backend?
- que archivo contiene las queries a PostgreSQL?
- por que el admin layout vive dentro de un route group?
- por que `.env.example` se commitea pero `.env` no?
- que cambiaria si anadimos auth real?

- which file decides whether data comes from mocks or the backend?
- which file owns PostgreSQL queries?
- why does the admin layout live inside a route group?
- why is `.env.example` committed while `.env` is not?
- what would change if we added real auth?
