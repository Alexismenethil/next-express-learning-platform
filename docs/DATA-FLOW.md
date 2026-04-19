# Flujo de Datos / Data Flow

## Por que existe este documento / Why this document exists

Muchas personas junior pueden leer una page, pero aun asi perderse cuando alguien pregunta:

- de donde vino este dato?
- que archivo hizo el request HTTP?
- que codigo toco la base de datos?

Many junior developers can read a page component and still feel lost when asked:

- where did this data come from?
- which file made the HTTP request?
- what code touched the database?

## Flujo del catalogo publico / Public catalog flow

### Mock mode

1. una page de `frontend/src/app/...` llama `catalog-service.ts`
2. `catalog-service.ts` lee arreglos locales de `frontend/src/mocks`
3. los componentes reutilizables renderizan el resultado

1. a page in `frontend/src/app/...` calls `catalog-service.ts`
2. `catalog-service.ts` reads local arrays from `frontend/src/mocks`
3. reusable components render the result

Ideal para / Ideal for:

- prototipado rapido / rapid prototyping
- construir UI antes del backend / building UI before the backend exists
- ensenar data shapes / teaching data shapes

### API mode

1. la page de Next.js llama `catalog-service.ts`
2. `catalog-service.ts` llama al API de Express
3. la ruta de Express valida la entrada
4. el controller llama al catalog service
5. el service elige el repository en memoria
6. el repository devuelve JSON

1. the Next.js page calls `catalog-service.ts`
2. `catalog-service.ts` calls the Express API
3. the Express route validates input
4. the controller calls the catalog service
5. the service chooses the in-memory repository
6. the repository returns JSON

Ideal para / Ideal for:

- frontend/backend separation
- HTTP boundaries
- validation and error handling

### DB mode

1. la page de Next.js llama `catalog-service.ts`
2. `catalog-service.ts` llama al mismo API de Express
3. la ruta valida la entrada
4. el controller llama al catalog service
5. el service elige el Prisma repository
6. Prisma consulta PostgreSQL
7. el resultado vuelve por Express al frontend

1. the Next.js page calls `catalog-service.ts`
2. `catalog-service.ts` calls the same Express API
3. the route validates input
4. the controller calls the catalog service
5. the service chooses the Prisma repository
6. Prisma queries PostgreSQL
7. the result returns through Express to the frontend

Ideal para / Ideal for:

- persistence
- repository isolation
- schema-driven development

## Flujo de admin CRUD / Admin CRUD flow

El area admin es el mejor lugar para ensenar flujo completo porque la persona usuaria dispara escrituras, no solo lecturas.  
The admin area is the best place to explain full data flow because the user triggers writes, not only reads.

### Create product

1. `admin-product-form.tsx` recoge los valores
2. el client component envia `POST /api/products?mode=api|db`
3. Zod valida el body
4. el controller pasa datos limpios al service
5. el service elige memoria o Prisma
6. el repository crea el registro
7. el frontend refresca y vuelve a renderizar la tabla

### Edit product

La ruta es la misma, pero usa `PUT /api/products/:id`.  
The path is the same, but it uses `PUT /api/products/:id`.

### Delete product

La tabla admin usa `DELETE /api/products/:id`.  
The admin table uses `DELETE /api/products/:id`.

## Donde apuntar durante una demo / Where to point during a live walkthrough

- frontend route file: la page orquesta la carga de datos
- frontend service: aqui se decide la fuente
- backend route: entrada HTTP
- backend service: aqui se elige el repository
- backend repository: aqui viven los detalles de storage
- Prisma schema: aqui se vuelve visible la forma de la database

- frontend route file: the page orchestrates data loading
- frontend service: source selection happens here
- backend route: HTTP entry point
- backend service: repository choice happens here
- backend repository: storage details happen here
- Prisma schema: database shape becomes explicit here

## Leccion clave / Key lesson

La UI no debe conocer SQL.  
The UI should not know SQL.

El route handler no debe conocer clases de Tailwind.  
The route handler should not know Tailwind classes.

El repository no debe depender de React.  
The repository should not care about React.
