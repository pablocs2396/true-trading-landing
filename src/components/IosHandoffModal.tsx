import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { ClipboardCheck, X } from 'lucide-react'

/**
 * Aviso previo a la App Store (sólo iOS).
 *
 * Por qué existe: en iPhone no hay forma de que la app sepa que el usuario
 * viene de esta web salvo dejarle un código en el portapapeles, y al abrir la
 * app iOS le preguntará si permite pegarlo. Un usuario al que le aparece ese
 * modal sin contexto lo rechaza — y con razón. Así que se explica ANTES, aquí,
 * mientras todavía está en un sitio que reconoce.
 *
 * El texto tiene tres trabajos y ninguno es técnico:
 *   1. Decir qué va a pasar, sin pedir permiso para nada raro.
 *   2. Avisar de que no copie otra cosa por el camino (si no, se pierde).
 *   3. Quitar hierro: no hay datos personales y caduca solo.
 *
 * El botón de confirmar es también el gesto de usuario que autoriza el
 * `writeText` — `navigator.clipboard` no funciona fuera de uno.
 *
 * ⚠️ Va en un PORTAL a `document.body`, y no es opcional: se monta dentro de
 * los bloques de descarga, y el del hero cuelga de un contenedor animado con
 * `transform`. Un `transform` crea stacking context, así que ahí dentro un
 * `position: fixed` deja de posicionarse respecto al viewport y su `z-50`
 * compite sólo con sus hermanos — el mockup del teléfono se pintaba ENCIMA del
 * diálogo.
 */

type Props = {
  open: boolean
  onConfirm: () => void
  onCancel: () => void
  busy?: boolean
}

export default function IosHandoffModal({ open, onConfirm, onCancel, busy }: Props) {
  const confirmRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!open) return

    // Foco en la acción principal y Esc para salir: es un diálogo, tiene que
    // comportarse como tal aunque sea de una sola pantalla.
    confirmRef.current?.focus()

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onCancel()
    }
    document.addEventListener('keydown', onKey)

    // Sin esto el fondo hace scroll bajo el diálogo en iOS.
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = previousOverflow
    }
  }, [open, onCancel])

  if (!open) return null

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-end justify-center sm:items-center"
      style={{ background: 'rgba(0,0,0,0.72)', backdropFilter: 'blur(6px)' }}
      onClick={onCancel}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="ios-handoff-title"
        className="relative w-full max-w-md m-0 sm:m-6 p-6 sm:p-7"
        style={{
          background: '#1E1E1E',
          border: '1px solid #2C2C2C',
          borderRadius: '24px 24px 0 0',
          boxShadow: '0 -20px 60px rgba(0,0,0,0.6)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onCancel}
          aria-label="Cerrar"
          className="absolute right-4 top-4 rounded-full p-1.5 transition-colors"
          style={{ color: '#6B7280' }}
        >
          <X size={18} />
        </button>

        <div
          className="mb-4 flex h-11 w-11 items-center justify-center rounded-full"
          style={{ background: 'rgba(16,185,129,0.12)', color: '#10B981' }}
        >
          <ClipboardCheck size={20} />
        </div>

        <h2
          id="ios-handoff-title"
          className="mb-2 text-xl font-bold tracking-tight"
          style={{ color: '#FFFFFF', letterSpacing: '-0.02em' }}
        >
          Un paso rápido antes de descargar
        </h2>

        <p className="mb-5 text-sm" style={{ color: '#9CA3AF', lineHeight: 1.7 }}>
          Vamos a copiar un código en tu portapapeles. Es lo que le dice a la app que vienes
          desde aquí, para darte el acceso que te corresponde.
        </p>

        <ol className="mb-5 space-y-3">
          {[
            'Descarga TrueTrading y ábrela.',
            'Te preguntará si puede pegar el código. Dile que sí.',
            'Ya está. Sigue con el registro normal.',
          ].map((step, i) => (
            <li key={step} className="flex gap-3 text-sm" style={{ color: '#F3F4F6' }}>
              <span
                className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full text-[11px] font-bold"
                style={{ background: '#2A2A2A', color: '#9CA3AF' }}
              >
                {i + 1}
              </span>
              <span style={{ lineHeight: 1.6 }}>{step}</span>
            </li>
          ))}
        </ol>

        <p
          className="mb-5 rounded-xl px-3.5 py-3 text-[13px]"
          style={{ background: '#161616', border: '1px solid #2C2C2C', color: '#9CA3AF', lineHeight: 1.6 }}
        >
          Mientras tanto, intenta no copiar nada más — el código se sobrescribiría. No lleva
          ningún dato personal y caduca solo en 24 horas.
        </p>

        <button
          ref={confirmRef}
          onClick={onConfirm}
          disabled={busy}
          className="btn-primary w-full justify-center"
          style={busy ? { opacity: 0.6 } : undefined}
        >
          {busy ? 'Un momento...' : 'Continuar a la App Store'}
        </button>

        <button
          onClick={onCancel}
          className="mt-2 w-full py-2.5 text-[13px] font-medium transition-colors"
          style={{ color: '#6B7280', background: 'transparent', border: 'none', cursor: 'pointer' }}
        >
          Ahora no
        </button>
      </div>
    </div>,
    document.body,
  )
}
