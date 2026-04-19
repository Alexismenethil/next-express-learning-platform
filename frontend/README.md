# Frontend

La aplicacion de Next.js funciona como catalogo publico y como guia visual de onboarding.  
This Next.js application works as both the public catalog and the visual onboarding guide.

## Carpetas principales / Main folders

- `src/app`: paginas de App Router, layouts, loading states y UI especifica de rutas
- `src/components`: UI compartida y widgets educativos
- `src/services`: helpers de datos que cambian entre `mock`, `api` y `db`
- `src/mocks`: datos locales usados en mock mode
- `src/providers` y `src/hooks`: estado demo para el fake admin boundary
- `src/types`: contratos compartidos de TypeScript

- `src/app`: App Router pages, layouts, loading states, and route-specific UI
- `src/components`: shared UI and educational widgets
- `src/services`: data helpers that switch between `mock`, `api`, and `db`
- `src/mocks`: local data used in mock mode
- `src/providers` and `src/hooks`: demo state for the fake admin boundary
- `src/types`: shared TypeScript contracts

## Objetivos didacticos / Teaching goals inside the UI

- mostrar donde vive cada archivo importante
- comparar mock data, backend API y database persistence
- explicar Server Components y Client Components
- demostrar route groups, nested layouts y dynamic routes

- show where important files live
- compare mock data, backend API data, and database persistence
- explain Server Components and Client Components
- demonstrate route groups, nested layouts, and dynamic routes

## Ejecucion local / Run locally

```bash
cp .env.example .env.local
npm install
npm run dev
```

La app corre en `http://localhost:3000`.  
The app runs at `http://localhost:3000`.
