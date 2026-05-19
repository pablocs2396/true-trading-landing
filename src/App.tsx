import { useEffect, useRef, useState } from 'react'
import { TrendingUp, TrendingDown, BookOpen, MessageSquare, BarChart3, ChevronDown, ChevronRight, FileText, Flame, Trophy, Zap, Lock, CheckCircle, Check, Megaphone } from 'lucide-react'

const APP_STORE_URL = 'https://apps.apple.com/es/app/truetrading/id6758015608'
const GOOGLE_PLAY_URL = 'https://play.google.com/store/apps/details?id=com.truetrading.android&hl=es_419'

/* ─── Store logos ─────────────────────────────────────────────── */
function AppStoreLogo({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
    </svg>
  )
}

function AndroidLogo({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.523 15.341c-.551 0-.999-.449-.999-1s.448-.999.999-.999.999.448.999.999-.448 1-.999 1m-11.046 0c-.551 0-.999-.449-.999-1s.448-.999.999-.999.999.448.999.999-.448 1-.999 1m11.405-6.02l1.997-3.459a.416.416 0 00-.152-.568.416.416 0 00-.568.152l-2.022 3.503A11.33 11.33 0 0012 7.851c-1.854 0-3.59.393-5.137 1.099L4.841 5.447a.416.416 0 00-.568-.152.416.416 0 00-.152.568l1.997 3.459C2.689 10.187.343 13.233 0 17h24c-.344-3.767-2.689-6.813-6.118-8.679"/>
    </svg>
  )
}

/* ─── Platform detection hook ────────────────────────────────── */
function usePlatform() {
  const [platform] = useState(() => {
    const ua = navigator.userAgent
    const isIOS = /iPhone|iPad|iPod/i.test(ua)
    const isAndroid = /Android/i.test(ua)
    return { isIOS, isAndroid, isMobile: isIOS || isAndroid }
  })
  return platform
}

/* ─── Scroll reveal hook ──────────────────────────────────────── */
function useScrollReveal<T extends Element>() {
  const ref = useRef<T>(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true) },
      { threshold: 0.08 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return { ref, inView }
}

/* ─── Download buttons ────────────────────────────────────────── */
function DownloadButtons() {
  const { isAndroid } = usePlatform()
  return (
    <div className="flex flex-wrap gap-3">
      <a href={APP_STORE_URL} className={isAndroid ? 'btn-ghost' : 'btn-primary'}>
        <AppStoreLogo size={14} />
        App Store
      </a>
      <a href={GOOGLE_PLAY_URL} className={isAndroid ? 'btn-primary' : 'btn-ghost'}>
        <AndroidLogo size={14} />
        Google Play
      </a>
    </div>
  )
}

