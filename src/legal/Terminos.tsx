import LegalLayout, { FichaTitular, type LegalSection } from './LegalLayout'
import { SOPORTE_TELEGRAM, TITULAR } from './titular'

const sections: LegalSection[] = [
  {
    id: 'titular',
    title: 'Quién ofrece TrueTrading',
    body: (
      <>
        <p>
          La web www.truetrading.es y la app TrueTrading para iOS y Android (en conjunto, «TrueTrading»)
          son un servicio de:
        </p>
        <FichaTitular />
      </>
    ),
  },
  {
    id: 'que-es',
    title: 'Qué es TrueTrading y qué no es',
    body: (
      <>
        <p>
          TrueTrading es una plataforma de <strong>formación y comunidad</strong> sobre trading: minicursos
          en vídeo, PDFs, análisis de mercado, señales con fines educativos, un diario de operaciones, un
          asistente con inteligencia artificial (AntonIA) y chats con otros usuarios.
        </p>
        <ul>
          <li><strong>No somos un bróker.</strong> No abrimos cuentas de inversión, no recibimos tu dinero y no ejecutamos operaciones por ti.</li>
          <li><strong>No prestamos asesoramiento financiero personalizado.</strong> No somos una empresa de servicios de inversión autorizada por la CNMV ni por ningún otro supervisor financiero. Ningún contenido de TrueTrading es una recomendación adaptada a tu situación personal.</li>
          <li><strong>No gestionamos carteras</strong> ni copiamos operaciones en tu cuenta de forma automática.</li>
        </ul>
        <p>Tú decides si operas, cuándo y con cuánto dinero. Esa decisión y su resultado son solo tuyos.</p>
      </>
    ),
  },
  {
    id: 'riesgo',
    title: 'Aviso de riesgo',
    body: (
      <>
        <p className="legal-callout">
          Los CFD y el Forex son instrumentos complejos y apalancados, con un riesgo alto de perder dinero
          rápidamente. La mayoría de las cuentas de inversores minoristas pierden dinero operando con CFD;
          cada bróker regulado publica su porcentaje. Plantéate si entiendes cómo funcionan y si puedes permitirte
          perder lo que inviertes.
        </p>
        <ul>
          <li>Los resultados pasados de señales, análisis o de otros usuarios no garantizan resultados futuros.</li>
          <li>Las cifras de pips, win rate o rentabilidad que se ven en la app pueden no incluir comisiones, swaps, deslizamientos ni la diferencia de precios entre brókers.</li>
          <li>No operes con dinero que necesites ni con dinero prestado.</li>
        </ul>
      </>
    ),
  },
  {
    id: 'cuenta',
    title: 'Tu cuenta',
    body: (
      <>
        <ul>
          <li>Tienes que tener <strong>18 años o más</strong> para registrarte.</li>
          <li>Los datos que nos des deben ser verdaderos y tuyos. Una persona, una cuenta.</li>
          <li>Eres responsable de guardar tu contraseña. Si crees que alguien ha entrado en tu cuenta, avísanos cuanto antes.</li>
          <li>Puedes eliminar tu cuenta cuando quieras desde <strong>Perfil → Eliminar cuenta</strong>.</li>
        </ul>
      </>
    ),
  },
  {
    id: 'acceso',
    title: 'Acceso completo y relación con VT Markets',
    body: (
      <>
        <p>
          TrueTrading es gratis: no tiene suscripciones ni compras dentro de la app. Así nos financiamos:
        </p>
        <ul>
          <li>
            El acceso completo (señales, análisis, comunidad) se desbloquea viendo los 13 minicursos y
            teniendo una cuenta en el bróker <strong>VT Markets</strong> abierta con nuestro enlace de
            afiliado, o trasladada a nuestro código si ya la tenías.
          </li>
          <li>
            <strong>VT Markets nos paga una comisión</strong> relacionada con la actividad de las cuentas que
            llegan a través de nosotros. Esa comisión la paga el bróker: TrueTrading no te cobra nada.
            Te lo contamos para que sepas que tenemos un interés económico en que abras esa cuenta.
          </li>
          <li>
            VT Markets es una empresa independiente de TrueTrading. Tu relación con ellos (depósitos,
            retiradas, ejecución de órdenes, verificación de identidad) se rige por sus propios términos.
            No respondemos de lo que haga o deje de hacer el bróker.
          </li>
          <li>
            Antes de abrir cualquier cuenta, comprueba qué entidad de VT Markets te la ofrece, quién la
            regula y qué protección tienes como cliente en tu país.
          </li>
        </ul>
        <h3>Estados de la cuenta</h3>
        <ul>
          <li><strong>Pendiente:</strong> tienes acceso a los minicursos mientras validamos tu afiliación.</li>
          <li><strong>Afiliado:</strong> acceso completo.</li>
          <li><strong>Rechazado:</strong> no hemos podido validar la afiliación. Escríbenos a soporte y lo revisamos.</li>
          <li><strong>Bloqueado:</strong> acceso suspendido por incumplir estos términos (ver punto 10).</li>
        </ul>
        <p>
          Si la cuenta deja de estar asociada a nuestro código, podemos devolver tu acceso al estado
          pendiente.
        </p>
      </>
    ),
  },
  {
    id: 'contenido',
    title: 'Señales, análisis y AntonIA',
    body: (
      <>
        <p>
          Las señales y los análisis muestran cómo opera y razona nuestro equipo. Se publican con fines
          educativos e informativos y son generales, no se adaptan a tu capital ni a tu perfil. Pueden
          llegar tarde o contener errores, y el mercado puede moverse antes de que las veas.
        </p>
        <p>
          <strong>AntonIA</strong> es un asistente automático basado en inteligencia artificial. Sus
          respuestas, incluido el análisis de las capturas que le envíes, pueden ser incorrectas o
          incompletas. Contrasta cualquier cálculo (lotaje, margen, pips) antes de usarlo en una
          operación real. AntonIA no es una persona ni un asesor.
        </p>
      </>
    ),
  },
  {
    id: 'diario',
    title: 'Diario y Myfxbook',
    body: (
      <>
        <p>
          El diario puede funcionar en modo manual o conectado a Myfxbook. Si lo conectas, nos autorizas a
          consultar en tu nombre los datos de tus cuentas a través de la API oficial de Myfxbook. Las
          estadísticas se calculan con lo que nos devuelve Myfxbook, así que no podemos garantizar que sean
          exactas ni que el servicio de Myfxbook esté siempre disponible.
        </p>
        <p>
          Puedes desconectar Myfxbook cuando quieras desde <strong>Diario → Config</strong>. Cómo tratamos
          esas credenciales se explica en la <a href="/privacidad#datos">política de privacidad</a>.
        </p>
      </>
    ),
  },
  {
    id: 'comunidad',
    title: 'Comunidad y contenido de los usuarios',
    body: (
      <>
        <p>En los chats, en tu perfil y en los resultados que compartas, no se permite:</p>
        <ul>
          <li>Acoso, insultos, amenazas o lenguaje discriminatorio.</li>
          <li>Spam, publicidad no autorizada o captación hacia otros servicios, brókers o grupos de pago.</li>
          <li>Publicar datos personales de otras personas sin su consentimiento.</li>
          <li>Contenido ilegal o fraudulento, o que infrinja derechos de autor.</li>
          <li>Hacerte pasar por otro usuario o por el equipo de TrueTrading.</li>
          <li>Contenido sexual explícito o violento.</li>
          <li>Publicar resultados de trading falsos o manipulados.</li>
        </ul>
        <p>
          Puedes reportar cualquier mensaje manteniéndolo pulsado y bloquear a cualquier usuario.
          Revisamos los reportes en menos de 24 horas y podemos retirar contenido o limitar cuentas.
        </p>
        <p>
          Lo que publiques sigue siendo tuyo. Para que funcione la comunidad, nos das permiso, sin coste y
          mientras siga publicado, para guardarlo y mostrarlo a los demás usuarios dentro de TrueTrading.
          No lo usaremos fuera de la app sin pedírtelo antes.
        </p>
      </>
    ),
  },
  {
    id: 'propiedad',
    title: 'Propiedad intelectual',
    body: (
      <p>
        Los minicursos, PDFs, análisis, textos, marca y diseño de TrueTrading son nuestros o tenemos
        licencia para usarlos. Puedes usarlos para tu formación personal. No puedes descargarlos,
        grabarlos, revenderlos ni redistribuirlos, por ejemplo reenviando señales a otros grupos o canales,
        sin nuestro permiso por escrito.
      </p>
    ),
  },
  {
    id: 'suspension',
    title: 'Suspensión y baja',
    body: (
      <>
        <p>
          Podemos suspender o cerrar tu cuenta si incumples estos términos, si haces un uso fraudulento de
          la afiliación o si lo exige la ley. Salvo en casos graves o urgentes, te avisaremos antes y te
          diremos el motivo.
        </p>
        <p>
          Tú puedes dejar de usar TrueTrading y eliminar tu cuenta en cualquier momento, sin coste.
        </p>
      </>
    ),
  },
  {
    id: 'responsabilidad',
    title: 'Responsabilidad',
    body: (
      <>
        <p>
          Hacemos lo posible para que TrueTrading funcione bien y su contenido sea correcto, pero no
          podemos garantizar que esté siempre disponible ni libre de errores.
        </p>
        <p>
          No respondemos de las pérdidas o ganancias de tus operaciones, ni de lo que hagan terceros como
          VT Markets, Myfxbook o las tiendas de aplicaciones. Nada de lo anterior limita la responsabilidad
          que la ley no permite limitar, como la que se derive de dolo o negligencia grave, ni tus derechos
          como consumidor.
        </p>
      </>
    ),
  },
  {
    id: 'cambios',
    title: 'Cambios en estos términos',
    body: (
      <p>
        Si cambiamos algo importante, lo avisaremos dentro de la app antes de que entre en vigor. Si no
        estás de acuerdo con los cambios, puedes eliminar tu cuenta. La fecha de la última versión está
        siempre al principio de esta página.
      </p>
    ),
  },
  {
    id: 'ley',
    title: 'Ley aplicable',
    body: (
      <p>
        Si eres consumidor y resides en la Unión Europea, te protegen las normas de consumo de tu país
        de residencia, que no se pueden excluir por contrato, y puedes reclamar ante los juzgados de tu
        domicilio. Antes de llegar a eso, escríbenos: casi todo se resuelve hablando.
      </p>
    ),
  },
  {
    id: 'contacto',
    title: 'Contacto',
    body: (
      <p>
        Para cualquier duda sobre estos términos, escríbenos a{' '}
        {TITULAR.emailLegal ? <a href={`mailto:${TITULAR.emailLegal}`}>{TITULAR.emailLegal}</a> : 'nuestro email de contacto'}
        {' '}o por <a href={SOPORTE_TELEGRAM} target="_blank" rel="noopener noreferrer">Telegram</a>. Dentro
        de la app tienes también el chat de soporte.
      </p>
    ),
  },
]

export default function Terminos() {
  return (
    <LegalLayout
      title="Términos y condiciones"
      description="Condiciones de uso de la app y la web de TrueTrading: qué es y qué no es, aviso de riesgo, acceso con VT Markets, comunidad y responsabilidad."
      path="/terminos"
      intro={
        <p>
          Estas condiciones regulan el uso de TrueTrading. Las hemos escrito para que se entiendan, sin
          letra pequeña. Al crear una cuenta confirmas que las has leído y las aceptas.
        </p>
      }
      sections={sections}
    />
  )
}
