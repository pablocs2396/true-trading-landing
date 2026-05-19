# CLAUDE.md — True Trading Landing

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
```

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
