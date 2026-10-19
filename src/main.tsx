import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import Terminos from './legal/Terminos.tsx'
import Privacidad from './legal/Privacidad.tsx'

// Sin router: son tres páginas. Vercel reescribe /terminos y /privacidad a
// index.html (vercel.json); la app enlaza a esas URLs exactas.
const path = window.location.pathname.replace(/\/+$/, '')
const Page = path === '/terminos' ? Terminos : path === '/privacidad' ? Privacidad : App

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Page />
  </StrictMode>,
)
