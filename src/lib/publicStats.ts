import { useEffect, useRef, useState } from 'react'

/**
 * Public Firebase config for the True Trading app (project `truetrading-app`).
 * These are public identifiers by design — access is gated by Firestore rules,
 * and this landing only ever reads the world-readable `config/publicStats` doc.
 */
const firebaseConfig = {
  apiKey: 'AIzaSyDNrXLrmIOfjL1iO2YXjZAoptXzpgERwzM',
  authDomain: 'truetrading-app.firebaseapp.com',
  projectId: 'truetrading-app',
  storageBucket: 'truetrading-app.firebasestorage.app',
  messagingSenderId: '334655190554',
  appId: '1:334655190554:web:8ef34d9ec7446bbea043a3',
}

export interface PublicStats {
  registrados: number | null
  analisis: number | null
}

/**
 * Live subscription to `config/publicStats`. Firebase is loaded lazily via
 * dynamic import so it lands in its own chunk and never blocks the initial
 * paint. Returns nulls until the first snapshot arrives (or forever, silently,
 * if Firebase is unreachable) so callers can fall back to static copy.
 */
export function usePublicStats(): PublicStats {
  const [stats, setStats] = useState<PublicStats>({ registrados: null, analisis: null })

  useEffect(() => {
    let cancelled = false
    let unsub: (() => void) | undefined

    ;(async () => {
      try {
        const [{ initializeApp, getApps }, { getFirestore, doc, onSnapshot }] = await Promise.all([
          import('firebase/app'),
          import('firebase/firestore'),
        ])
        if (cancelled) return
        const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig)
        const db = getFirestore(app)
        unsub = onSnapshot(
          doc(db, 'config', 'publicStats'),
          (snap) => {
            const data = snap.data()
            if (!data) return
            setStats({
              registrados: typeof data.registrados === 'number' ? data.registrados : null,
              analisis: typeof data.analisis === 'number' ? data.analisis : null,
            })
          },
          // Network/permission errors: keep the static fallback, no console noise.
          () => {},
        )
      } catch {
        // Firebase failed to load — the landing keeps its static numbers.
      }
    })()

    return () => {
      cancelled = true
      if (unsub) unsub()
    }
  }, [])

  return stats
}

/**
 * Ease a number toward `target` with a cubic-out tween whenever it changes,
 * so a live increment animates instead of snapping. Returns null while there is
 * no live value yet (caller shows static copy).
 */
export function useCountUp(target: number | null, duration = 900): number | null {
  const [value, setValue] = useState<number | null>(null)
  const fromRef = useRef(0)

  useEffect(() => {
    if (target == null) return
    const from = fromRef.current
    const start = performance.now()
    let raf = 0
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration)
      const eased = 1 - Math.pow(1 - t, 3)
      setValue(Math.round(from + (target - from) * eased))
      if (t < 1) {
        raf = requestAnimationFrame(tick)
      } else {
        fromRef.current = target
      }
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [target, duration])

  return target == null ? null : value
}

// Spanish thousands grouping with "." — done manually rather than via
// Intl.NumberFormat because es-ES omits the separator on 4-digit numbers
// (1754 → "1754"), and "1.754" reads better as a marketing figure. Integer
// counts only, so no decimal handling needed. 1754 → "1.754", 405 → "405".
export function formatCount(n: number): string {
  return Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
}
