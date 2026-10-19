# CLAUDE.md — True Trading Landing

## Gestor de paquetes — OBLIGATORIO

**Prohibido usar `npm install` / `npm i` en este repo.** Usar siempre **pnpm** (`pnpm install`, `pnpm add`, `pnpm remove`, etc.).

**Motivo:** protección frente a ataques de cadena de suministro en npm (paquetes comprometidos con scripts `preinstall`/`postinstall` maliciosos que exfiltran credenciales, tipo gusano "Shai-Hulud"). pnpm no ejecuta scripts de instalación de dependencias de terceros salvo aprobación explícita (`pnpm approve-builds`), lo que reduce ese riesgo. Antes de instalar cualquier dependencia nueva, revisar que el paquete es legítimo (descargas, mantenedor, fecha de publicación reciente sospechosa).

Landing page corporativa para True Trading. Stack Vite + React + TypeScript + Tailwind.

## Stack

| Capa | Tecnología | Versión |
|------|-----------|---------|
| Runtime | Node.js | LTS |
| Framework | Vite + React | 19 / 6 |
| UI | React + Lucide React | ^19.1 |
| Estilos | Tailwind CSS | ^3.4 |
| Deploy | Vercel + GitHub | — |

## Structure

```
src/
  App.tsx          # componente raíz (única ruta)
  main.tsx         # entrypoint
  index.css        # estilos globales + Tailwind
  components/      # componentes extraídos de App.tsx cuando crecen
    IosHandoffModal.tsx
  lib/
    publicStats.ts # contadores en vivo desde Firestore
    attribution.ts # marca el origen de las descargas — ver abajo
  legal/           # /terminos y /privacidad (main.tsx elige página por pathname)
    titular.ts     # datos del titular: un campo a null se pinta "Pendiente" en ámbar
```

## Atribución de descargas

Cada botón de descarga marca de dónde viene el usuario, para que la app le sirva
el enlace de afiliado correcto. El modelo completo está en `[ATRIBUCION]` del
CLAUDE.md de `true-trading-v2`; aquí sólo la mitad web:

- **Android** — `playUrlFor()` añade `&referrer=` a la URL de Play. ⚠️ El valor
  va **URL-encoded entero**: en crudo, Play se queda con el primer par y
  descarta el resto. Es invisible para el usuario y no lleva diálogo.
- **iOS** — no hay equivalente, así que se deja un código en el portapapeles.
  Antes de ir a la App Store se explica con `IosHandoffModal`: al abrir la app,
  iOS pedirá permiso para pegarlo, y sin contexto previo la gente lo rechaza.
- `navigator.clipboard.writeText` **exige un gesto de usuario**. El tap del
  botón del diálogo lo es; un `await` previo rompe esa cadena en Safari.
- `markDownloadClick` resuelve cuando el portapapeles ya está escrito (tope de
  400 ms) para poder navegar sin cortar la escritura a medias. El ping al
  backend va con `keepalive` y no se espera.
- **El diálogo va en un portal a `document.body`.** Se monta dentro de los
  bloques de descarga y el del hero cuelga de un contenedor con `transform`, que
  crea stacking context: ahí dentro un `position: fixed` deja de ser relativo al
  viewport y el mockup del teléfono se pinta encima.

## Commands

- `npm run dev` — servidor de desarrollo
- `npm run build` — build de producción (`tsc -b && vite build`)
- `npm run preview` — previsualizar build

## Conventions

- **Naming:** componentes PascalCase, hooks `use` + camelCase, handlers `handle` + evento
- **Imports:** alias `@/` si se configura; lucide-react para iconos
- **Estado:** hooks locales — sin store externa (proyecto estático)
- **Prohibido:** `console.log` residual, `any` en TypeScript, índice como `key` en listas

## Pages / Routes

| Ruta | Componente | Auth |
|------|-----------|------|
| `/` | `App.tsx` | — |
| `/terminos` | `legal/Terminos.tsx` | — |
| `/privacidad` | `legal/Privacidad.tsx` | — |

La app enlaza a `/terminos` y `/privacidad` desde login, perfil y normas del chat: no cambiar esas rutas. Si la app cambia (datos que trata, proveedores, afiliación), actualizar los textos y `ULTIMA_ACTUALIZACION`.

## Criterio de DONE

- Sin errores TypeScript (`tsc --noEmit`)
- Sin errores de consola en dev
- Responsive mobile-first verificado visualmente

## Errores prohibidos

- No `any` en props de componentes
- No `outline: none` sin reemplazo visible de foco
- No imagen sin `alt`

## Checks

```
tsc --noEmit          # tipos
npm run build         # compilación completa
```
