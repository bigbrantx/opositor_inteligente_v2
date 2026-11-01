import {OPOS,CUSTOM_ID} from './opos.js'
export const blank=()=>({mods:{},topics:{},agenda:{},notes:'',sessions:0,log:{},exam:''})
export const EMPTY=()=>({theme:'',current:'aux-cm',custom:{name:'Mi oposición',temas:[]},data:{}})
export function mergeDay(l){
  const m=new Map()
  for(const e of l){const c=m.get(e.tipo);if(c)c.temas=[...new Set([...c.temas,...e.temas])];else m.set(e.tipo,{...e,temas:[...e.temas]})}
  return [...m.values()].map(e=>({...e,temas:[...e.temas].sort((a,b)=>a.slice(1)-b.slice(1))}))
}
const clean=o=>Object.fromEntries(Object.entries(o||{}).filter(([,v])=>v!==undefined&&v!==null))
function normData(id,d){
  const x={...blank(),...clean(d)},topics={}
  for(const [k,c] of Object.entries(x.topics||{}))topics[k]={...c,b:c.b||[],ns:c.ns||(c.n?[{t:c.n}]:[]),n:undefined}
  const def=(OPOS.find(o=>o.id===id)||{}).defaults||{}
  for(const t in def){const c=topics[t];if(!c||(!c.s&&!c.b.length))topics[t]={b:def[t].map(y=>({t:y,d:0})),ns:c?c.ns:[],s:1}}
  const agenda={}
  for(const [k,l] of Object.entries(x.agenda||{}))agenda[k]=mergeDay(l)
  return {...x,topics,agenda}
}
export function norm(s){
  const base=EMPTY()
  let o=clean(s)
  if(!o.data){
    const {mods,topics,agenda,notes,sessions,log}=o
    o={theme:o.theme||'',current:'aux-cm',custom:o.custom,data:{'aux-cm':{mods,topics,agenda,notes,sessions,log}}}
  }
  const data={}
  for(const id of [...OPOS.map(p=>p.id),CUSTOM_ID])data[id]=normData(id,o.data[id])
  const current=data[o.current]?o.current:'aux-cm'
  return {...base,theme:o.theme||'',current,custom:{...base.custom,...clean(o.custom)},data}
}
