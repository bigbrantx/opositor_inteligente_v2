'use client'
import Link from 'next/link'
import {usePathname} from 'next/navigation'
import {useOpo} from './Store'
export default function OpoBar(){
  const p=usePathname(),{opo}=useOpo()
  if(p==='/'||p==='/ajustes')return null
  return <p className="opobar small">Oposición: <b>{opo.label}</b> · <Link href="/ajustes">Cambiar</Link></p>
}