/* ─── Phone mockup with real app UI ──────────────────────────── */
function PhoneMockup() {
  return (
    <div className="relative flex justify-center">
      {/* Glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 60% 50% at 50% 60%, rgba(16,185,129,0.08) 0%, transparent 70%)',
        }}
      />

      {/* Phone frame */}
      <div
        className="relative phone-float"
        style={{
          width: '260px',
          borderRadius: '38px',
          background: '#1E1E1E',
          border: '1px solid #2C2C2C',
          boxShadow: '0 40px 80px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.06)',
          overflow: 'hidden',
          padding: '12px 0 0',
        }}
      >
        {/* Notch */}
        <div className="flex justify-center mb-3">
          <div style={{ width: '80px', height: '22px', background: '#000', borderRadius: '11px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#2A2A2A', border: '1px solid #252525' }} />
            <div style={{ width: '52px', height: '8px', borderRadius: '4px', background: '#2A2A2A' }} />
          </div>
        </div>

        {/* App content */}
        <div style={{ padding: '0 14px', paddingBottom: '80px', background: '#121212' }}>
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div>
              <p style={{ fontSize: '11px', color: '#10B981', fontWeight: '600', marginBottom: '2px' }}>Buenos días</p>
              <p style={{ fontSize: '17px', fontWeight: '800', color: '#FFFFFF', letterSpacing: '-0.02em' }}>Carlos R.</p>
            </div>
            {/* Avatar with signal dot */}
            <div className="relative">
              <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#2A2A2A', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontSize: '13px', fontWeight: '700', color: '#FFFFFF' }}>C</span>
              </div>
              <div style={{ position: 'absolute', bottom: '0', right: '0', width: '10px', height: '10px', borderRadius: '50%', background: '#10B981', border: '2px solid #111111' }} />
            </div>
          </div>

          {/* Racha card */}
          <div style={{ background: '#1E1E1E', border: '1px solid rgba(16,185,129,0.25)', borderRadius: '14px', padding: '12px 14px', marginBottom: '14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div className="flex items-center gap-2.5">
              <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(16,185,129,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Flame size={14} strokeWidth={0} fill="#10B981" style={{ color: '#10B981' }} />
              </div>
              <div>
                <p style={{ fontSize: '11px', fontWeight: '700', color: '#FFFFFF' }}>Racha diaria</p>
                <p style={{ fontSize: '10px', color: '#6B7280' }}>7 días seguidos</p>
              </div>
            </div>
            <span style={{ fontSize: '22px', fontWeight: '800', color: '#10B981', letterSpacing: '-0.03em' }}>7</span>
          </div>

          {/* Signal section */}
          <p style={{ fontSize: '9px', fontWeight: '700', color: '#6B7280', letterSpacing: '1px', marginBottom: '8px', textTransform: 'uppercase' }}>Última señal</p>
          <div style={{ background: '#1E1E1E', border: '1px solid #2C2C2C', borderRadius: '14px', overflow: 'hidden', marginBottom: '14px' }}>
            {/* Signal top bar */}
            <div style={{ borderTop: '2px solid #10B981', padding: '12px 14px' }}>
              <div className="flex items-center gap-2 mb-2">
                <span style={{ fontSize: '9px', fontWeight: '700', background: 'rgba(16,185,129,0.15)', color: '#10B981', padding: '2px 6px', borderRadius: '4px', display: 'flex', alignItems: 'center', gap: '3px' }}>
                  <TrendingUp size={8} strokeWidth={2.5} /> BUY
                </span>
                <span style={{ fontSize: '12px', fontWeight: '700', color: '#FFFFFF' }}>EUR/USD</span>
                <div className="ml-auto flex items-center gap-1">
                  <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10B981' }} />
                  <span style={{ fontSize: '9px', color: '#10B981', fontWeight: '600' }}>Activa</span>
                </div>
              </div>
              <div className="flex gap-3">
                <div>
                  <p style={{ fontSize: '9px', color: '#6B7280', marginBottom: '1px' }}>Entrada</p>
                  <p style={{ fontSize: '11px', color: '#FFFFFF', fontWeight: '600' }}>1.0850</p>
                </div>
                <div>
                  <p style={{ fontSize: '9px', color: '#6B7280', marginBottom: '1px' }}>TP</p>
                  <p style={{ fontSize: '11px', color: '#10B981', fontWeight: '600' }}>1.0920</p>
                </div>
                <div>
                  <p style={{ fontSize: '9px', color: '#6B7280', marginBottom: '1px' }}>SL</p>
                  <p style={{ fontSize: '11px', color: '#EF4444', fontWeight: '600' }}>1.0810</p>
                </div>
              </div>
            </div>
          </div>

          {/* Ranking preview */}
          <p style={{ fontSize: '9px', fontWeight: '700', color: '#6B7280', letterSpacing: '1px', marginBottom: '8px', textTransform: 'uppercase' }}>Top reacciones</p>
          <div style={{ background: '#1E1E1E', border: '1px solid #2C2C2C', borderRadius: '14px', padding: '10px 14px' }}>
            {[
              { pos: '1', name: 'MarcoT', pips: '+384', color: '#F59E0B' },
              { pos: '2', name: 'SofíaV', pips: '+291', color: '#9CA3AF' },
              { pos: '3', name: 'CarlosR', pips: '+218', color: '#B45309' },
            ].map(r => (
              <div key={r.pos} className="flex items-center gap-2 py-1.5">
                <span style={{ fontSize: '10px', fontWeight: '700', color: r.color, width: '13px', textAlign: 'center' }}>{r.pos}</span>
                <span style={{ fontSize: '11px', color: '#FFFFFF', flex: 1 }}>{r.name}</span>
                <span style={{ fontSize: '11px', color: '#10B981', fontWeight: '600' }}>{r.pips}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Floating pill tab bar */}
        <div
          style={{
            position: 'absolute',
            bottom: '16px',
            left: '12px',
            right: '12px',
            background: 'rgba(18,18,18,0.95)',
            backdropFilter: 'blur(16px)',
            borderRadius: '40px',
            padding: '6px 8px',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            border: '1px solid #2C2C2C',
            boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
          }}
        >
          {/* Active tab — Inicio */}
          <div style={{ background: '#FFFFFF', borderRadius: '30px', padding: '6px 12px 6px 6px', display: 'flex', alignItems: 'center', gap: '6px', flexShrink: 0 }}>
            <div style={{ width: '30px', height: '30px', borderRadius: '50%', background: '#000000', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg viewBox="0 0 24 24" width="14" height="14" fill="#FFFFFF"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>
            </div>
            <span style={{ fontSize: '11px', fontWeight: '600', color: '#000000', whiteSpace: 'nowrap' }}>Inicio</span>
          </div>
          {/* Inactive tabs */}
          {[
            <svg key="chats" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#8E8E93" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>,
            <svg key="diary" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#8E8E93" strokeWidth="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>,
            <svg key="tools" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#8E8E93" strokeWidth="2"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>,
          ].map((icon, i) => (
            <div key={i} style={{ flex: 1, height: '42px', borderRadius: '50%', border: '1px solid #2C2C2C', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {icon}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ─── Navbar ──────────────────────────────────────────────────── */
function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const { isAndroid } = usePlatform()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const downloadHref = isAndroid ? GOOGLE_PLAY_URL : APP_STORE_URL

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        background: 'rgba(18,18,18,0.92)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderBottom: `1px solid ${scrolled ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.06)'}`,
        transition: 'border-color 250ms cubic-bezier(0.23, 1, 0.32, 1)',
      }}
    >
      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <img src="/icon.png" alt="TrueTrading" className="w-7 h-7 rounded-lg" />
          <span className="text-white font-semibold text-[15px] tracking-tight">
            TrueTrading
          </span>
        </div>
        <a href={downloadHref} className="btn-nav">
          {isAndroid ? <AndroidLogo size={12} /> : <AppStoreLogo size={12} />}
          Descargar
        </a>
      </div>
    </nav>
  )
}

/* ─── Hero ────────────────────────────────────────────────────── */
function Hero() {
  return (
    <section className="min-h-screen flex items-center pt-14 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-center py-8 lg:py-0 lg:min-h-screen">

          {/* Copy — left */}
          <div>
            <h1
              className="text-white font-black leading-[0.92] mb-4 lg:mb-7 hero-title"
              style={{
                fontSize: 'clamp(40px, 7vw, 92px)',
                letterSpacing: '-0.04em',
              }}
            >
              Trading
              <br />
              sin
              <br />
              mentiras.
            </h1>
            <p
              className="mb-6 lg:mb-10 leading-relaxed hero-subtitle"
              style={{
                color: '#9CA3AF',
                fontSize: 'clamp(15px, 1.6vw, 19px)',
                maxWidth: '400px',
                lineHeight: '1.65',
              }}
            >
              Accedes a las señales cuando demuestras que sabes operar.
              No antes. Eso es TrueTrading.
            </p>
            <div className="hero-actions">
              <DownloadButtons />
              <p className="mt-4 lg:mt-6 text-xs" style={{ color: '#4B5563' }}>
                Gratis · iOS & Android
              </p>
            </div>
          </div>

          {/* Phone mockup — right */}
          <div className="flex justify-center items-start lg:items-center" style={{ height: '460px' }}>
            <div className="scale-[0.82] lg:scale-100 origin-top">
              <PhoneMockup />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─── Stats bar ───────────────────────────────────────────────── */
function StatsBar() {
  const { ref, inView } = useScrollReveal<HTMLDivElement>()

  const items = [
    { display: '+10.000', label: 'traders activos', delay: 0 },
    { display: '+500', label: 'análisis publicados', delay: 100 },
    { display: '2', label: 'plataformas (iOS · Android)', delay: 200 },
  ]
  return (
    <div ref={ref} className="py-14 px-6" style={{ borderTop: '1px solid #2C2C2C' }}>
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row gap-10 sm:gap-20">
          {items.map((it) => (
            <div
              key={it.label}
              className={`reveal ${inView ? 'in-view' : ''}`}
              style={{ animationDelay: `${it.delay}ms` }}
            >
              <span
                className="block tabular-nums"
                style={{
                  color: '#F3F4F6',
                  fontSize: '44px',
                  fontWeight: 700,
                  letterSpacing: '-0.04em',
                  lineHeight: 1,
                }}
              >
                {it.display}
              </span>
              <span
                className="block mt-2.5"
                style={{ color: '#6B7280', fontSize: '13px', lineHeight: 1.4 }}
              >
                {it.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ─── El acceso se gana ────────────────────────────────────────── */
function MeritAccess() {
  const { ref, inView } = useScrollReveal<HTMLDivElement>()

  return (
    <section className="py-32 px-6" style={{ borderTop: '1px solid #252525' }}>
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Copy */}
          <div>
            <p className="text-xs font-medium tracking-[0.15em] uppercase mb-4" style={{ color: '#10B981' }}>
              Diferencial
            </p>
            <h2
              className="text-white font-bold leading-tight mb-6"
              style={{ fontSize: 'clamp(32px, 4vw, 52px)', letterSpacing: '-0.035em' }}
            >
              El acceso
              <br />
              se gana.
            </h2>
            <p className="text-sm mb-8" style={{ color: '#9CA3AF', lineHeight: '1.75', maxWidth: '420px' }}>
              En TrueTrading no entras directamente a las señales. Primero completas los minicursos, demuestras que entiendes el riesgo y entonces solicitas acceso.
              Así la comunidad que opera sabe lo que hace.
            </p>
            <div
              className="inline-flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-xl"
              style={{ background: 'rgba(16,185,129,0.06)', border: '1px solid rgba(16,185,129,0.15)', color: '#10B981' }}
            >
              <CheckCircle size={14} strokeWidth={2} />
              Sin atajos. Sin pagar por señales. Solo mérito.
            </div>
          </div>

          {/* Steps flow */}
          <div ref={ref} className="flex flex-col gap-3">
            {[
              {
                step: '01',
                icon: BookOpen,
                label: 'Completa los minicursos',
                desc: 'Desde fundamentos hasta gestión del riesgo. A tu ritmo, sin presión.',
                color: '#10B981',
                active: true,
              },
              {
                step: '02',
                icon: Lock,
                label: 'Solicita acceso',
                desc: 'Una vez completada la formación, envías tu solicitud de afiliación.',
                color: '#F59E0B',
                active: false,
              },
              {
                step: '03',
                icon: Zap,
                label: 'Opera con criterio',
                desc: 'Señales reales, análisis semanal y comunidad de traders verificados.',
                color: '#10B981',
                active: false,
              },
            ].map((s, i) => {
              const Icon = s.icon
              return (
                <div
                  key={s.step}
                  className={`flex items-start gap-4 p-5 rounded-2xl step-card reveal ${inView ? 'in-view' : ''}`}
                  style={{
                    background: s.active ? 'rgba(16,185,129,0.04)' : '#1E1E1E',
                    border: `1px solid ${s.active ? 'rgba(16,185,129,0.2)' : 'rgba(255,255,255,0.06)'}`,
                    animationDelay: `${i * 80}ms`,
                  }}
                >
                  <div
                    className="shrink-0 w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ background: `${s.color}12`, border: `1px solid ${s.color}25` }}
                  >
                    <Icon size={16} strokeWidth={1.5} style={{ color: s.color }} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span style={{ fontSize: '10px', fontWeight: '700', color: '#4B5563', letterSpacing: '0.08em' }}>{s.step}</span>
                      <h3 className="font-semibold text-sm" style={{ color: '#FFFFFF', letterSpacing: '-0.01em' }}>{s.label}</h3>
                    </div>
                    <p className="text-xs" style={{ color: '#6B7280', lineHeight: '1.6' }}>{s.desc}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─── Bento: Signal card mockup ───────────────────────────────── */
function SignalMockup() {
  const tps = [
    { label: 'TP1', price: '1.0892', pips: '+42', hit: true },
    { label: 'TP2', price: '1.0934', pips: '+84', hit: false },
  ]
  return (
    <div className="rounded-xl overflow-hidden" style={{ background: '#000000', border: '1px solid #2C2C2C', borderTop: '2px solid #10B981' }}>
      {/* Section label — same style as app */}
      <div className="px-4 pt-3 pb-0">
        <span style={{ fontSize: '10px', fontWeight: '700', color: '#6B7280', letterSpacing: '1.2px' }}>ÚLTIMA SEÑAL</span>
      </div>
      <div className="p-4">
        <div className="flex items-center gap-2 mb-4">
          <span className="inline-flex items-center gap-1 text-xs font-bold px-2 py-1 rounded" style={{ background: 'rgba(16,185,129,0.15)', color: '#10B981' }}>
            <TrendingUp size={10} strokeWidth={2.5} /> BUY
          </span>
          <span className="font-semibold text-sm" style={{ color: '#FFFFFF' }}>EUR/USD</span>
          {/* Status dot */}
          <div className="ml-auto flex items-center gap-1.5 px-2 py-1 rounded-full" style={{ background: 'rgba(16,185,129,0.1)' }}>
            <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#10B981' }} />
            <span style={{ fontSize: '10px', color: '#10B981', fontWeight: '600' }}>Activa</span>
          </div>
        </div>
        <div className="text-xs mb-3" style={{ color: '#4B5563' }}>Entrada · 1.0850</div>
        <div className="flex flex-col gap-1.5 mb-3">
          {tps.map(tp => (
            <div key={tp.label} className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs" style={{ background: tp.hit ? 'rgba(16,185,129,0.08)' : '#1E1E1E', border: `1px solid ${tp.hit ? 'rgba(16,185,129,0.2)' : 'rgba(255,255,255,0.06)'}` }}>
              <span style={{ color: '#4B5563', width: '24px' }}>{tp.label}</span>
              <span className="font-tabular flex-1" style={{ color: '#FFFFFF' }}>{tp.price}</span>
              <span className="flex items-center gap-1" style={{ color: tp.hit ? '#10B981' : '#4B5563' }}>
                {tp.hit ? <Check size={10} strokeWidth={2.5} /> : <ChevronRight size={10} strokeWidth={2} />}
                {tp.pips}
              </span>
            </div>
          ))}
        </div>
        <div className="text-xs" style={{ color: '#4B5563' }}>SL · 1.0822</div>
      </div>

      {/* Second signal — SELL, closed */}
      <div className="p-4" style={{ borderTop: '1px solid #252525', borderLeft: '2px solid #EF4444' }}>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1 text-xs font-bold px-2 py-1 rounded" style={{ background: 'rgba(239,68,68,0.12)', color: '#EF4444' }}>
            <TrendingDown size={10} strokeWidth={2.5} /> SELL
          </span>
          <span className="font-semibold text-xs" style={{ color: '#9CA3AF' }}>GBP/USD</span>
          <span className="ml-auto text-xs font-bold font-tabular" style={{ color: '#10B981' }}>+67 pips</span>
          <span className="text-xs px-1.5 py-0.5 rounded" style={{ background: '#1E1E1E', color: '#6B7280' }}>Cerrada</span>
        </div>
      </div>
    </div>
  )
}

/* ─── Bento: Racha + Ranking ───────────────────────────────────── */
function StreakRankingMockup() {
  const ranking = [
    { pos: '1', name: 'MarcoT.', pips: '+384', color: '#F59E0B' },
    { pos: '2', name: 'SofíaV.', pips: '+291', color: '#9CA3AF' },
    { pos: '3', name: 'CarlosR.', pips: '+218', color: '#B45309' },
    { pos: '4', name: 'AnaM.', pips: '+195', color: '#4B5563' },
  ]
  return (
    <div className="flex flex-col gap-3">
      {/* Racha */}
      <div className="flex items-center justify-between p-4 rounded-xl" style={{ background: '#000000', border: '1px solid rgba(16,185,129,0.25)' }}>
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: 'rgba(16,185,129,0.1)' }}>
            <Flame size={16} strokeWidth={0} fill="#10B981" style={{ color: '#10B981' }} />
          </div>
          <div>
            <p className="text-xs font-semibold" style={{ color: '#FFFFFF' }}>Racha diaria</p>
            <p className="text-xs" style={{ color: '#6B7280' }}>7 días seguidos</p>
          </div>
        </div>
        <span className="font-bold font-tabular" style={{ color: '#10B981', fontSize: '24px', letterSpacing: '-0.03em' }}>7</span>
      </div>

      {/* Ranking */}
      <div className="p-3 rounded-xl" style={{ background: '#000000', border: '1px solid #2C2C2C' }}>
        <p style={{ fontSize: '10px', fontWeight: '700', color: '#6B7280', letterSpacing: '1.2px', marginBottom: '10px' }}>TOP REACCIONES</p>
        <div className="flex flex-col gap-2">
          {ranking.map((r) => (
            <div key={r.name} className="flex items-center gap-3">
              <span style={{ fontSize: '10px', fontWeight: '700', width: '20px', color: r.color }}>{r.pos}</span>
              <span className="flex-1 text-xs font-medium" style={{ color: '#FFFFFF' }}>{r.name}</span>
              <span className="text-xs font-bold font-tabular" style={{ color: '#10B981' }}>{r.pips}</span>
            </div>
          ))}
        </div>
        <div className="mt-3 pt-3 flex items-center justify-center gap-1" style={{ borderTop: '1px solid #252525' }}>
          <Trophy size={10} style={{ color: '#10B981' }} strokeWidth={2} />
          <span style={{ fontSize: '10px', color: '#10B981', fontWeight: '600' }}>Ver ranking completo</span>
        </div>
      </div>
    </div>
  )
}

/* ─── Bento: Diary stats mockup ───────────────────────────────── */
function DiaryMockup() {
  const stats = [
    { label: 'Win Rate', value: '68%', positive: true },
    { label: 'Total Pips', value: '+842', positive: true },
    { label: 'Operaciones', value: '47', positive: null },
    { label: 'Racha actual', value: '+5', positive: true },
  ]
  const bars = [40, 65, 30, 80, 55, 90, 45, 70, 60, 85]
  return (
    <div className="rounded-xl overflow-hidden" style={{ background: '#000000', border: '1px solid #2C2C2C' }}>
      <div className="p-4 grid grid-cols-2 gap-2">
        {stats.map(s => (
          <div key={s.label} className="rounded-lg p-3" style={{ background: '#1E1E1E' }}>
            <div className="text-xs mb-1.5" style={{ color: '#4B5563' }}>{s.label}</div>
            <div className="font-bold font-tabular" style={{ color: s.positive === true ? '#10B981' : '#FFFFFF', fontSize: '20px', letterSpacing: '-0.03em' }}>{s.value}</div>
          </div>
        ))}
      </div>
      <div className="px-4 pb-4">
        <div className="text-xs mb-2" style={{ color: '#4B5563' }}>Pips por operación</div>
        <div className="flex items-end gap-1 h-10">
          {bars.map((h, i) => (
            <div key={i} className="flex-1 rounded-sm" style={{ height: `${h}%`, background: h > 50 ? 'rgba(16,185,129,0.5)' : 'rgba(239,68,68,0.35)' }} />
          ))}
        </div>
      </div>
    </div>
  )
}

/* ─── Bento: Courses mockup ────────────────────────────────────── */
function CoursesMockup() {
  const courses = [
    { title: 'Fundamentos del Trading', level: 'Básico', lessons: 6, done: true, levelColor: '#10B981' },
    { title: 'Análisis Técnico', level: 'Intermedio', lessons: 11, done: true, levelColor: '#F59E0B' },
    { title: 'Gestión del Riesgo', level: 'Avanzado', lessons: 8, done: false, levelColor: '#EF4444' },
  ]
  return (
    <div className="flex flex-col gap-2">
      {/* Progress */}
      <div className="px-3 py-2.5 rounded-xl flex items-center gap-3" style={{ background: '#1E1E1E', border: '1px solid rgba(16,185,129,0.2)' }}>
        <div className="flex-1">
          <div className="flex justify-between mb-1.5">
            <span className="text-xs font-medium" style={{ color: '#FFFFFF' }}>Progreso general</span>
            <span className="text-xs font-bold font-tabular" style={{ color: '#10B981' }}>67%</span>
          </div>
          <div className="h-1.5 rounded-full" style={{ background: 'rgba(255,255,255,0.08)' }}>
            <div className="h-full rounded-full" style={{ width: '67%', background: '#10B981' }} />
          </div>
        </div>
      </div>
      {courses.map(c => (
        <div key={c.title} className="flex items-center gap-3 p-3 rounded-xl" style={{ background: '#1E1E1E', border: `1px solid ${c.done ? 'rgba(16,185,129,0.12)' : 'rgba(255,255,255,0.06)'}` }}>
          <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ background: c.done ? 'rgba(16,185,129,0.1)' : '#2A2A2A' }}>
            {c.done
              ? <CheckCircle size={14} strokeWidth={2} style={{ color: '#10B981' }} />
              : <BookOpen size={14} strokeWidth={1.5} style={{ color: c.levelColor }} />
            }
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium truncate" style={{ color: '#FFFFFF' }}>{c.title}</p>
            <p className="text-xs" style={{ color: '#4B5563' }}>{c.lessons} lecciones</p>
          </div>
          <span className="text-xs font-medium px-2 py-0.5 rounded-full shrink-0" style={{ background: `${c.levelColor}18`, color: c.levelColor }}>{c.level}</span>
        </div>
      ))}
      <div className="flex items-center gap-3 p-3 rounded-xl" style={{ background: '#1E1E1E', border: '1px solid #252525' }}>
        <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ background: '#2A2A2A' }}>
          <FileText size={14} strokeWidth={1.5} style={{ color: '#6B7280' }} />
        </div>
        <div className="flex-1">
          <p className="text-xs font-medium" style={{ color: '#FFFFFF' }}>Guías en PDF</p>
          <p className="text-xs" style={{ color: '#4B5563' }}>Descarga y consulta offline</p>
        </div>
      </div>
    </div>
  )
}

/* ─── Bento: Community channels mockup ───────────────────────── */
function CommunityMockup() {
  const channels = [
    { Icon: Zap, name: 'Señales', desc: 'Alertas en tiempo real', badge: 3 },
    { Icon: FileText, name: 'Análisis', desc: 'Técnico y fundamental', badge: 0 },
    { Icon: MessageSquare, name: 'General', desc: 'Comunidad de traders', badge: 12 },
    { Icon: Megaphone, name: 'Anuncios', desc: 'Novedades de la app', badge: 1 },
  ]
  return (
    <div className="flex flex-col gap-1.5">
      {channels.map(ch => (
        <div key={ch.name} className="flex items-center gap-3 px-3 py-2.5 rounded-xl" style={{ background: ch.name === 'Señales' ? 'rgba(16,185,129,0.07)' : '#1E1E1E', border: `1px solid ${ch.name === 'Señales' ? 'rgba(16,185,129,0.15)' : 'rgba(255,255,255,0.06)'}` }}>
          <span className="w-6 flex items-center justify-center">
            <ch.Icon size={13} strokeWidth={1.5} style={{ color: ch.name === 'Señales' ? '#10B981' : '#6B7280' }} />
          </span>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium" style={{ color: '#FFFFFF' }}>{ch.name}</p>
            <p className="text-xs truncate" style={{ color: '#4B5563' }}>{ch.desc}</p>
          </div>
          {ch.badge > 0 && (
            <span className="text-xs font-bold min-w-[18px] h-[18px] flex items-center justify-center rounded-full px-1" style={{ background: '#10B981', color: '#000' }}>{ch.badge}</span>
          )}
        </div>
      ))}
    </div>
  )
}

/* ─── Features bento grid ─────────────────────────────────────── */
function Features() {
  const { ref, inView } = useScrollReveal<HTMLDivElement>()

  return (
    <section className="py-32 px-6" style={{ borderTop: '1px solid #252525' }}>
      <div className="max-w-6xl mx-auto">
        <div className={`mb-16 reveal ${inView ? 'in-view' : ''}`}>
          <p className="text-xs font-medium tracking-[0.15em] uppercase mb-4" style={{ color: '#10B981' }}>La plataforma</p>
          <h2 className="text-white font-bold leading-tight" style={{ fontSize: 'clamp(32px, 4vw, 52px)', letterSpacing: '-0.035em' }}>
            Todo lo que necesitas
            <br />para operar mejor.
          </h2>
        </div>

        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-auto">

          {/* Señales — spans 2 cols */}
          <div className={`lg:col-span-2 rounded-2xl p-6 flex flex-col gap-6 bento-card reveal ${inView ? 'in-view' : ''}`} style={{ background: '#1E1E1E', border: '1px solid #252525', animationDelay: '0ms' }}>
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Zap size={16} style={{ color: '#10B981' }} strokeWidth={1.5} />
                <h3 className="font-semibold text-base" style={{ color: '#FFFFFF', letterSpacing: '-0.01em' }}>Señales de trading</h3>
              </div>
              <p className="text-sm" style={{ color: '#6B7280', lineHeight: '1.6' }}>Entrada, TP y SL claros. Con estado en tiempo real — Activa, En sesión, Cerrada. Sin ambigüedad.</p>
            </div>
            <SignalMockup />
          </div>

          {/* Racha + Ranking — 1 col */}
          <div className={`rounded-2xl p-6 flex flex-col gap-5 bento-card reveal ${inView ? 'in-view' : ''}`} style={{ background: '#1E1E1E', border: '1px solid #252525', animationDelay: '60ms' }}>
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Trophy size={16} style={{ color: '#10B981' }} strokeWidth={1.5} />
                <h3 className="font-semibold text-base" style={{ color: '#FFFFFF', letterSpacing: '-0.01em' }}>Racha y ranking</h3>
              </div>
              <p className="text-sm" style={{ color: '#6B7280', lineHeight: '1.6' }}>Tu racha diaria y el ranking mensual de la comunidad. La constancia tiene recompensa.</p>
            </div>
            <StreakRankingMockup />
          </div>

          {/* Formación — 1 col */}
          <div className={`rounded-2xl p-6 flex flex-col gap-5 bento-card reveal ${inView ? 'in-view' : ''}`} style={{ background: '#1E1E1E', border: '1px solid #252525', animationDelay: '120ms' }}>
            <div>
              <div className="flex items-center gap-2 mb-2">
                <BookOpen size={16} style={{ color: '#10B981' }} strokeWidth={1.5} />
                <h3 className="font-semibold text-base" style={{ color: '#FFFFFF', letterSpacing: '-0.01em' }}>Formación</h3>
              </div>
              <p className="text-sm" style={{ color: '#6B7280', lineHeight: '1.6' }}>Los mismos minicursos que completas para ganar acceso. Básico, intermedio y avanzado.</p>
            </div>
            <CoursesMockup />
          </div>

          {/* Comunidad */}
          <div className={`rounded-2xl p-6 flex flex-col gap-5 bento-card reveal ${inView ? 'in-view' : ''}`} style={{ background: '#1E1E1E', border: '1px solid #252525', animationDelay: '160ms' }}>
            <div>
              <div className="flex items-center gap-2 mb-2">
                <MessageSquare size={16} style={{ color: '#10B981' }} strokeWidth={1.5} />
                <h3 className="font-semibold text-base" style={{ color: '#FFFFFF', letterSpacing: '-0.01em' }}>Comunidad</h3>
              </div>
              <p className="text-sm" style={{ color: '#6B7280', lineHeight: '1.6' }}>Canales temáticos con traders verificados. Señales, análisis, noticias y debate.</p>
            </div>
            <CommunityMockup />
          </div>

          {/* Diario — spans 2 cols */}
          <div className={`lg:col-span-2 rounded-2xl p-6 flex flex-col gap-5 bento-card reveal ${inView ? 'in-view' : ''}`} style={{ background: '#1E1E1E', border: '1px solid #252525', animationDelay: '200ms' }}>
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <BarChart3 size={16} style={{ color: '#10B981' }} strokeWidth={1.5} />
                  <h3 className="font-semibold text-base" style={{ color: '#FFFFFF', letterSpacing: '-0.01em' }}>Diario de trading</h3>
                </div>
                <p className="text-sm" style={{ color: '#6B7280', lineHeight: '1.6', maxWidth: '360px' }}>Conecta Myfxbook y sincroniza tus operaciones reales automáticamente. Win rate, pips, racha. Sin excusas.</p>
              </div>
              <span className="text-xs font-medium px-3 py-1.5 rounded-full self-start shrink-0" style={{ background: 'rgba(16,185,129,0.1)', color: '#10B981', border: '1px solid rgba(16,185,129,0.2)' }}>
                Sincroniza con Myfxbook
              </span>
            </div>
            <DiaryMockup />
          </div>

        </div>
      </div>
    </section>
  )
}

/* ─── Testimonials ─────────────────────────────────────────────── */
const testimonials = [
  {
    initials: 'CR',
    name: 'Carlos R.',
    role: 'Trader de Forex · 7 días de racha',
    quote: 'Lo que me enganchó fue que no me dejaron entrar a las señales sin hacer los cursos. Eso dice mucho de la filosofía de la app.',
    metric: '+68% win rate',
    color: '#10B981',
  },
  {
    initials: 'MA',
    name: 'María A.',
    role: 'Inversora particular · Nivel intermedio',
    quote: 'Empecé desde cero. Tres meses después tengo racha de 12 días y entiendo por qué cada señal tiene sentido.',
    metric: '12 días de racha',
    color: '#10B981',
  },
  {
    initials: 'JS',
    name: 'Javier S.',
    role: 'Day trader · Top 3 ranking',
    quote: 'El ranking mensual me motiva a publicar resultados reales. Hay comunidad de verdad, no bots ni hype.',
    metric: '#2 en ranking',
    color: '#F59E0B',
  },
  {
    initials: 'PL',
    name: 'Paula L.',
    role: 'Swing trader · Myfxbook conectado',
    quote: 'El diario conectado a Myfxbook me cambió cómo analizo mis semanas. Por fin veo mis errores reales.',
    metric: '+210 pips este mes',
    color: '#10B981',
  },
]

function Testimonials() {
  const { ref, inView } = useScrollReveal<HTMLDivElement>()

  return (
    <section className="py-32 px-6" style={{ borderTop: '1px solid #252525' }}>
      <div className="max-w-6xl mx-auto">
        <div className="mb-16">
          <p className="text-xs font-medium tracking-[0.15em] uppercase mb-4" style={{ color: '#10B981' }}>
            Comunidad
          </p>
          <h2 className="text-white font-bold leading-tight" style={{ fontSize: 'clamp(32px, 4vw, 52px)', letterSpacing: '-0.035em' }}>
            Lo que dicen
            <br />los traders.
          </h2>
        </div>

        <div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {testimonials.map((t, i) => (
            <div
              key={t.name}
              className={`rounded-2xl p-6 flex flex-col gap-5 bento-card reveal ${inView ? 'in-view' : ''}`}
              style={{ background: '#1E1E1E', border: '1px solid #252525', animationDelay: `${i * 70}ms` }}
            >
              <p className="text-sm flex-1" style={{ color: '#9CA3AF', lineHeight: '1.7' }}>
                "{t.quote}"
              </p>
              <div className="inline-flex self-start text-xs font-medium px-3 py-1.5 rounded-full font-tabular" style={{ background: `${t.color}12`, color: t.color, border: `1px solid ${t.color}25` }}>
                {t.metric}
              </div>
              <div className="flex items-center gap-3 pt-1" style={{ borderTop: '1px solid #252525' }}>
                <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-xs font-bold" style={{ background: '#2A2A2A', color: '#6B7280' }}>
                  {t.initials}
                </div>
                <div>
                  <p className="text-xs font-medium" style={{ color: '#FFFFFF' }}>{t.name}</p>
                  <p className="text-xs" style={{ color: '#4B5563' }}>{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── Manifesto ───────────────────────────────────────────────── */
function Manifesto() {
  const { ref, inView } = useScrollReveal<HTMLElement>()
  return (
    <section ref={ref} className="py-32 px-6" style={{ borderTop: '1px solid #252525' }}>
      <div className="max-w-6xl mx-auto">
        <p
          className={`font-bold leading-tight reveal ${inView ? 'in-view' : ''}`}
          style={{ color: '#FFFFFF', fontSize: 'clamp(28px, 4vw, 52px)', letterSpacing: '-0.03em', maxWidth: '760px' }}
        >
          "Las señales sin criterio son ruido.{' '}
          <span style={{ color: '#686868' }}>
            El criterio se aprende. Nosotros te lo enseñamos."
          </span>
        </p>
      </div>
    </section>
  )
}

/* ─── FAQ ─────────────────────────────────────────────────────── */
const faqs = [
  {
    q: '¿Es gratuita la app?',
    a: 'Sí, TrueTrading es gratuita para descargar en iOS y Android. El acceso a señales, formación y comunidad está incluido.',
  },
  {
    q: '¿Por qué necesito completar cursos antes de acceder a las señales?',
    a: 'Porque operar sin entender el riesgo es peligroso. En TrueTrading creemos que las señales son útiles solo si el trader sabe interpretarlas. Por eso el acceso se gana, no se compra.',
  },
  {
    q: '¿Qué mercados se analizan?',
    a: 'Principalmente Forex (pares de divisas), índices bursátiles y materias primas. Las señales incluyen dirección, entrada, take profit y stop loss con estado en tiempo real.',
  },
  {
    q: '¿Cómo funciona el Diario de Trading?',
    a: 'Conecta tu cuenta de Myfxbook y tus operaciones se sincronizan automáticamente. Verás tu win rate, pips totales, historial y estadísticas detalladas.',
  },
  {
    q: '¿Qué es la racha diaria?',
    a: 'La racha mide los días consecutivos que accedes a la app. Es un recordatorio de que la constancia es parte del juego. Los traders con más racha aparecen en el ranking de la comunidad.',
  },
]

function FAQItem({ q, a }: { q: string; a: string; i: number }) {
  const [open, setOpen] = useState(false)
  return (
    <div
      style={{
        borderBottom: '1px solid #252525',
        transition: 'border-color 200ms cubic-bezier(0.23, 1, 0.32, 1)',
      }}
    >
      <button
        onClick={() => setOpen(o => !o)}
        className="faq-btn w-full flex items-center justify-between gap-4 py-5 text-left"
        style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}
        aria-expanded={open}
      >
        <span
          className="font-medium text-sm"
          style={{
            color: open ? '#FFFFFF' : '#9CA3AF',
            transition: 'color 200ms cubic-bezier(0.23, 1, 0.32, 1)',
          }}
        >
          {q}
        </span>
        <ChevronDown
          size={16}
          strokeWidth={1.5}
          style={{
            color: open ? '#10B981' : '#4B5563',
            transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 280ms cubic-bezier(0.23, 1, 0.32, 1), color 200ms cubic-bezier(0.23, 1, 0.32, 1)',
            flexShrink: 0,
          }}
        />
      </button>
      {/* Grid rows trick: animates to actual content height, not arbitrary max */}
      <div
        style={{
          display: 'grid',
          gridTemplateRows: open ? '1fr' : '0fr',
          transition: open
            ? 'grid-template-rows 300ms cubic-bezier(0.23, 1, 0.32, 1)'
            : 'grid-template-rows 200ms cubic-bezier(0.55, 0, 1, 0.45)',
        }}
      >
        <div style={{ overflow: 'hidden', minHeight: 0 }}>
          <p
            className="pb-5 text-sm"
            style={{
              color: '#6B7280',
              lineHeight: '1.7',
              opacity: open ? 1 : 0,
              transform: open ? 'translateY(0)' : 'translateY(-4px)',
              transition: open
                ? 'opacity 250ms 60ms cubic-bezier(0.23, 1, 0.32, 1), transform 250ms 60ms cubic-bezier(0.23, 1, 0.32, 1)'
                : 'opacity 120ms cubic-bezier(0.55, 0, 1, 0.45), transform 120ms cubic-bezier(0.55, 0, 1, 0.45)',
            }}
          >
            {a}
          </p>
        </div>
      </div>
    </div>
  )
}

function FAQ() {
  const { ref, inView } = useScrollReveal<HTMLDivElement>()
  return (
    <section className="py-32 px-6" style={{ borderTop: '1px solid #252525' }}>
      <div className="max-w-6xl mx-auto">
        <div ref={ref} className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div className={`reveal ${inView ? 'in-view' : ''}`}>
            <p className="text-xs font-medium tracking-[0.15em] uppercase mb-4" style={{ color: '#10B981' }}>FAQ</p>
            <h2 className="text-white font-bold leading-tight" style={{ fontSize: 'clamp(28px, 3.5vw, 44px)', letterSpacing: '-0.03em' }}>
              Preguntas
              <br />frecuentes.
            </h2>
          </div>
          <div className={`reveal ${inView ? 'in-view' : ''}`} style={{ animationDelay: '80ms' }}>
            {faqs.map((f, i) => (
              <FAQItem key={i} i={i} q={f.q} a={f.a} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─── CTA ─────────────────────────────────────────────────────── */
function CTASection() {
  const { ref, inView } = useScrollReveal<HTMLElement>()
  return (
    <section ref={ref} className="py-40 px-6" style={{ borderTop: '1px solid #252525' }}>
      <div className="max-w-6xl mx-auto">
        <p className="text-xs font-medium tracking-[0.15em] uppercase mb-6" style={{ color: '#10B981' }}>
          Empieza gratis
        </p>
        <h2
          className={`text-white font-black leading-none mb-6 reveal ${inView ? 'in-view' : ''}`}
          style={{ fontSize: 'clamp(48px, 8vw, 104px)', letterSpacing: '-0.045em' }}
        >
          Empieza
          <br />
          hoy.
        </h2>
        <p className="mb-10 text-base" style={{ color: '#6B7280', maxWidth: '360px', lineHeight: '1.65' }}>
          Descarga TrueTrading gratis. Sin compromisos, sin excusas.
        </p>
        <DownloadButtons />
      </div>
    </section>
  )
}

/* ─── Footer ──────────────────────────────────────────────────── */
function Footer() {
  return (
    <footer className="px-6 py-10" style={{ borderTop: '1px solid #252525', background: '#121212' }}>
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="flex items-center gap-2">
          <img src="/icon.png" alt="TrueTrading" className="w-5 h-5 rounded-md opacity-60" />
          <span className="text-xs" style={{ color: '#4B5563' }}>© 2025 TrueTrading</span>
        </div>
        <div className="flex items-center gap-8">
          <a href="/privacidad" className="footer-link text-xs" style={{ color: '#4B5563' }}>Privacidad</a>
          <a href="/terminos" className="footer-link text-xs" style={{ color: '#4B5563' }}>Términos</a>
          <a href="mailto:hola@truetrading.app" className="footer-link text-xs" style={{ color: '#4B5563' }}>Contacto</a>
        </div>
      </div>
    </footer>
  )
}

/* ─── Root ────────────────────────────────────────────────────── */
export default function App() {
  return (
    <div style={{ background: '#121212', minHeight: '100vh', color: '#FFFFFF' }}>
      <Navbar />
      <Hero />
      <StatsBar />
      <MeritAccess />
      <Features />
      <Testimonials />
      <Manifesto />
      <FAQ />
      <CTASection />
      <Footer />
    </div>
  )
}
