# TrueTrading Landing — Design System

## Filosofía

**Premium y seria.** Blackrock-vibes: sobria, de confianza, sin artificios. Tipografía fuerte, mucho espacio, color mínimo. Nada de AI slop, nada de cripto-gamer, nada de stock photos corporativos.

Referencia de tono: Bloomberg Terminal aesthetics trasladado a web moderna. Stripe para el ritmo de layout. Sequoia Capital para la sobriedad.

---

## Color

Extraído del sistema de diseño de la app móvil (dark-first, blanco/negro como primarios).

### Paleta base (dark mode forced en landing)

| Token | Hex | Uso |
|---|---|---|
| `background` | `#121212` | Fondo base de página |
| `surface` | `#1E1E1E` | Cards, secciones elevadas |
| `surfaceAlt` | `#2A2A2A` | Hover states, dividers |
| `border` | `#2C2C2C` | Líneas, separadores |
| `primary` | `#FFFFFF` | Texto principal, botón primario BG |
| `primaryForeground` | `#000000` | Texto sobre botón primario |
| `textSecondary` | `#9CA3AF` | Subtítulos, body secundario |
| `textMuted` | `#6B7280` | Labels, footnotes |

### Acento semántico (uso muy controlado)

| Token | Hex | Uso |
|---|---|---|
| `success` | `#10B981` | Iconos de beneficio, check marks |
| `warning` | `#F59E0B` | Solo si hay disclaimer o aviso |

> Regla: el verde `#10B981` puede aparecer puntualmente como acento en iconografía de "retorno positivo" o checks. Nunca como color dominante.

---

## Tipografía

### Fuentes

- **Display / Headings:** `Geist` (sans-serif geométrico, moderno sin ser frío)
- **Body:** `Inter` (legible, estándar fintech)
- **Mono (opcional, detalles):** `Geist Mono` — para datos numéricos, tickers

### Escala tipográfica

| Nombre | Tamaño | Peso | Uso |
|---|---|---|---|
| `display` | 72–96px | 700 | Hero headline |
| `h1` | 48–56px | 700 | Títulos de sección |
| `h2` | 32–36px | 600 | Subtítulos |
| `h3` | 20–24px | 600 | Cards, features |
| `body-lg` | 18px | 400 | Lead text, descripción hero |
| `body` | 16px | 400 | Body general |
| `small` | 14px | 400 | Labels, captions |
| `mono` | 14px | 500 | Datos numéricos |

### Reglas

- Line-height largo en body: 1.7
- Tracking apretado en headlines grandes: `-0.02em` a `-0.04em`
- Sin text-transform uppercase en headings — la fuerza viene del peso y tamaño
- Nunca más de 65-70 chars por línea en body

---

## Espaciado

Sistema de 8px. Secciones con padding generoso: `120px` vertical mínimo en desktop. El espacio en blanco (negro en este caso) es parte del diseño.

---

## Componentes

### Botón primario (CTA descarga)
- BG: `#FFFFFF`
- Text: `#000000`
- Border-radius: `8px`
- Padding: `14px 28px`
- Font: `Inter 500 16px`
- Hover: BG `#E5E7EB`, transición `0.15s ease`
- Sin sombras, sin gradientes

### Botón secundario / ghost
- BG: `transparent`
- Border: `1px solid #2C2C2C`
- Text: `#9CA3AF`
- Hover: border `#6B7280`, text `#F3F4F6`

### Cards de feature
- BG: `#1E1E1E`
- Border: `1px solid #2C2C2C`
- Border-radius: `12px`
- Padding: `32px`
- Sin box-shadow pesado — solo border sutil

### Glassmorphism (uso mínimo, solo hero si aplica)
- Backdrop-blur: `16px`
- BG: `rgba(255,255,255,0.05)`
- Border: `1px solid rgba(255,255,255,0.08)`
- Solo en el hero si hay elemento flotante decorativo

---

## Iconografía

- Librería: `lucide-react` (líneas finas, consistente con la estética)
- Tamaño estándar: `20px` en features, `24px` en hero
- Color: `#FFFFFF` sobre superficie oscura; `#10B981` cuando es un check/beneficio

---

## Layout

- Max-width contenido: `1200px`
- Grid: 12 columnas, gap `24px`
- Navegación: sticky, fondo `rgba(18,18,18,0.92)` con backdrop-blur
- Mobile-first: breakpoints en `640px / 768px / 1024px / 1280px`

---

## Movimiento

- Animaciones: solo `opacity` + `translateY` al hacer scroll (sin bounce, sin elastic)
- Duración: `0.4s ease-out` — nunca más lento
- Sin parallax agresivo
- `prefers-reduced-motion` respetado

---

## Anti-patrones (prohibido)

- Stock photos de hombres con traje mirando gráficas
- Verde neón / gradientes de cripto
- Emojis como iconografía
- Glassmorphism exagerado (más de un elemento por sección)
- Sombras de colores (glow effects)
- Fuentes decorativas o serif (no es un periódico financiero, es fintech)
- Carruseles / sliders automáticos
- Contadores animados de "X usuarios registrados" genéricos
