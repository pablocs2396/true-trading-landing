import LegalLayout, { FichaTitular, type LegalSection } from './LegalLayout'
import { SOPORTE_TELEGRAM, TITULAR } from './titular'

interface FilaDatos {
  categoria: string
  datos: string
  para: string
}

const DATOS: FilaDatos[] = [
  {
    categoria: 'Cuenta',
    datos: 'Email, nombre, @usuario, contraseña (la gestiona Firebase Authentication y nunca la vemos), foto y bio si las añades.',
    para: 'Crear tu cuenta, iniciar sesión y mostrar tu perfil.',
  },
  {
    categoria: 'Afiliación',
    datos: 'Email de tu cuenta de VT Markets y estado de tu acceso (pendiente, afiliado, rechazado, bloqueado).',
    para: 'Comprobar con VT Markets que tu cuenta está asociada a nuestro código y darte acceso completo.',
  },
  {
    categoria: 'Uso de la app',
    datos: 'Minicursos vistos, racha de días, reacciones a señales y puntos del ranking, preferencias de notificaciones y tema.',
    para: 'Desbloquear contenido, calcular la racha y el ranking y recordar tus ajustes.',
  },
  {
    categoria: 'Diario',
    datos: 'Operaciones que registras a mano o que se sincronizan desde Myfxbook (instrumento, precios, lotes, pips, PNL), notas del día y estadísticas. Si conectas Myfxbook, un token de sesión cifrado.',
    para: 'Mostrarte tu diario y tus estadísticas, y publicarlas en tu perfil solo si lo activas.',
  },
  {
    categoria: 'Comunidad',
    datos: 'Mensajes, imágenes, vídeos, PDFs y audios que envías, reacciones, menciones, resultados que compartes, reportes y usuarios bloqueados.',
    para: 'Hacer funcionar los chats y moderar la comunidad.',
  },
  {
    categoria: 'AntonIA',
    datos: 'Las preguntas e imágenes que le envías. El historial de conversaciones se guarda solo en tu móvil.',
    para: 'Generar la respuesta. Se procesan con la API de Gemini de Google.',
  },
  {
    categoria: 'Notificaciones',
    datos: 'Token de notificaciones push de tu dispositivo.',
    para: 'Avisarte de señales, análisis y mensajes según tus preferencias.',
  },
  {
    categoria: 'Datos técnicos',
    datos: 'Sistema operativo, versión de la app, modelo de dispositivo y errores.',
    para: 'Detectar y arreglar fallos y saber qué partes de la app se usan.',
  },
  {
    categoria: 'Origen de la descarga',
    datos: 'Si descargas la app desde esta web: un código aleatorio (TT-LND-…), la plataforma, el botón pulsado y un resumen cifrado (hash) de tu IP. En Android, un parámetro de origen que Google Play entrega a la app.',
    para: 'Saber si llegaste desde la web para mostrarte el enlace de VT Markets correcto.',
  },
]

