'use client'
import Link from 'next/link'
import {useOpo,useNow,dkey} from '@/components/Store'
const Bar=({v,t})=><div className="bar big"><i style={{width:(t?v/t*100:0)+'%'}}/></div>
const fmtDate=s=>{const [y,m,d]=s.split('-').map(Number);return new Date(y,m-1,d).toLocaleDateString('es-ES',{day:'numeric',month:'long'})}
export default function Progreso(){
  const {d:s,opo}=useOpo(),now=useNow(),TEMAS=opo.temas
  const ok=t=>!!s.mods[t.id],n=TEMAS.filter(ok).length,tot=TEMAS.length,pend=tot-n
  const bl=Object.entries(opo.bloques).map(([b,l])=>{const a=TEMAS.filter(t=>t.bloque===+b);return[b,l,a.filter(ok).length,a.length]}).filter(x=>x[3]>0)
  const examStr=s.exam||opo.exam
  let left=null,streak=0,hoy=0,sem=0
  if(now){
    if(examStr){const [y,m,d]=examStr.split('-').map(Number);const t0=new Date(now);t0.setHours(0,0,0,0);left=Math.round((new Date(y,m-1,d)-t0)/864e5)}
    const day=new Date(now);day.setHours(12,0,0,0);const c=new Date(day);if(!s.log[dkey(c)])c.setDate(c.getDate()-1)
    while(s.log[dkey(c)]){streak++;c.setDate(c.getDate()-1)}
    hoy=(s.log[dkey(day)]||0)*25
    for(let i=0;i<7;i++){const x=new Date(day);x.setDate(x.getDate()-i);sem+=(s.log[dkey(x)]||0)*25}
  }
  return <>
    <div className="card">
      <div className="row"><span className="lbl">Temas estudiados</span><span className="small">{n} de {tot}</span></div>
      <div className="time" style={{fontSize:'clamp(48px,12vw,72px)',margin:'14px 0 16px'}}>{tot?Math.round(n/tot*100):0} %</div>
      <Bar v={n} t={tot}/>
    </div>
    {bl.length>1&&<><h2 className="lbl grp">Por bloque</h2>
    <div className="list">{bl.map(([b,l,a,t])=><div key={b} className="pb">
      <div className="row"><span>{l}</span><span className="small">{a} de {t}</span></div><Bar v={a} t={t}/></div>)}</div></>}
    <h2 className="lbl grp">{examStr?'Examen · '+fmtDate(examStr):'Examen'}</h2>
    <div className="card" id="pexam">{!examStr?<p>Indica la fecha de tu examen en <Link href="/ajustes">Ajustes</Link> para ver la cuenta atrás.</p>:left===null?null:left<0?<p>El examen ya ha pasado.</p>:left===0?<p>El examen es hoy. ¡Mucho ánimo!</p>:<>
      <p>Faltan <b>{left} {left===1?'día':'días'}</b> para el examen.</p>
      <p>{pend===0?'Has marcado todos los temas como estudiados.':(pend===1?'Queda 1 tema':'Quedan '+pend+' temas')+' por estudiar: '+(pend/left).toFixed(1).replace('.',',')+' al día para llegar a tiempo.'}</p></>}</div>
    <h2 className="lbl grp">Constancia</h2>
    <div className="card stats">
      <div><div className="big">{streak}</div><div className="small">{streak===1?'día seguido':'días seguidos'}</div></div>
      <div><div className="big">{hoy}</div><div className="small">min hoy</div></div>
      <div><div className="big">{sem}</div><div className="small">min en 7 días</div></div>
    </div>
  </>
}
