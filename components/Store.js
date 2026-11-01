'use client'
import {createContext,useCallback,useContext,useEffect,useState} from 'react'
import {getOpo} from '@/lib/opos'
import {norm,EMPTY} from '@/lib/state'
export {mergeDay} from '@/lib/state'
const KEY='aux-admin-v1'
const Ctx=createContext(null)
export const useStore=()=>useContext(Ctx)
export function useOpo(){
  const {s,setD}=useStore()
  return {id:s.current,opo:getOpo(s.current,s.custom),d:s.data[s.current],setD}
}
export function useNow(){const [n,setN]=useState(null);useEffect(()=>setN(new Date()),[]);return n}
export const dkey=d=>d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0')
export function StoreProvider({children}){
  const [s,setS]=useState(()=>norm(EMPTY())),[ready,setReady]=useState(false)
  useEffect(()=>{let d={};try{d=JSON.parse(localStorage.getItem(KEY)||'{}')}catch{};setS(norm(d));setReady(true)},[])
  useEffect(()=>{
    if(!ready)return
    try{localStorage.setItem(KEY,JSON.stringify(s))}catch{}
    document.documentElement.dataset.theme=s.theme||(matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light')
  },[s,ready])
  const set=useCallback(p=>setS(x=>({...x,...(typeof p==='function'?p(x):p)})),[])
  const setD=useCallback(p=>setS(x=>{const cur=x.data[x.current],patch=typeof p==='function'?p(cur):p;return{...x,data:{...x.data,[x.current]:{...cur,...patch}}}}),[])
  const exportData=()=>JSON.stringify({app:'aux-administrativo',v:2,ts:Date.now(),theme:s.theme,current:s.current,custom:JSON.stringify(s.custom),data:JSON.stringify(s.data)},null,2)
  const importData=txt=>{
    const o=JSON.parse(txt);if(!o||o.app!=='aux-administrativo')throw new Error('bad')
    const p=v=>typeof v==='string'?JSON.parse(v||'{}'):(v||{})
    if(o.data)setS(norm({theme:o.theme||'',current:o.current,custom:p(o.custom),data:p(o.data)}))
    else setS(norm({theme:o.theme||'',mods:p(o.mods),topics:p(o.topics),agenda:p(o.agenda),notes:o.notes||'',sessions:+o.sessions||0,log:p(o.log)}))
  }
  return <Ctx.Provider value={{s,set,setD,ready,exportData,importData}}>{children}</Ctx.Provider>
}
