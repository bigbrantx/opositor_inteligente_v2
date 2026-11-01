'use client'
import {useEffect,useState} from 'react'
const U='ramongch7',D='gmail.com'
export default function Contacto(){
  const [mail,setMail]=useState(''),[ok,setOk]=useState(false)
  useEffect(()=>setMail(U+'@'+D),[])
  const copy=async()=>{try{await navigator.clipboard.writeText(mail);setOk(true);setTimeout(()=>setOk(false),2000)}catch{}}
  const href=mail?'mailto:'+mail+'?subject='+encodeURIComponent('Mensaje desde El Opositor Inteligente'):'#'
  return <section className="contact">
    <h2 className="sec">¿Hablamos?</h2>
    <div className="card">
      <p>¿Te ha servido esta web? Puedes escribirme para agradecer, proponer mejoras o avisarme si encuentras algún error.</p>
      <div className="cta">
        <a className="btn p" href={href}>✉️ Escribirme un correo</a>
        <button type="button" className="btn" onClick={copy} disabled={!mail}>{ok?'¡Copiado!':'Copiar mi correo'}</button>
      </div>
    </div>
  </section>
}
