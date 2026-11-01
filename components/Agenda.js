'use client'
import {useState} from 'react'
import {useOpo,useNow,dkey,mergeDay} from './Store'
const TIPOS=[['estudio','Estudio'],['repaso','Repaso'],['test','Test'],['simulacro','Simulacro']]
const DIAS=['Dom','Lun','Mar','Mié','Jue','Vie','Sáb']
export default function Agenda(){
  const {d:s,opo,setD:set}=useOpo(),now=useNow(),TEMAS=opo.temas
  const [off,setOff]=useState(0),[edit,setEdit]=useState(null),[tipo,setTipo]=useState('estudio'),[temas,setTemas]=useState([])
  if(!now)return null
  const mon=new Date(now);mon.setHours(0,0,0,0);mon.setDate(mon.getDate()-((mon.getDay()+6)%7)+off*7)
  const days=Array.from({length:7},(_,i)=>{const d=new Date(mon);d.setDate(mon.getDate()+i);return d})
  const a=days[0],b=days[6],mes=d=>d.toLocaleDateString('es-ES',{month:'long'})
  const label=a.getMonth()===b.getMonth()?'Semana del '+a.getDate()+' al '+b.getDate()+' de '+mes(b):'Semana del '+a.getDate()+' de '+mes(a)+' al '+b.getDate()+' de '+mes(b)
  const today=dkey(now),exam=s.exam||opo.exam
  const openDay=k=>{setEdit(edit===k?null:k);setTipo('estudio');setTemas([])}
  const flip=id=>setTemas(t=>t.includes(id)?t.filter(x=>x!==id):[...t,id])
  const canSave=temas.length>0||tipo==='simulacro'||tipo==='test'
  const save=k=>{set(x=>({agenda:{...x.agenda,[k]:mergeDay([...(x.agenda[k]||[]),{tipo,temas}])}}));setEdit(null)}
  const del=(k,i)=>set(x=>{const a={...x.agenda},l=(a[k]||[]).filter((_,j)=>j!==i);if(l.length)a[k]=l;else delete a[k];return{agenda:a}})
  return <>
    <div className="row" style={{marginTop:36,alignItems:'center'}}>
      <span className="lbl">{label}</span>
      <span className="seg wide">
        <button type="button" aria-label="Semana anterior" onClick={()=>setOff(off-1)}>‹</button>
        <button type="button" onClick={()=>setOff(0)}>Hoy</button>
        <button type="button" aria-label="Semana siguiente" onClick={()=>setOff(off+1)}>›</button>
      </span>
    </div>
    <div className="list" style={{marginTop:14}}>{days.map(d=>{
      const k=dkey(d),list=s.agenda[k]||[],isToday=k===today
      return <div key={k} className="dayw">
        <div className={'item ag'+(isToday?' today':'')}>
          <span className="day">{DIAS[d.getDay()]} {d.getDate()}</span>
          <div className="ents">
            {k===exam&&<div className="ent"><span className="ty simulacro">Examen</span></div>}
            {list.map((e,i)=><div key={i} className="ent">
              <span className={'ty '+e.tipo}>{TIPOS.find(t=>t[0]===e.tipo)[1]}</span>
              {e.temas.map(t=><span key={t} className="tag">{t}</span>)}
              <button type="button" className="x" aria-label="Eliminar" onClick={()=>del(k,i)}>×</button></div>)}
          </div>
          <button type="button" className="btn plus" aria-label={'Añadir el '+d.getDate()} aria-expanded={edit===k} onClick={()=>openDay(k)}>{edit===k?'−':'+'}</button>
        </div>
        {edit===k&&<div className="ed">
          <span className="seg wide">{TIPOS.map(([id,l])=><button key={id} type="button" aria-pressed={tipo===id} onClick={()=>setTipo(id)}>{l}</button>)}</span>
          <div className="chips">{TEMAS.map(t=><button key={t.id} type="button" className="chip" title={t.title} aria-pressed={temas.includes(t.id)} onClick={()=>flip(t.id)}>{t.id}</button>)}</div>
          <div className="small" style={{color:'var(--mute)'}}>{temas.length?temas.map(id=>TEMAS.find(t=>t.id===id).title).join(' · '):'Elige uno o varios temas'}</div>
          <div className="btns"><button type="button" className="btn p" disabled={!canSave} onClick={()=>save(k)}>Guardar</button><button type="button" className="btn" onClick={()=>setEdit(null)}>Cancelar</button></div>
        </div>}
      </div>})}</div>
  </>
}
