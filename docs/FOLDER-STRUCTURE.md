# Estructura de Carpetas / Folder Structure

## Raiz / Root

```text
project-root/
  frontend/
  backend/
  docs/
```

### Por que la raiz se divide asi / Why the root is split this way

- `frontend/` separa la UI del runtime del backend
- `backend/` separa API y persistence de la presentacion
- `docs/` da un hogar estable al conocimiento de onboarding

- `frontend/` keeps UI concerns separate from backend runtime concerns
- `backend/` keeps API and persistence separate from presentation
- `docs/` gives onboarding knowledge a stable home

La separacion de responsabilidades se ensena desde el primer `ls`.  
Separation of concerns is taught from the first `ls`.

## Frontend

```text
frontend/
  src/
    app/
    components/
    services/
    mocks/
    providers/
    hooks/
    lib/
    types/
    constants/
    styles/
```

### Explicacion de carpetas del frontend / Frontend folders explained

- `app/`: route files, layouts, loading states y dynamic routes
- `components/`: UI reutilizable y widgets por feature
- `services/`: decide entre `mock`, `api` y `db`
- `mocks/`: datos de ejemplo del frontend
- `providers/`: estado de cliente como el fake auth demo
- `hooks/`: wrappers reutilizables como `useDemoAuth`
- `lib/`: helpers pequenos y utilidades de env
- `types/`: contratos compartidos de producto y categoria
- `constants/`: navegacion y configuracion estable
- `styles/`: theme tokens y estilos globales

## Backend

```text
backend/
  src/
    config/
    modules/
    routes/
    middlewares/
    db/
    lib/
    utils/
  prisma/
```

### Explicacion de carpetas del backend / Backend folders explained

- `config/`: lectura y validacion de environment variables
- `modules/`: codigo del dominio
- `routes/`: registro principal del API
- `middlewares/`: validation, 404 y error handling
- `db/`: Prisma client, memory store y seed fixtures
- `lib/`: helpers generales como `AppError`
- `utils/`: funciones puras pequenas
- `prisma/`: schema y seed script

## Docs

La carpeta `docs/` existe para que el conocimiento de onboarding no quede atrapado en comentarios sueltos.  
The `docs/` folder exists so onboarding knowledge does not get trapped inside scattered comments.

Incluye / It includes:

- razonamiento de arquitectura / architecture rationale
- explicaciones de carpetas / folder explanations
- flujo de datos / data flow
- environment guidance
- Docker usage
- deployment recommendations
- Git workflow coaching

## Tip para presentacion / Teaching tip

Durante una presentacion en vivo pregunta:

- que parte renderiza UI?
- que parte recibe HTTP?
- que parte toca la base de datos?
- que parte existe solo para ensenar?

During a live walkthrough ask:

- which part renders UI?
- which part receives HTTP?
- which part touches the database?
- which part exists only to teach?
