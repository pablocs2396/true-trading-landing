/**
 * Atribución del origen de instalación.
 *
 * Marca las descargas que salen de esta landing para que la app, en su primer
 * arranque, pueda servir un enlace de afiliado de VTMarkets distinto al de
 * quien llegó a la store por su cuenta.
 *
 * Dos mecanismos, según plataforma:
 *
 *   Android — el parámetro `referrer` de la URL de Play (ver GOOGLE_PLAY_URL en
 *   App.tsx). Google lo entrega a la app vía Play Install Referrer API. Es
 *   determinista y se puede leer meses después de la instalación, así que no
 *   necesita nada de este módulo.
 *
 *   iOS — no existe equivalente (y Firebase Dynamic Links está apagado desde
 *   ago-2025), así que se combinan dos capas de best-effort:
 *     A. un token en el portapapeles, que la app lee y canjea;
 *     B. un ping al backend con la IP de salida, que la app vuelve a presentar
 *        al arrancar (fingerprint probabilístico, como Branch/AppsFlyer).
 *
 * Ambas capas se ejecutan también en Android: son inocuas y cubren el caso de
 * abrir en un iPhone un enlace compartido desde un Android.
 *
 * NADA de esto puede bloquear la navegación a la store. Todo va en try/catch y
 * el `fetch` usa `keepalive` para sobrevivir a que la página se descargue.
 */

const REGISTER_CLICK_URL =
  'https://us-central1-truetrading-app.cloudfunctions.net/registerLandingClick'

/** El backend valida contra este mismo formato — ver functions/src/attribution.ts */
function newToken(): string {
  const uuid =
    typeof crypto !== 'undefined' && 'randomUUID' in crypto
      ? crypto.randomUUID()
      : // Fallback para navegadores sin randomUUID (o contextos no seguros).
        // No necesita ser criptográficamente fuerte: el token sólo tiene que
        // ser irrepetible entre usuarios, y caduca en 24 h.
        Array.from({ length: 8 }, () => Math.floor(Math.random() * 16).toString(16)).join('') +
        '-' +
        Date.now().toString(16)
  return `TT-LND-${uuid}`
}

function detectPlatform(): 'ios' | 'android' | 'unknown' {
  const ua = navigator.userAgent
  if (/iPhone|iPad|iPod/i.test(ua)) return 'ios'
  if (/Android/i.test(ua)) return 'android'
  return 'unknown'
}

/**
 * Tope de espera al portapapeles antes de navegar. El `writeText` tarda
 * milisegundos, pero si el navegador se atasca no se deja al usuario mirando un
 * botón muerto: se sigue a la store igual y queda la capa B.
 */
const CLIPBOARD_DEADLINE_MS = 400

/**
 * Marca esta descarga. Resuelve cuando el portapapeles ya está escrito (o se ha
 * descartado), para que el llamante pueda navegar a la store SIN cortar la
 * escritura a medias.
 *
 * ⚠️ Tiene que invocarse DENTRO del handler del click, de forma síncrona hasta
 * el `writeText`: `navigator.clipboard` exige gesto de usuario y un `await`
 * previo rompe esa cadena en Safari. El tap sobre el botón del modal de
 * confirmación es un gesto igual de válido que el del enlace.
 */
export function markDownloadClick(campaign: string): Promise<void> {
  const token = newToken()
  const platform = detectPlatform()

  // Capa A — portapapeles. Puede fallar por permisos, por contexto no seguro o
  // porque el navegador no lo soporta: da igual, queda la capa B.
  let clipboard: Promise<void>
  try {
    clipboard = navigator.clipboard?.writeText(token)?.catch(() => {}) ?? Promise.resolve()
  } catch {
    clipboard = Promise.resolve()
  }

  // Capa B — registro del click con la IP de salida.
  //
  // ⚠️ `Content-Type: text/plain` y NO `application/json`, aunque el cuerpo sea
  // JSON. Con `application/json` la petición deja de ser "simple" y el navegador
  // manda antes un preflight OPTIONS; al navegar a la store acto seguido, ese
  // preflight se cancela y el POST no llega a salir. `keepalive` no cubre el
  // preflight. Verificado contra producción: el click no se registraba.
  // `text/plain` es un tipo simple, así que la petición sale directa.
  //
  // `sendBeacon` es la API pensada exactamente para esto —encolar un envío que
  // sobreviva a que la página se descargue— y no la puede cancelar la
  // navegación. El `fetch` con `keepalive` queda de reserva para navegadores
  // que no lo tengan o lo rechacen (devuelve false si la cola está llena).
  const body = JSON.stringify({ token, platform, campaign })
  try {
    const queued = navigator.sendBeacon?.(
      REGISTER_CLICK_URL,
      new Blob([body], { type: 'text/plain' }),
    )
    if (!queued) {
      void fetch(REGISTER_CLICK_URL, {
        method: 'POST',
        keepalive: true,
        headers: { 'Content-Type': 'text/plain' },
        body,
      }).catch(() => {})
    }
  } catch {
    /* red caída: el usuario se descarga la app igual, sin atribución */
  }

  return Promise.race([
    clipboard,
    new Promise<void>((resolve) => setTimeout(resolve, CLIPBOARD_DEADLINE_MS)),
  ])
}

/** `true` si conviene explicar el paso del portapapeles antes de ir a la store. */
export function needsIosHandoff(): boolean {
  return detectPlatform() === 'ios'
}
