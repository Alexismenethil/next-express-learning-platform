# Environment Variables

## Que es un `.env` / What `.env` is

Un archivo `.env` guarda configuracion que cambia entre ambientes, por ejemplo:

- URLs del API
- conexiones a database
- puertos
- origen permitido para CORS

A `.env` file stores configuration that changes across environments, for example:

- API URLs
- database connections
- ports
- allowed CORS origin

## Por que `.env` no se hace commit / Why `.env` is not committed

`.env` normalmente no se versiona porque puede contener:

- secretos
- credenciales privadas
- valores especificos de una maquina o ambiente

`.env` is normally not committed because it may contain:

- secrets
- private credentials
- machine-specific or environment-specific values

## Por que `.env.example` si se hace commit / Why `.env.example` is committed

`.env.example` si se versiona porque sirve como:

- plantilla
- documentacion
- lista minima de variables requeridas

`.env.example` is committed because it acts as:

- a template
- documentation
- the minimum list of required variables

## Variables del frontend / Frontend variables

- `NEXT_PUBLIC_API_URL`: URL del API visible desde el navegador
- `INTERNAL_API_URL`: URL para fetch del lado servidor, util en Docker
- `NEXT_PUBLIC_APP_NAME`: nombre amigable de la app

- `NEXT_PUBLIC_API_URL`: browser-visible API URL
- `INTERNAL_API_URL`: server-side fetch URL, useful in Docker
- `NEXT_PUBLIC_APP_NAME`: friendly app name

## Variables del backend / Backend variables

- `PORT`: puerto de Express
- `CORS_ORIGIN`: origen permitido del frontend
- `DATABASE_URL`: cadena de conexion de Prisma a PostgreSQL

- `PORT`: Express port
- `CORS_ORIGIN`: allowed frontend origin
- `DATABASE_URL`: Prisma PostgreSQL connection string

## Regla didactica importante / Important teaching rule

Si una variable empieza con `NEXT_PUBLIC_`, esa variable se expone al navegador.  
If a variable starts with `NEXT_PUBLIC_`, it is exposed to the browser.

Por eso nunca deben ponerse secretos en `NEXT_PUBLIC_*`.  
That is why secrets should never be placed in `NEXT_PUBLIC_*`.

## Explicacion para principiantes / Beginner explanation

- `.env`: archivo local real que usa tu maquina
- `.env.example`: ejemplo seguro para copiar y completar
- `compose.yaml`: muestra como esos valores cambian en Docker

- `.env`: the real local file used by your machine
- `.env.example`: the safe example to copy and complete
- `compose.yaml`: shows how those values change in Docker
