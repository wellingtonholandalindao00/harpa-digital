'use client'

import { useState, useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'

function getTemaAtual() {
  if (typeof window === 'undefined') return 'claro'
  const stored = localStorage.getItem('harpa-digital-tema')
  if (stored === 'escuro' || stored === 'claro') return stored
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'escuro' : 'claro'
}

export default function NavBar() {
  const pathname = usePathname()
  const isHinoPage = pathname?.startsWith('/hino/')
  const [menuAberto, setMenuAberto] = useState(false)
  const [tema, setTema] = useState('claro')
  const menuRef = useRef(null)

  useEffect(() => {
    setTema(getTemaAtual())
  }, [])

  useEffect(() => {
    document.documentElement.classList.toggle('dark', tema === 'escuro')
  }, [tema])

  useEffect(() => {
    function handleClick(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuAberto(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  function alterarTema(novo) {
    setTema(novo)
    localStorage.setItem('harpa-digital-tema', novo)
    document.querySelector('meta[name="color-scheme"]')?.setAttribute('content', novo === 'escuro' ? 'dark' : 'light')
    setMenuAberto(false)
  }

  return (
    <header className="sticky top-0 z-10 border-b border-zinc-200 bg-white/80 backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/80">
      <div className="mx-auto flex h-14 max-w-6xl items-center px-6 sm:px-12">
        <a href="/" className="inline-flex items-center gap-1.5 text-lg font-bold tracking-tight">
          {isHinoPage && (
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path d="m15 18-6-6 6-6" />
            </svg>
          )}
          {isHinoPage ? 'Voltar para lista' : 'Harpa Digital'}
        </a>

        <div className="relative ml-auto" ref={menuRef}>
          <button
            onClick={() => setMenuAberto(v => !v)}
            className="rounded-lg p-2 text-zinc-500 transition hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800"
            aria-label="Abrir menu"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          {menuAberto && (
            <div className="absolute right-0 top-full mt-1 w-44 rounded-xl border border-zinc-200 bg-white py-1 shadow-lg dark:border-zinc-700 dark:bg-zinc-900">
              <p className="px-3 py-1.5 text-xs font-medium text-zinc-400 dark:text-zinc-500">
                Tema
              </p>
              <button
                onClick={() => alterarTema('claro')}
                className={`flex w-full items-center gap-2 px-3 py-2 text-left text-sm transition ${
                  tema === 'claro'
                    ? 'bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100'
                    : 'text-zinc-600 hover:bg-zinc-50 dark:text-zinc-400 dark:hover:bg-zinc-800/50'
                }`}
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="5" />
                  <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
                </svg>
                Claro
              </button>
              <button
                onClick={() => alterarTema('escuro')}
                className={`flex w-full items-center gap-2 px-3 py-2 text-left text-sm transition ${
                  tema === 'escuro'
                    ? 'bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100'
                    : 'text-zinc-600 hover:bg-zinc-50 dark:text-zinc-400 dark:hover:bg-zinc-800/50'
                }`}
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
                Escuro
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
