'use client'
import {useEffect,useState} from 'react'
import {useOpo,dkey} from './Store'
const FOCUS=25*60,BREAK=5*60
const fmt=s=>String(Math.floor(s/60)).padStart(2,'0')+':'+String(s%60).padStart(2,'0')
function beep(){try{const a=new AudioContext(),o=a.createOscillator();o.connect(a.destination);o.frequency.value=880;o.start();setTimeout(()=>{o.stop();a.close()},400)}catch{}}
export default function Pomodoro(){
  const {d,setD}=useOpo()
  const [mode,setMode]=useState('focus'),[left,setLeft]=useState(FOCUS),[end,setEnd]=useState(0),[run,setRun]=useState(false),[started,setStarted]=useState(false)
  const total=mode==='focus'?FOCUS:BREAK
  useEffect(()=>{
    if(!run)return
    const id=setInterval(()=>{
      const l=Math.max(0,Math.round((end-Date.now())/1000));setLeft(l)
      if(l===0){
        setRun(false);setStarted(false);beep()
        if(mode==='focus'){setD(x=>({sessions:x.sessions+1,log:{...x.log,[dkey(new Date())]:(x.log[dkey(new Date())]||0)+1}}));setMode('break');setLeft(BREAK)}
        else{setMode('focus');setLeft(FOCUS)}
      }
    },250)
    return()=>clearInterval(id)
  },[run,end,mode,setD])
  useEffect(()=>{document.title=run?fmt(left)+' · El Opositor Inteligente':'El Opositor Inteligente'},[run,left])
  const toggle=()=>{if(run)setRun(false);else{setEnd(Date.now()+left*1000);setStarted(true);setRun(true)}}
  const reset=()=>{setRun(false);setStarted(false);setMode('focus');setLeft(FOCUS)}
  const n=d.sessions
  return <div className="card">
    <div className="row"><span className="lbl">{mode==='focus'?'Sesión pomodoro':'Descanso'}</span><span className="small">{n} {n===1?'sesión completada':'sesiones completadas'}</span></div>
    <div className="time" role="timer">{fmt(left)}</div>
    <div className="bar"><i style={{width:((total-left)/total*100)+'%'}}/></div>
    <div className="btns">
      <button type="button" className="btn p" onClick={toggle}>{run?'Pausar':started?'Reanudar':mode==='focus'?'Empezar':'Empezar descanso'}</button>
      <button type="button" className="btn" onClick={reset}>Reiniciar</button>
    </div>
  </div>
}
