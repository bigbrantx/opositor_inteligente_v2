import Link from 'next/link'
import Contacto from '@/components/Contacto'
const KOFI='https://ko-fi.com/elopositorinteligente'
const FEATS=[
  ['🔓','Acceso ilimitado','Todo el material está disponible sin trucos. Copia directamente cualquier prompt y pégalo en tu IA preferida.'],
  ['🧩','Explicaciones simples','Estrategias conceptuales para triturar textos complejos mediante analogías y esquemas lógicos inmediatos.'],
  ['📈','Comunidad y apoyo','Este espacio se sostiene de manera altruista. Si te resulta útil, puedes colaborar voluntariamente para mantener la web activa.'],
]
export default function Inicio(){
  return <>
    <section className="hero">
      <h1>Optimiza tus horas de estudio <span>GRATIS</span> con Inteligencia Artificial</h1>
      <p>Accede de forma totalmente abierta a comandos estructurados y plantillas mnemotécnicas diseñadas para exprimir el temario de tu oposición.</p>
      <div className="cta">
        <Link href="/ayuda-ia" className="btn p">🚀 Comienza a usarla ya</Link>
        <a href={KOFI} target="_blank" rel="noopener noreferrer" className="btn">☕ Apoyar el proyecto</a>
      </div>
      <p className="small hero-note">Disponible para Auxiliar Administrativo y Administrativo, del Estado y de la Comunidad de Madrid, o con tu propio temario. Elige la tuya en <Link href="/ajustes">Ajustes</Link>.</p>
    </section>
    <section>
      <h2 className="sec">¿Qué vas a encontrar aquí de forma gratuita?</h2>
      <div className="feats">{FEATS.map(([i,t,d])=><div key={t} className="card feat"><h3>{i} {t}</h3><p>{d}</p></div>)}</div>
    </section>
    <Contacto/>
  </>
}
