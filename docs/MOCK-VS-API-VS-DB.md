# Mock vs API vs DB

## Por que esta comparacion es central / Why this comparison is central

Muchas personas nuevas ven una pantalla funcionando y asumen que el trabajo dificil ya termino.  
Many new developers see a working screen and assume the hard part is done.

Pero una pantalla puede funcionar de formas muy distintas:

- con arreglos locales mock
- mediante un backend API
- con persistencia real en database

But a screen can work in very different ways:

- with local mock arrays
- through a backend API
- with real database persistence

## Mock mode

### Fuente / Source

- `frontend/src/mocks/products.ts`
- `frontend/src/mocks/categories.ts`

### Ventajas / Benefits

- iteracion rapida de UI / fast UI iteration
- cero dependencia del backend / zero backend dependency
- facil para ensenar contratos de TypeScript / easy for teaching TypeScript contracts

### Tradeoffs

- no hay separacion real entre UI y origen de datos
- no hay persistencia
- no hay comportamiento real de red

- there is no real separation between UI and data source
- there is no persistence
- there is no real network behavior

## API mode

### Fuente / Source

- el frontend llama a Express
- el backend usa `MemoryCatalogRepository`

- the frontend calls Express
- the backend uses `MemoryCatalogRepository`

### Ventajas / Benefits

- ensena limites HTTP reales / teaches real HTTP boundaries
- muestra validation, controllers, services y repositories
- requiere menos setup que DB mode / lighter setup than DB mode

### Tradeoffs

- los datos se pierden cuando el server reinicia
- no sirve como persistencia de produccion

- data disappears when the server restarts
- it is not suitable for production persistence

## DB mode

### Fuente / Source

- el frontend llama a Express
- el backend usa `PrismaCatalogRepository`
- Prisma lee y escribe en PostgreSQL

- the frontend calls Express
- the backend uses `PrismaCatalogRepository`
- Prisma reads and writes PostgreSQL

### Ventajas / Benefits

- arquitectura inspirada en produccion / production-inspired architecture
- persistencia real / real persistence
- explicacion clara de schema, migrations y seed / clear explanation of schema, migrations, and seed data

### Tradeoffs

- requiere mas setup / more setup
- necesita disponibilidad de database / requires database availability

## Que se mantiene igual / What stays the same across all modes

- el shape del producto / the product shape
- el shape de la categoria / the category shape
- gran parte de la UI / most of the UI
- la estructura de rutas / the route structure

Eso es importante porque ensena que una buena abstraccion deja cambiar la fuente de datos sin reescribir toda la interfaz.  
That matters because it teaches that a good abstraction lets the data source change without rewriting the whole interface.

## Por que admin evita mock writes / Why the admin panel avoids mock writes

El area admin se enfoca en limites de backend. Por eso usa:

- `api` mode
- `db` mode

The admin area focuses on backend boundaries. That is why it uses:

- `api` mode
- `db` mode

y evita `mock` mode para create, update y delete.  
and intentionally avoids `mock` mode for create, update, and delete.

## Frase util para onboarding / Useful sentence for onboarding

“Mock mode prueba la UI. API mode prueba el contrato. DB mode prueba la persistencia.”  
“Mock mode proves the UI. API mode proves the contract. DB mode proves persistence.”
