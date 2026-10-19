/**
 * Datos identificativos del titular (LSSI art. 10 y RGPD art. 13).
 *
 * El titular es una LLC de EE. UU., no una sociedad española: el número fiscal
 * es un EIN, no un NIF. Al ofrecer el servicio a usuarios de la UE, el RGPD le
 * aplica igualmente (art. 3.2).
 *
 * ⚠️ Mientras un campo valga `null` la página lo pinta en ámbar como
 * "pendiente". No publicar /terminos ni /privacidad con huecos.
 */
export const TITULAR: {
  razonSocial: string
  forma: string
  ein: string
  domicilio: string
  emailLegal: string | null
} = {
  razonSocial: 'True Trading Hub, LLC',
  forma: 'Sociedad de responsabilidad limitada (LLC) constituida en Nuevo México, EE. UU.',
  ein: '33-4409376',
  domicilio: '1209 Mountain Road PL NE, Ste N, Albuquerque, NM 87110, EE. UU.',
  /** La app muestra este email en la pantalla de afiliación pendiente. Confirmar que sirve para temas legales. */
  emailLegal: 'soporte@truetrading.com',
}

export const ULTIMA_ACTUALIZACION = '19 de octubre de 2026'
export const SOPORTE_TELEGRAM = 'https://t.me/dudas_truetrading'
