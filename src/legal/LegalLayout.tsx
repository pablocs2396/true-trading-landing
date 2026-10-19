import { useEffect, type ReactNode } from 'react'
import { ArrowLeft } from 'lucide-react'
import { TITULAR, ULTIMA_ACTUALIZACION } from './titular'

export interface LegalSection {
  id: string
  title: string
  body: ReactNode
}

interface LegalLayoutProps {
  title: string
  description: string
  path: '/terminos' | '/privacidad'
  intro: ReactNode
  sections: LegalSection[]
}

/**
 * Esqueleto común de /terminos y /privacidad: cabecera, índice lateral en
 * escritorio (en línea en móvil) y secciones numeradas con ancla, para poder
 * enlazar un punto concreto desde la app o desde soporte.
 */
export default function LegalLayout({ title, description, path, intro, sections }: LegalLayoutProps) {
  useEffect(() => {
    document.title = `${title} — TrueTrading`
    document.querySelector('meta[name="description"]')?.setAttribute('content', description)
    document.querySelector('link[rel="canonical"]')?.setAttribute('href', `https://www.truetrading.es${path}`)
  }, [title, description, path])

  return (
    <div style={{ background: '#121212', minHeight: '100vh', color: '#FFFFFF' }}>
      <header className="px-6 py-5" style={{ borderBottom: '1px solid #252525' }}>
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <a href="/" className="flex items-center gap-2 legal-link rounded-md">
            <img src="/logo.png" alt="True Trading" className="w-6 h-6 rounded-md" />
            <span className="text-sm font-semibold tracking-tight">TrueTrading</span>
          </a>
          <a href="/" className="legal-link inline-flex items-center gap-1.5 text-sm rounded-md" style={{ color: '#9CA3AF' }}>
            <ArrowLeft size={14} aria-hidden="true" />
            Volver al inicio
          </a>
        </div>
      </header>

      <main className="px-6 pt-16 pb-24">
        <div className="max-w-6xl mx-auto">
          <h1 className="font-bold leading-tight mb-3" style={{ fontSize: 'clamp(32px, 5vw, 52px)', letterSpacing: '-0.03em' }}>
            {title}
          </h1>
          <p className="text-sm mb-12" style={{ color: '#6B7280' }}>
            Última actualización: {ULTIMA_ACTUALIZACION}
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-12 lg:gap-16">
            <nav aria-label="Índice" className="lg:sticky lg:top-8 self-start">
              <p className="text-xs font-semibold mb-3" style={{ color: '#9CA3AF' }}>En esta página</p>
              <ol className="space-y-2 text-sm">
                {sections.map((s, n) => (
                  <li key={s.id}>
                    <a href={`#${s.id}`} className="legal-link rounded-sm" style={{ color: '#6B7280' }}>
                      {n + 1}. {s.title}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>

            <article className="legal-prose" style={{ maxWidth: '68ch' }}>
              <div className="mb-12">{intro}</div>
              {sections.map((s, n) => (
                <section key={s.id} id={s.id} className="mb-12 scroll-mt-8">
                  <h2>{n + 1}. {s.title}</h2>
                  {s.body}
                </section>
              ))}
            </article>
          </div>
        </div>
      </main>

      <footer className="px-6 py-10" style={{ borderTop: '1px solid #252525' }}>
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row gap-4 sm:gap-8 text-xs" style={{ color: '#4B5563' }}>
          <span>© {new Date().getFullYear()} True Trading Hub, LLC</span>
          <a href="/terminos" className="footer-link legal-link rounded-sm" aria-current={path === '/terminos' ? 'page' : undefined}>Términos y condiciones</a>
          <a href="/privacidad" className="footer-link legal-link rounded-sm" aria-current={path === '/privacidad' ? 'page' : undefined}>Política de privacidad</a>
        </div>
      </footer>
    </div>
  )
}

/** Hueco sin rellenar en `titular.ts`. Bien visible para que no se publique así. */
function Pending({ label }: { label: string }) {
  return (
    <mark className="rounded px-1.5 py-0.5 text-xs font-medium" style={{ background: 'rgba(245,158,11,0.15)', color: '#F59E0B' }}>
      Pendiente: {label}
    </mark>
  )
}

export function Dato({ value, label }: { value: string | null; label: string }) {
  return value ? <>{value}</> : <Pending label={label} />
}

/** Ficha del titular, compartida por los dos documentos. */
export function FichaTitular() {
  return (
    <dl className="legal-dl">
      <dt>Titular</dt>
      <dd>{TITULAR.razonSocial}</dd>
      <dt>Forma</dt>
      <dd>{TITULAR.forma}</dd>
      <dt>EIN</dt>
      <dd>{TITULAR.ein}</dd>
      <dt>Domicilio</dt>
      <dd>{TITULAR.domicilio}</dd>
      <dt>Contacto</dt>
      <dd>
        {TITULAR.emailLegal
          ? <a href={`mailto:${TITULAR.emailLegal}`}>{TITULAR.emailLegal}</a>
          : <Pending label="email de contacto" />}
      </dd>
    </dl>
  )
}
