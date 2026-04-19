# Product Catalog Learning Platform

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-16-black?logo=next.js&logoColor=white" alt="Next.js">
  <img src="https://img.shields.io/badge/Express-5-black?logo=express&logoColor=white" alt="Express">
  <img src="https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white" alt="TypeScript">
  <img src="https://img.shields.io/badge/Tailwind-4-06B6D4?logo=tailwindcss&logoColor=white" alt="Tailwind CSS">
  <img src="https://img.shields.io/badge/Prisma-6-2D3748?logo=prisma&logoColor=white" alt="Prisma">
  <img src="https://img.shields.io/badge/PostgreSQL-16-4169E1?logo=postgresql&logoColor=white" alt="PostgreSQL">
  <img src="https://img.shields.io/badge/Docker-Compose-2496ED?logo=docker&logoColor=white" alt="Docker">
</p>

<p align="center">
  Proyecto bilingüe de onboarding para enseñar arquitectura full-stack con un ejemplo real.<br>
  Bilingual onboarding project for teaching full-stack architecture through a real example app.
</p>

---

## El concepto central / Core concept: three data modes

La misma UI puede cargar datos desde tres fuentes distintas. El modo se cambia con `?mode=mock|api|db` y es visible en la pantalla, no está oculto en el código.

The same UI can load data from three different sources. The mode is switched with `?mode=mock|api|db` and is always visible on screen, never hidden in code.

```mermaid
flowchart LR
    Browser["Browser\n?mode=..."]

    subgraph "Frontend only"
        Mocks["src/mocks/\nlocal TS arrays"]
    end

    subgraph "Backend :4000"
        Express["Express"]
        Memory["MemoryRepository\nin-memory store"]
        Prisma["PrismaRepository\nPostgreSQL"]
    end

    Browser -->|mode=mock| Mocks
    Browser -->|mode=api| Express
    Browser -->|mode=db| Express
    Express -->|mode=api| Memory
    Express -->|mode=db| Prisma
```

| | `mock` | `api` | `db` |
|---|---|---|---|
| **Datos desde** | `frontend/src/mocks/` | Express + memoria | Express + PostgreSQL |
| **Backend necesario** | No | Sí | Sí |
| **Base de datos** | No | No | Sí |
| **Archivo clave** | `mocks/products.ts` | `memory-catalog.repository.ts` | `prisma-catalog.repository.ts` |

### Cómo se ve en la UI / How it looks in the UI

| Mode `mock` | Mode `api` | Mode `db` |
|:-----------:|:----------:|:---------:|
| ![Mock mode](https://placehold.co/520x300/10212a/a8d8ea?text=mode%3A+mock%0Alocal+TS+arrays&font=monospace) | ![API mode](https://placehold.co/520x300/10212a/7ecbc3?text=mode%3A+api%0AExpress+%2B+memory&font=monospace) | ![DB mode](https://placehold.co/520x300/10212a/e8c47e?text=mode%3A+db%0AExpress+%2B+PostgreSQL&font=monospace) |
| Sin backend, datos locales | Backend activo, sin PostgreSQL | Backend + PostgreSQL activos |
| No backend, local data | Backend active, no PostgreSQL | Backend + PostgreSQL active |

> [!TIP]
> Reemplaza estas imágenes con capturas reales guardando los screenshots en `docs/images/` y actualizando los enlaces de arriba.
>
> Replace these with real screenshots by saving them to `docs/images/` and updating the links above.

---

## Qué incluye este repositorio / What's inside

- `frontend/` — Next.js + TypeScript + Tailwind CSS + App Router
- `backend/` — Express + TypeScript + Zod + service/repository structure
- `docs/` — arquitectura, onboarding, deployment, Docker, variables de entorno y más

El dominio es simple a propósito: un catálogo de productos con experiencia pública y panel admin semi-funcional.  
The domain is intentionally simple: a product catalog with a public experience and a semi-functional admin panel.

> [!NOTE]
> El frontend incluye rutas de arquitectura interactivas: `/architecture`, `/architecture/frontend`, `/architecture/backend`, `/architecture/data-flow`, y más. Son parte del producto, no documentación externa.
>
> The frontend includes interactive architecture routes: `/architecture`, `/architecture/frontend`, `/architecture/backend`, `/architecture/data-flow`, and more. They are part of the product, not external docs.

---

## Inicio rápido / Quick start

### Desarrollo local / Local development

1. Copia los archivos de entorno:

```bash
cp frontend/.env.example frontend/.env.local
cp backend/.env.example backend/.env
```

2. Instala dependencias desde la raíz:

```bash
npm install
```

3. Inicia PostgreSQL localmente o usa Docker solo para la base de datos.

4. Genera Prisma Client, aplica migraciones y carga seed:

```bash
npm run db:generate
npm run db:migrate
npm run db:seed
```

5. Inicia frontend y backend juntos:

```bash
npm run dev
```

Frontend: `http://localhost:3000`  
Backend: `http://localhost:4000/api`

### Docker (todo incluido / all-in-one)

```bash
docker compose up --build
```

Revisa [docs/DOCKER.md](docs/DOCKER.md) para la explicación completa.  
See [docs/DOCKER.md](docs/DOCKER.md) for the full explanation.

---

## Estructura / Structure

```text
project-root/
  frontend/     Next.js app
  backend/      Express API
  docs/         Guides and architecture docs
```

Más detalle en [docs/FOLDER-STRUCTURE.md](docs/FOLDER-STRUCTURE.md).  
More detail in [docs/FOLDER-STRUCTURE.md](docs/FOLDER-STRUCTURE.md).

---

## Orden recomendado de lectura / Recommended reading order

1. [docs/ONBOARDING-GUIDE.md](docs/ONBOARDING-GUIDE.md)
2. [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md)
3. [docs/DATA-FLOW.md](docs/DATA-FLOW.md)
4. [docs/MOCK-VS-API-VS-DB.md](docs/MOCK-VS-API-VS-DB.md)
5. [docs/CODEX-FINAL-REPORT.md](docs/CODEX-FINAL-REPORT.md)

---

## Git para onboarding / Git workflow

Los mensajes de commit deben escribirse en inglés con prefijos Conventional Commits.  
Commit messages should be written in English using Conventional Commit prefixes.

```
feat(frontend): scaffold app router structure
feat(backend): add catalog routes with service and repository
feat(db): add Prisma schema and seed script
docs(project): add onboarding and architecture guides
```

---

## Deployment

| Servicio | Plataforma recomendada |
|----------|----------------------|
| Frontend | Vercel |
| Backend  | Railway o Render |
| Database | Neon o Render Postgres |

Más detalle en [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md).
