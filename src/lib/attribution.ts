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
 * Marca esta descarga y devuelve, sin esperar a nada, el control al llamante.
 *
 * ⚠️ Tiene que invocarse DENTRO del handler del click, de forma síncrona hasta
 * el `writeText`: `navigator.clipboard` exige gesto de usuario y un `await`
 * previo rompe esa cadena en Safari.
 */
export function markDownloadClick(campaign: string): void {
  const token = newToken()
  const platform = detectPlatform()

  // Capa A — portapapeles. Puede fallar por permisos, por contexto no seguro o
  // porque el navegador no lo soporta: da igual, queda la capa B.
  try {
    void navigator.clipboard?.writeText(token)?.catch(() => {})
  } catch {
    /* sin portapapeles, seguimos */
  }

  // Capa B — registro del click con la IP de salida.
  // `keepalive` es lo que hace que la petición sobreviva a la navegación a la
  // store que ocurre inmediatamente después. Sin él, el navegador la cancela.
  try {
    void fetch(REGISTER_CLICK_URL, {
      method: 'POST',
      keepalive: true,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token, platform, campaign }),
    }).catch(() => {})
  } catch {
    /* red caída: el usuario se descarga la app igual, sin atribución */
  }
}
