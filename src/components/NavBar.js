'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

function getTemaAtual() {
  if (typeof window === 'undefined') return 'claro'
  const stored = localStorage.getItem('harpa-digital-tema')
  if (stored === 'escuro' || stored === 'claro') return stored
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'escuro' : 'claro'
}

export default function NavBar() {
  const pathname = usePathname()
  const isHinoPage = pathname?.startsWith('/hino/')
  const [tema, setTema] = useState('claro')
  const [favAtivo, setFavAtivo] = useState(false)

  useEffect(() => {
    setTema(getTemaAtual())
  }, [])

  useEffect(() => {
    document.documentElement.classList.toggle('dark', tema === 'escuro')
  }, [tema])

  function toggleTema() {
    const novo = tema === 'claro' ? 'escuro' : 'claro'
    setTema(novo)
    localStorage.setItem('harpa-digital-tema', novo)
    document.querySelector('meta[name="color-scheme"]')?.setAttribute('content', novo === 'escuro' ? 'dark' : 'light')
  }

  return (
    <header className="sticky top-0 z-10 border-b border-zinc-200 bg-white/80 backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/80">
      <div className="mx-auto flex h-14 max-w-6xl items-center px-6 sm:px-12">
        <Link href="/" className="inline-flex items-center gap-1.5 text-lg font-bold tracking-tight cursor-pointer">
          {isHinoPage && (
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path d="m15 18-6-6 6-6" />
            </svg>
          )}
          {isHinoPage ? 'Voltar para lista' : 'Harpa Digital'}
        </Link>

        <div className="flex items-center gap-1 ml-auto">
          <button
            onClick={() => {
              setFavAtivo(v => !v)
              window.dispatchEvent(new CustomEvent('harpa:toggle-fav-filter'))
            }}
            className="flex items-center justify-center rounded-lg min-h-[44px] min-w-[44px] text-zinc-500 transition hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800 cursor-pointer active:scale-[0.95]"
            aria-label={favAtivo ? 'Mostrar todos os hinos' : 'Mostrar favoritos'}
          >
            <svg
              className={`h-5 w-5 ${favAtivo ? 'fill-red-500 text-red-500' : 'fill-none'}`}
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
          </button>

          <button
            onClick={toggleTema}
            className="flex items-center justify-center rounded-lg min-h-[44px] min-w-[44px] text-zinc-500 transition hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800 cursor-pointer active:scale-[0.95]"
            aria-label={tema === 'claro' ? 'Modo escuro' : 'Modo claro'}
          >
            {tema === 'claro' ? (
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            ) : (
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="5" />
                <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
              </svg>
            )}
          </button>
          </div>
        </div>
      </header>
  )
}
