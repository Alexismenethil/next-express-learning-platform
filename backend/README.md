# Backend

Este servicio en Express + TypeScript alimenta el API educativo del catalogo.  
This Express + TypeScript service powers the educational catalog API.

## Que vive aqui / What lives here

- `src/config`: carga de environment variables y configuracion de runtime
- `src/modules/catalog`: controllers, schemas, services y repositories del dominio
- `src/routes`: registro principal del API y health endpoint
- `src/middlewares`: validation, 404 y manejo centralizado de errores
- `src/db`: Prisma client, estado en memoria y fixtures para seed
- `prisma/`: schema y seed script para PostgreSQL

## Por que este backend es educativo / Why this backend is educational

El API soporta dos rutas internas de datos:

- `mode=api`: usa un repository en memoria para ensenar separacion sin requerir database
- `mode=db`: usa Prisma + PostgreSQL para ensenar una capa de persistencia mas cercana a produccion

The API intentionally supports two internal data paths:

- `mode=api`: uses an in-memory repository to teach separation without requiring a database
- `mode=db`: uses Prisma + PostgreSQL to demonstrate a more production-like persistence layer

## Ejecucion local / Run locally

```bash
cp .env.example .env
npm install
npx prisma generate
npx prisma migrate dev
npm run prisma:seed
npm run dev
```

El API queda disponible en `http://localhost:4000/api`.  
The API is available at `http://localhost:4000/api`.
