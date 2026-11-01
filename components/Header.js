'use client'
import Link from 'next/link'
import {usePathname} from 'next/navigation'
import {useState} from 'react'
const ITEMS=[['/','Inicio'],['/plan','Plan'],['/modulos','Módulos'],['/progreso','Progreso'],['/ayuda-ia','Ayuda IA'],['/ajustes','Ajustes']]
export default function Header(){
  const p=usePathname(),[open,setOpen]=useState(false)
  return <header>
    <Link href="/" className="brand"><b>El Opositor Inteligente</b></Link>
    <button type="button" className="burger" aria-label="Abrir menú" aria-expanded={open} aria-controls="menu" onClick={()=>setOpen(!open)}><svg viewBox="0 0 24 24"><path d="M4 7h16M4 12h16M4 17h16"/></svg></button>
    <nav id="menu" className={open?'open':''}>{ITEMS.map(([h,l])=><Link key={h} href={h} aria-current={p===h?'page':undefined} onClick={()=>setOpen(false)}>{l}</Link>)}
      <a className="cafe" href="https://ko-fi.com/elopositorinteligente" target="_blank" rel="noopener noreferrer">☕ Invítame a un café</a></nav>
  </header>
}
