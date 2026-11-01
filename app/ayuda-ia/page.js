'use client'
import {useState} from 'react'
import {getPrompts} from '@/lib/prompts'
import {useOpo} from '@/components/Store'
async function copy(t){
  try{await navigator.clipboard.writeText(t);return true}catch{}
  try{const a=document.createElement('textarea');a.value=t;a.style.position='fixed';a.style.opacity='0';document.body.appendChild(a);a.select();const ok=document.execCommand('copy');a.remove();return ok}catch{return false}
}
export default function AyudaIA(){
  const {opo}=useOpo(),PROMPTS=getPrompts(opo.label),[open,setOpen]=useState(null),[done,setDone]=useState(null)
  const onCopy=async p=>{const ok=await copy(p.prompt);setDone(ok?p.id:'err:'+p.id);setTimeout(()=>setDone(null),2000)}
  return <>
    <p style={{color:'var(--mute)',margin:'0 0 8px'}}>Copia un prompt, pégalo en tu IA de confianza (Claude, ChatGPT, Gemini…) y sustituye lo que va entre [corchetes] por tu material.</p>
    <p className="small" style={{color:'var(--mute)',margin:'0 0 24px'}}>Pega siempre el texto oficial del artículo y contrasta plazos, cifras y órganos con tu temario: la IA puede equivocarse.</p>
    <div className="list">{PROMPTS.map(p=><div key={p.id} className="pr">
      <h3>{p.titulo}</h3><p>{p.desc}</p>
      <div className="acts">
        <button type="button" className="btn p" onClick={()=>onCopy(p)}>{done===p.id?'¡Copiado!':done==='err:'+p.id?'No se pudo copiar':'Copiar prompt'}</button>
        <button type="button" className="btn" aria-expanded={open===p.id} onClick={()=>setOpen(open===p.id?null:p.id)}>{open===p.id?'Ocultar':'Ver prompt'}</button>
      </div>
      {open===p.id&&<pre>{p.prompt}</pre>}
    </div>)}</div>
  </>
}
