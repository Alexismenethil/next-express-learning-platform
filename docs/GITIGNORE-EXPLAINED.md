# .gitignore Explicado / .gitignore Explained

## Que hace `.gitignore` / What `.gitignore` does

`.gitignore` le dice a Git que archivos no deben entrar al control de versiones.  
`.gitignore` tells Git which files should stay out of version control.

Protege el repositorio de:

- secretos
- dependencias generadas
- logs locales
- build output
- basura especifica de una maquina

It protects the repository from:

- secrets
- generated dependencies
- local logs
- build output
- machine-specific junk

## Archivos que nunca deberian empujarse / Files that should never be pushed

- `.env`
- `.env.local`
- `node_modules`
- `.next`
- `backend/dist`
- `*.log`

Estos archivos no aportan valor al historial y pueden causar problemas de seguridad o ruido.  
These files do not improve the project history and may cause security issues or noisy diffs.

## Ejemplos importantes de este proyecto / Important entries in this project

### Dependencias / Dependencies

- `node_modules`
- `*/node_modules`

Se ignoran porque son pesadas, generadas y se recuperan con `npm install`.  
They are ignored because they are large, generated, and can be restored with `npm install`.

### Environment files

- `.env`
- `.env.local`
- `frontend/.env`
- `backend/.env`

Se ignoran porque pueden contener secretos y cambian segun la maquina.  
They are ignored because they may contain secrets and differ by machine.

### Build output

- `.next`
- `backend/dist`

Se ignoran porque son artefactos generados.  
They are ignored because they are generated artifacts.

### Logs

- `*.log`
- `npm-debug.log*`

Se ignoran porque son material local de debugging.  
They are ignored because they are local debugging artifacts.

## Por que esto importa en onboarding / Why this matters in onboarding

Muchas personas principiantes aprenden comandos de Git antes de aprender higiene de Git.  
Many beginners learn Git commands before they learn Git hygiene.

Este proyecto ensena que un historial limpio tambien depende de:

- ignorar los archivos correctos
- mantener secretos fuera del repo
- tratar archivos generados como descartables

This project teaches that a clean history also depends on:

- ignoring the right files
- keeping secrets out of the repo
- treating generated files as disposable
