'use client'
import {useState} from 'react'
import Link from 'next/link'
import {useOpo} from '@/components/Store'
const ROM=['I','II','III','IV','V','VI']
function Tema({t}){
  const {d:s,setD:set}=useOpo(),[open,setOpen]=useState(false),[nuevo,setNuevo]=useState(''),[arm,setArm]=useState(-1)
  const c=s.topics[t.id]||{b:[],ns:[]},done=!!s.mods[t.id],cnt=c.b.length?c.b.filter(x=>x.d).length+'/'+c.b.length:''
  const upd=fn=>set(x=>{const c0=x.topics[t.id]||{b:[],ns:[],s:1};return{topics:{...x.topics,[t.id]:fn({...c0,b:[...c0.b],ns:[...c0.ns]})}}})
  const toggle=()=>set(x=>{const m={...x.mods};if(m[t.id])delete m[t.id];else m[t.id]=1;return{mods:m}})
  const add=()=>{const v=nuevo.trim();if(!v)return;upd(c=>({...c,b:[...c.b,{t:v,d:0}]}));setNuevo('')}
  const delNote=i=>{if(!c.ns[i].t.trim()||arm===i){upd(c=>({...c,ns:c.ns.filter((_,j)=>j!==i)}));setArm(-1)}else{setArm(i);setTimeout(()=>setArm(-1),3000)}}
  return <div className="mw">
    <div className={'item mod'+(done?' done':'')}>
      <input type="checkbox" checked={done} onChange={toggle} aria-label={'Marcar '+t.id+' como estudiado'}/>
      <button type="button" className="mt" aria-expanded={open} onClick={()=>setOpen(!open)}>
        <span className="tag">{t.id}</span><span><b>{t.title}</b></span><span className="cnt">{cnt}</span><svg viewBox="0 0 24 24"><path d="M6 9l6 6 6-6"/></svg></button>
    </div>
    {open&&<div className="panel">
      <div className="subs">{c.b.map((x,i)=><label key={i} className={'sub'+(x.d?' done':'')}>
        <input type="checkbox" checked={!!x.d} onChange={()=>upd(c=>({...c,b:c.b.map((y,j)=>j===i?{...y,d:y.d?0:1}:y)}))}/>
        <span>{x.t}</span>
        <button type="button" className="x" aria-label="Eliminar bloque" onClick={e=>{e.preventDefault();upd(c=>({...c,b:c.b.filter((_,j)=>j!==i)}))}}>×</button></label>)}</div>
      <div className="addrow"><input className="addin" maxLength={120} placeholder="Nuevo bloque (p. ej. Título preliminar)" value={nuevo} onChange={e=>setNuevo(e.target.value)} onKeyDown={e=>{if(e.key==='Enter'){e.preventDefault();add()}}}/><button type="button" className="btn add" onClick={add}>Añadir</button></div>
      <div className="nhead">Notas</div>
      <div className="notes">{c.ns.map((x,i)=><div key={i} className="note">
        <textarea className="tnote" placeholder="Escribe una nota..." value={x.t} autoFocus={x.t===''&&i===c.ns.length-1}
          onChange={e=>{const v=e.target.value;upd(c=>({...c,ns:c.ns.map((y,j)=>j===i?{t:v}:y)}))}}/>
        <button type="button" className={'nx'+(arm===i?' arm':'')} aria-label="Eliminar nota" onClick={()=>delNote(i)}>{arm===i?'¿Borrar?':'×'}</button></div>)}</div>
      <button type="button" className="btn nadd" onClick={()=>upd(c=>({...c,ns:[...c.ns,{t:''}]}))}>+ Añadir nota</button>
    </div>}
  </div>
}
export default function Modulos(){
  const {d:s,opo}=useOpo(),n=opo.temas.filter(t=>s.mods[t.id]).length
  return <>
    <div className="row" style={{marginBottom:16}}><span className="small">{n} de {opo.temas.length} temas estudiados</span></div>
    {!opo.temas.length&&<div className="list"><div className="empty">Aún no hay temas. Añádelos en <Link href="/ajustes" style={{color:'var(--acc)'}}>Ajustes</Link>.</div></div>}
    {Object.entries(opo.bloques).map(([b,l])=>{
      const ts=opo.temas.filter(t=>t.bloque===+b)
      return ts.length?<div key={b}><h2 className="lbl grp">{opo.plano?l:'Bloque '+ROM[b-1]+' · '+l}</h2>
        <div className="list">{ts.map(t=><Tema key={opo.id+t.id} t={t}/>)}</div></div>:null})}
  </>
}
