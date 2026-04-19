# Deployment

## Explicacion general / General explanation

La recomendacion mas amigable para principiantes es:

- frontend en Vercel
- backend en Railway o Render
- PostgreSQL en Neon

The most beginner-friendly recommendation is:

- frontend on Vercel
- backend on Railway or Render
- PostgreSQL on Neon

Esta combinacion coincide con la separacion del repositorio y reduce friccion durante demos o onboarding.  
This setup matches the repository split and reduces friction during demos or onboarding.

## Donde desplegar cada parte / Where to deploy each part

### Frontend: Vercel

Explicacion en espanol:

- Vercel es la opcion mas simple para Next.js App Router
- ofrece previews faciles
- permite ensenar deployment sin demasiada configuracion

English:

- Vercel is the easiest option for Next.js App Router
- it gives easy previews
- it lets you teach deployment without too much configuration

Variables a configurar:

- `NEXT_PUBLIC_API_URL`
- `INTERNAL_API_URL`
- `NEXT_PUBLIC_APP_NAME`

### Backend: Railway o Render / Railway or Render

Explicacion en espanol:

- ambos permiten desplegar Express con poco esfuerzo
- el manejo de environment variables es directo
- conectarlos a PostgreSQL es sencillo para equipos pequenos

English:

- both platforms can deploy Express with low friction
- environment variable management is straightforward
- connecting to PostgreSQL is simple for small teams

Variables a configurar:

- `PORT`
- `CORS_ORIGIN`
- `DATABASE_URL`

### Database: Neon

Explicacion en espanol:

- Neon simplifica el uso de PostgreSQL administrado
- entrega una `DATABASE_URL` clara
- evita que una persona junior tenga que operar infraestructura propia

English:

- Neon simplifies managed PostgreSQL
- it provides a clear `DATABASE_URL`
- it avoids asking junior developers to operate their own database infrastructure

## Como conectar environment variables / How to connect environment variables

### Paso a paso en espanol

1. Despliega Neon y copia la `DATABASE_URL`
2. Pega esa `DATABASE_URL` en Railway o Render para el backend
3. Despliega el backend y copia su URL publica
4. Usa esa URL para configurar `NEXT_PUBLIC_API_URL` en Vercel
5. Si el frontend hace server-side fetches con otra red interna, ajusta `INTERNAL_API_URL`

### Step by step in English

1. Deploy Neon and copy the `DATABASE_URL`
2. Paste that `DATABASE_URL` into Railway or Render for the backend
3. Deploy the backend and copy its public URL
4. Use that URL to configure `NEXT_PUBLIC_API_URL` in Vercel
5. If the frontend uses server-side fetches through a different internal network, set `INTERNAL_API_URL`

## Que probar despues del deployment / What to test after deployment

### Checklist para principiantes / Beginner-friendly checklist

- abrir la home page
- entrar a `/products`
- cambiar entre `mock`, `api` y `db`
- abrir un detalle de producto
- entrar a `/admin`
- activar el demo access
- crear, editar y eliminar un producto en `api` mode
- repetir el CRUD en `db` mode
- revisar `GET /api/health`

### English checklist

- open the home page
- visit `/products`
- switch between `mock`, `api`, and `db`
- open a product detail page
- visit `/admin`
- enable demo access
- create, edit, and delete a product in `api` mode
- repeat CRUD in `db` mode
- verify `GET /api/health`

## Ruta mas facil para demos / Easiest path for demos

Para una demo corta:

1. despliega frontend en Vercel
2. despliega backend en Railway o Render
3. usa Neon para PostgreSQL
4. carga seed una sola vez

For a short demo:

1. deploy the frontend to Vercel
2. deploy the backend to Railway or Render
3. use Neon for PostgreSQL
4. seed the database once

## Cuidado importante / Important caution

El fake auth del admin no es seguridad real.  
The admin fake auth is not real security.

Si el proyecto evoluciona hacia produccion, se debe agregar auth real, authorization y controles de auditoria.  
If the project evolves toward production, it should add real auth, authorization, and audit controls.
