'use client'
import {useRef,useState} from 'react'
import {useStore,useOpo} from '@/components/Store'
import {OPOS,CUSTOM_ID} from '@/lib/opos'
export default function Ajustes(){
  const {s,set,exportData,importData}=useStore(),{d,opo,setD}=useOpo(),file=useRef(null),[msg,setMsg]=useState(''),[txt,setTxt]=useState('')
  const dark=(s.theme||(typeof matchMedia!=='undefined'&&matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'))==='dark'
  const custom=s.current===CUSTOM_ID
  const exportar=()=>{
    const url=URL.createObjectURL(new Blob([exportData()],{type:'application/json'}))
    const a=document.createElement('a');a.href=url;a.download='copia-el-opositor-inteligente-'+new Date().toISOString().slice(0,10)+'.json'
    document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);setMsg('Copia exportada.')
  }
  const importar=e=>{
    const f=e.target.files[0];if(!f)return;const r=new FileReader()
    r.onload=()=>{try{importData(r.result);setMsg('Copia importada correctamente.')}catch{setMsg('El archivo no es una copia válida de esta web.')}}
    r.readAsText(f);e.target.value=''
  }
  const addTemas=()=>{
    const lines=txt.split('\n').map(l=>l.trim()).filter(Boolean);if(!lines.length)return
    set(x=>{const max=Math.max(0,...x.custom.temas.map(t=>+t.id.slice(1)));return{custom:{...x.custom,temas:[...x.custom.temas,...lines.map((title,i)=>({id:'T'+(max+i+1),title}))]}}});setTxt('')
  }
  const rename=(id,title)=>set(x=>({custom:{...x.custom,temas:x.custom.temas.map(t=>t.id===id?{...t,title}:t)}}))
  const del=id=>set(x=>({custom:{...x.custom,temas:x.custom.temas.filter(t=>t.id!==id)}}))
  return <>
    <h2 className="lbl grp" style={{marginTop:0}}>Oposición</h2>
    <div className="list">{[...OPOS,{id:CUSTOM_ID,label:'Oposición personalizada',temas:s.custom.temas}].map(o=>
      <label key={o.id} className="item mod" style={{cursor:'pointer'}}>
        <input type="radio" name="opo" checked={s.current===o.id} onChange={()=>set({current:o.id})}/>
        <span><b>{o.label}</b></span><span className="cnt">{o.temas.length} temas</span></label>)}</div>
    <div className="list" style={{marginTop:16}}><div className="item" style={{justifyContent:'space-between',flexWrap:'wrap'}}><span><b>Fecha del examen</b></span>
      <input type="date" className="addin" style={{flex:'none',width:180}} value={d.exam||opo.exam||''} onChange={e=>setD({exam:e.target.value})}/></div></div>
    <p className="small" style={{color:'var(--mute)',margin:'10px 0 0'}}>Cada oposición guarda por separado su progreso, agenda, notas y constancia.</p>
    {custom&&<>
      <h2 className="lbl grp">Tu temario</h2>
      <div className="card">
        <div className="small" style={{color:'var(--mute)',marginBottom:6}}>Nombre de la oposición</div>
        <input className="addin" style={{width:'100%'}} maxLength={80} value={s.custom.name} onChange={e=>set(x=>({custom:{...x.custom,name:e.target.value}}))}/>
        <div className="small" style={{color:'var(--mute)',margin:'18px 0 6px'}}>Añadir temas (uno por línea)</div>
        <textarea style={{marginTop:0}} placeholder={'La Constitución Española\nEl procedimiento administrativo\n...'} value={txt} onChange={e=>setTxt(e.target.value)}/>
        <div className="btns" style={{justifyContent:'flex-start',marginTop:12}}><button type="button" className="btn p" onClick={addTemas}>Añadir temas</button></div>
        {s.custom.temas.length>0&&<div style={{marginTop:20}}>{s.custom.temas.map(t=><div key={t.id} className="trow">
          <span className="tag">{t.id}</span>
          <input className="addin" value={t.title} onChange={e=>rename(t.id,e.target.value)} aria-label={'Título de '+t.id}/>
          <button type="button" className="x" aria-label={'Eliminar '+t.id} onClick={()=>del(t.id)}>×</button></div>)}</div>}
      </div></>}
    <h2 className="lbl grp">General</h2>
    <div className="list">
      <div className="item" style={{justifyContent:'space-between'}}><span><b>Tema</b></span>
        <button type="button" className="btn" onClick={()=>set({theme:dark?'light':'dark'})} suppressHydrationWarning>{dark?'Cambiar a modo claro':'Cambiar a modo oscuro'}</button></div>
      <div className="item" style={{justifyContent:'space-between',flexWrap:'wrap'}}><span><b>Copia de seguridad</b></span>
        <span className="btns" style={{margin:0}}><button type="button" className="btn" onClick={exportar}>Exportar copia</button><button type="button" className="btn" onClick={()=>file.current.click()}>Importar copia</button></span></div>
    </div>
    <input ref={file} type="file" accept=".json,application/json" hidden onChange={importar}/>
    <p className="small" style={{color:'var(--mute)',marginTop:14}}>{msg||'Guardado automáticamente en este navegador. Usa Exportar copia para llevar tu progreso a otro dispositivo.'}</p>
  </>
}