const sections: LegalSection[] = [
  {
    id: 'responsable',
    title: 'Responsable del tratamiento',
    body: (
      <>
        <p>El responsable de tus datos personales es:</p>
        <FichaTitular />
      </>
    ),
  },
  {
    id: 'datos',
    title: 'Qué datos tratamos y para qué',
    body: (
      <>
        <p>Solo recogemos lo que necesita cada función. Si no usas una función, no tratamos sus datos.</p>
        <div className="legal-table-wrap">
          <table className="legal-table">
            <thead>
              <tr>
                <th scope="col">Qué</th>
                <th scope="col">Datos</th>
                <th scope="col">Para qué</th>
              </tr>
            </thead>
            <tbody>
              {DATOS.map((f) => (
                <tr key={f.categoria}>
                  <td>{f.categoria}</td>
                  <td data-label="Datos">{f.datos}</td>
                  <td data-label="Para qué">{f.para}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <h3>Myfxbook</h3>
        <p>
          Myfxbook no ofrece otra forma de conectarse que el email y la contraseña. La contraseña se
          usa <strong>una sola vez</strong> para obtener un token de sesión de Myfxbook y{' '}
          <strong>no se guarda</strong>. El token se guarda cifrado (AES-256), solo lo usan nuestros
          servidores y se borra junto con los datos sincronizados cuando desconectas Myfxbook.
        </p>
        <h3>Lo que no hacemos</h3>
        <ul>
          <li>No vendemos tus datos ni los usamos para publicidad.</li>
          <li>No accedemos a tu cuenta del bróker ni a tu dinero.</li>
          <li>Face ID y la huella se comprueban en tu móvil. Nunca recibimos tus datos biométricos.</li>
        </ul>
      </>
    ),
  },
  {
    id: 'base-legal',
    title: 'Base legal',
    body: (
      <ul>
        <li>
          <strong>Ejecución del contrato</strong> (art. 6.1.b RGPD): la cuenta, la afiliación, el diario,
          la comunidad, AntonIA y las notificaciones son el servicio que pides al registrarte.
        </li>
        <li>
          <strong>Interés legítimo</strong> (art. 6.1.f RGPD): moderar la comunidad, prevenir fraude en la
          afiliación, arreglar errores y saber desde dónde llegan las descargas.
        </li>
        <li>
          <strong>Consentimiento</strong> (art. 6.1.a RGPD): conectar Myfxbook, hacer públicas tus
          estadísticas, permitir las notificaciones y pegar el código de la web en la app. Puedes retirarlo
          cuando quieras desde la propia app.
        </li>
        <li><strong>Obligación legal</strong> (art. 6.1.c RGPD): cuando una ley o una autoridad nos lo exija.</li>
      </ul>
    ),
  },
  {
    id: 'destinatarios',
    title: 'Con quién los compartimos',
    body: (
      <>
        <p>Solo con quien nos ayuda a prestar el servicio, y solo lo necesario:</p>
        <ul>
          <li><strong>Google (Firebase y Google Cloud):</strong> alojamiento, base de datos, archivos, inicio de sesión y servidores.</li>
          <li><strong>Google (API de Gemini):</strong> respuestas de AntonIA.</li>
          <li><strong>Apple y Google:</strong> envío de notificaciones push y, en Android, el origen de la descarga.</li>
          <li><strong>Myfxbook:</strong> solo si conectas tu cuenta, para leer tus operaciones.</li>
          <li><strong>VT Markets:</strong> el email de tu cuenta del bróker, para comprobar la afiliación.</li>
          <li><strong>Telegram:</strong> solo si nos escribes por ahí. Telegram trata tus datos según su propia política.</li>
        </ul>
        <p>
          Otros usuarios ven tu nombre, @usuario, foto, bio, racha y lo que publicas en la comunidad.
          Tus estadísticas de trading solo las ven si las haces públicas.
        </p>
        <p>
          <strong>Tus datos se tratan en Estados Unidos.</strong> El responsable, True Trading Hub, LLC,
          está allí, y también algunos de sus proveedores. Aun así, al ofrecer TrueTrading a personas en
          la Unión Europea cumplimos el RGPD (art. 3.2). Con los
          proveedores, las transferencias se hacen al amparo del Marco de Privacidad de Datos UE-EE. UU.
          o de las cláusulas contractuales tipo aprobadas por la Comisión Europea.
        </p>
      </>
    ),
  },
  {
    id: 'conservacion',
    title: 'Cuánto tiempo los guardamos',
    body: (
      <ul>
        <li>Datos de la cuenta, del diario y de uso: mientras tengas la cuenta.</li>
        <li>Al eliminar tu cuenta borramos tu perfil, tu diario, tus operaciones y tu acceso de inmediato.</li>
        <li>
          Los mensajes que enviaste a canales y chats forman parte de conversaciones con otras personas y
          pueden seguir visibles. Si quieres que los borremos, pídenoslo.
        </li>
        <li>Token de Myfxbook: hasta que desconectas Myfxbook o eliminas la cuenta.</li>
        <li>Datos del origen de la descarga desde la web: se borran automáticamente a las 24 horas.</li>
        <li>
          Lo que tengamos que conservar por ley lo guardaremos bloqueado, solo durante los plazos
          legales y sin usarlo para nada más.
        </li>
      </ul>
    ),
  },
  {
    id: 'derechos',
    title: 'Tus derechos',
    body: (
      <>
        <p>
          Puedes pedirnos <strong>acceder</strong> a tus datos, <strong>rectificarlos</strong>,{' '}
          <strong>suprimirlos</strong>, <strong>limitar</strong> u <strong>oponerte</strong> a su
          tratamiento y <strong>llevártelos</strong> en un formato estándar (portabilidad). Escríbenos a{' '}
          {TITULAR.emailLegal ? <a href={`mailto:${TITULAR.emailLegal}`}>{TITULAR.emailLegal}</a> : 'nuestro email de contacto'}{' '}
          desde el email de tu cuenta. Te contestamos en un mes como máximo.
        </p>
        <p>
          Muchas cosas las puedes hacer tú desde la app: editar tu perfil, ocultar tus estadísticas,
          desconectar Myfxbook, desactivar notificaciones o eliminar la cuenta en{' '}
          <strong>Perfil → Eliminar cuenta</strong>.
        </p>
        <p>
          Si crees que no hemos tratado bien tus datos, puedes reclamar ante la autoridad de protección de
          datos de tu país. En España es la{' '}
          <a href="https://www.aepd.es" target="_blank" rel="noopener noreferrer">Agencia Española de Protección de Datos</a>.
        </p>
      </>
    ),
  },
  {
    id: 'seguridad',
    title: 'Seguridad',
    body: (
      <p>
        Todo viaja cifrado (HTTPS). Las reglas de acceso de la base de datos impiden que un usuario lea
        datos privados de otro, los datos sensibles como el token de Myfxbook solo se manejan en nuestros
        servidores, y la app bloquea las capturas de pantalla en las pantallas más sensibles. Ningún
        sistema es infalible: si detectamos una brecha que afecte a tus datos, te avisaremos y lo
        comunicaremos a la autoridad de protección de datos competente como exige la ley.
      </p>
    ),
  },
  {
    id: 'menores',
    title: 'Menores',
    body: (
      <p>
        TrueTrading es solo para mayores de 18 años. Si sabemos que una cuenta pertenece a un menor, la
        eliminaremos.
      </p>
    ),
  },
  {
    id: 'web',
    title: 'Esta web y las cookies',
    body: (
      <>
        <p>
          Esta web <strong>no usa cookies de publicidad ni de analítica</strong> y no te sigue entre
          páginas. Lee de nuestra base de datos las cifras públicas que ves en portada (usuarios
          registrados, análisis publicados). Para eso, el SDK de Firebase puede guardar en tu navegador
          datos técnicos que necesita para funcionar y que no sirven para identificarte.
        </p>
        <p>
          <strong>Al pulsar «Descargar»</strong> registramos el clic con el código, la plataforma y el hash
          de tu IP descritos arriba, y copiamos ese código en tu portapapeles. En iPhone te lo explicamos
          antes de ir a la App Store y no se copia nada si no aceptas. El código es aleatorio, no contiene
          datos tuyos y la app solo lo lee si tú se lo permites.
        </p>
      </>
    ),
  },
  {
    id: 'cambios',
    title: 'Cambios en esta política',
    body: (
      <p>
        Si cambiamos algo importante, lo avisaremos dentro de la app. Para cualquier duda puedes
        escribirnos por email o por <a href={SOPORTE_TELEGRAM} target="_blank" rel="noopener noreferrer">Telegram</a>.
      </p>
    ),
  },
]

export default function Privacidad() {
  return (
    <LegalLayout
      title="Política de privacidad"
      description="Qué datos trata TrueTrading, para qué, con quién los comparte, cuánto tiempo los guarda y cómo ejercer tus derechos."
      path="/privacidad"
      intro={
        <p>
          Aquí explicamos qué datos personales tratamos cuando usas la app TrueTrading y esta web, por qué
          y qué puedes hacer con ellos. Sin rodeos.
        </p>
      }
      sections={sections}
    />
  )
}
