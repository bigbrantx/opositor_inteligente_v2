'use client'
import Pomodoro from '@/components/Pomodoro'
import Agenda from '@/components/Agenda'
import {useOpo} from '@/components/Store'
export default function Plan(){
  const {d,setD}=useOpo()
  return <>
    <Pomodoro/>
    <Agenda/>
    <textarea style={{marginTop:24}} placeholder="Notas generales..." value={d.notes} onChange={e=>setD({notes:e.target.value})}/>
  </>
}
