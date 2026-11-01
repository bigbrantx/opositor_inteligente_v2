import './globals.css'
import {StoreProvider} from '@/components/Store'
import Header from '@/components/Header'
import OpoBar from '@/components/OpoBar'
export const metadata={title:'El Opositor Inteligente',description:'Plan de estudio, seguimiento y prompts de IA para opositores: Auxiliar Administrativo de la Comunidad de Madrid'}
export const viewport={width:'device-width',initialScale:1,viewportFit:'cover'}
const themeScript="try{var d=JSON.parse(localStorage.getItem('aux-admin-v1')||'{}');if(d.theme)document.documentElement.dataset.theme=d.theme}catch(e){}"
export default function RootLayout({children}){
  return <html lang="es" suppressHydrationWarning>
    <head><script dangerouslySetInnerHTML={{__html:themeScript}}/></head>
    <body><StoreProvider><div className="wrap"><Header/><OpoBar/><main>{children}</main>
      <footer>
        <p>¿Este rincón te resulta útil para tu estudio diario?</p>
        <p><a href="https://ko-fi.com/elopositorinteligente" target="_blank" rel="noopener noreferrer">☕ Puedes ayudar invitándome a un café</a></p>
        <p className="small">Compartido con ♥ de opositor a opositor © 2026</p>
      </footer></div></StoreProvider></body>
  </html>
}
