'use client'

import { usePathname } from 'next/navigation'

export default function NavBar() {
  const pathname = usePathname()
  const isHinoPage = pathname?.startsWith('/hino/')

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
      </div>
    </header>
  )
}
