# Arquitectura / Architecture

## Resumen / Overview

Este repositorio se divide en tres areas visibles desde la raiz:

- `frontend/`: la aplicacion de Next.js que ve la persona usuaria
- `backend/`: el API de Express y la logica de persistencia
- `docs/`: material de onboarding y arquitectura

This repository is intentionally split into three top-level areas:

- `frontend/`: the Next.js application users see
- `backend/`: the Express API and persistence logic
- `docs/`: onboarding and architecture material

La division no es decorativa. Ensena una leccion base de arquitectura:

- la UI no pertenece al backend
- la persistencia no pertenece a los route files
- la documentacion merece un lugar estable

The split is not cosmetic. It teaches a core architecture lesson:

- UI concerns do not belong in the backend
- persistence concerns do not belong in route files
- documentation deserves a stable home

## Por que el dominio es un catalogo / Why the domain is a catalog

El dominio elegido es un product catalog con panel admin porque permite ensenar:

- listados publicos
- detalle de producto
- categorias
- admin CRUD
- validation
- persistence

The chosen domain is a product catalog with an admin panel because it allows us to teach:

- public listings
- product detail pages
- categories
- admin CRUD
- validation
- persistence

Se evita checkout, pagos y auth real para que la arquitectura se vea con claridad.  
Checkout, payments, and real auth are avoided so the architecture stays clear.

## Arquitectura del frontend / Frontend architecture

El frontend usa:

- Next.js App Router
- TypeScript
- Tailwind CSS
- mayormente Server Components
- Client Components solo cuando se necesitan hooks del navegador

The frontend uses:

- Next.js App Router
- TypeScript
- Tailwind CSS
- mostly Server Components
- Client Components only when browser hooks are needed

Ideas clave:

- `src/app` contiene rutas, layouts y archivos a nivel de ruta
- `src/components` contiene UI reutilizable y widgets educativos
- `src/services` oculta de donde vienen los datos
- `src/mocks` permite prototipado rapido
- `src/providers` guarda el estado del fake auth demo

Key ideas:

- `src/app` contains routes, layouts, and route-level files
- `src/components` contains reusable UI and teaching widgets
- `src/services` hides where data comes from
- `src/mocks` enables rapid prototyping
- `src/providers` stores the fake auth demo state

## Arquitectura del backend / Backend architecture

El backend usa:

- Express
- TypeScript
- Zod validation
- centralized error handling
- service pattern
- repository pattern
- Prisma para PostgreSQL

The backend uses:

- Express
- TypeScript
- Zod validation
- centralized error handling
- service pattern
- repository pattern
- Prisma for PostgreSQL

Recorrido del request:

1. la ruta recibe HTTP
2. el middleware valida params, query o body
3. el controller llama al service
4. el service elige el repository segun el modo
5. el repository usa memoria o PostgreSQL

Request path:

1. the route receives HTTP
2. middleware validates params, query, or body
3. the controller calls the service
4. the service picks the repository based on mode
5. the repository uses memory or PostgreSQL

## Repository pattern en este proyecto / Repository pattern in this project

El backend tiene dos implementaciones para el mismo contrato del catalogo:

- `MemoryCatalogRepository`
- `PrismaCatalogRepository`

Eso importa porque:

- la logica de aplicacion no depende del tipo de almacenamiento
- la diferencia entre API mode y DB mode se vuelve explicita
- los route handlers quedan pequenos y legibles

This matters because:

- application logic does not depend on storage type
- the difference between API mode and DB mode becomes explicit
- route handlers stay small and readable

## Prisma y PostgreSQL / Prisma and PostgreSQL

Prisma se eligio por claridad pedagogica:

- un schema legible
- client generado
- migrations
- seed support
- buena integracion con TypeScript

Prisma was chosen for teaching clarity:

- one readable schema
- generated client
- migrations
- seed support
- strong TypeScript integration

## Auth simulado / Fake auth decision

El area admin usa fake auth en la UI en lugar de autenticacion real.

Why:

- ayuda a ensenar route boundaries y admin layouts
- evita distraer con seguridad real durante el onboarding inicial
- permite explicar la diferencia entre UI protegida y backend seguro

The admin area uses fake UI-only access instead of real authentication.

Why:

- it helps teach route boundaries and admin layouts
- it avoids distracting from architecture basics during onboarding
- it lets us explain the difference between protected UI and secure backends

Nota importante: esto no es seguridad de produccion.  
Important note: this is not production security.

## Como puede escalar / Scaling path

- agregar auth y authorization reales
- separar catalog en modulos mas finos
- agregar tests de rutas, services y componentes
- mejorar search y pagination
- sumar observability y CI

- add real auth and authorization
- split catalog into finer modules
- add route, service, and component tests
- improve search and pagination
- add observability and CI
