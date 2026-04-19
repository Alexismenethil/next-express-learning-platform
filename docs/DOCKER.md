# Docker

## Por que Docker esta incluido / Why Docker is included

Docker ayuda a ensenar una pregunta muy practica de onboarding:

“Como ejecutamos el mismo stack en distintas maquinas sin pelearnos con la configuracion local?”

Docker helps teach a very practical onboarding question:

“How do we run the same stack on different machines without fighting local configuration?”

## Servicios definidos en `compose.yaml` / Services in `compose.yaml`

- `frontend`: app de Next.js / Next.js app
- `backend`: API de Express / Express API
- `postgres`: base de datos PostgreSQL / PostgreSQL database

## Por que este setup es amigable para principiantes / Why this setup is beginner-friendly

- un solo comando levanta todo el stack
- los nombres de los servicios hacen visible la arquitectura
- PostgreSQL esta listo sin instalacion manual

- one command boots the whole stack
- service names make the architecture visible
- PostgreSQL is ready without manual installation

## Comando / Command

```bash
docker compose up --build
```

## Que ensena cada servicio / What each service teaches

### Frontend container

- como Next.js recibe environment variables
- por que `NEXT_PUBLIC_API_URL` y `INTERNAL_API_URL` no siempre son iguales

- how Next.js receives environment variables
- why `NEXT_PUBLIC_API_URL` and `INTERNAL_API_URL` are not always the same

### Backend container

- como el API depende de PostgreSQL
- donde entra Prisma generate en el arranque

- how the API depends on PostgreSQL
- where Prisma generate fits into startup

### Postgres container

- donde vive la persistencia real
- por que la base de datos suele ser un servicio separado

- where real persistence lives
- why the database is usually a separate service

## Nota didactica importante / Important teaching note

El frontend usa dos URLs:

- `NEXT_PUBLIC_API_URL`: requests desde el navegador
- `INTERNAL_API_URL`: requests del lado servidor dentro de Docker

The frontend uses two URLs:

- `NEXT_PUBLIC_API_URL`: browser-side requests
- `INTERNAL_API_URL`: server-side requests inside Docker

Esta diferencia es valiosa porque muchas personas principiantes asumen que `localhost` significa lo mismo en todas partes. En contenedores no es asi.  
This difference is valuable because many beginners assume `localhost` means the same thing everywhere. In containers, it does not.
