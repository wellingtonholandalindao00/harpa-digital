'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { isFavorite, toggleFavorite } from '@/lib/favorites'
import { carregarHinos } from '@/lib/hinos'

export default function HinoViewer({ hino }) {
  const [fav, setFav] = useState(false)

  useEffect(() => {
    setFav(isFavorite(hino.id))
  }, [hino.id])

  function handleFav() {
    const novo = toggleFavorite(hino.id)
    setFav(novo)
  }

  const hinos = carregarHinos()
  const idx = hinos.findIndex(h => h.id === hino.id)
  const anterior = idx > 0 ? hinos[idx - 1] : null
  const proximo = idx < hinos.length - 1 ? hinos[idx + 1] : null

  return (
    <article className="mx-auto max-w-4xl px-4 sm:px-8">
      <header className="mb-8 text-center">
        <span className="text-sm font-medium text-zinc-400 dark:text-zinc-500">
          Hino {hino.numero}
        </span>
        <h1 className="mt-1 text-2xl font-bold text-zinc-900 dark:text-zinc-100">
          {hino.titulo}
        </h1>
        <button
          onClick={handleFav}
          className={`mt-3 inline-flex items-center gap-2 rounded-full px-5 min-h-[44px] text-sm transition cursor-pointer active:scale-[0.97] ${
            fav
              ? 'bg-red-50 text-red-600 dark:bg-red-900/30 dark:text-red-400'
              : 'bg-zinc-100 text-zinc-500 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700'
          }`}
        >
          <svg
            className={`h-4 w-4 ${fav ? 'fill-red-500 text-red-500' : 'fill-none'}`}
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
          {fav ? 'Favorito' : 'Favoritar'}
        </button>
      </header>

      <section className="space-y-6 text-lg leading-relaxed text-zinc-700 dark:text-zinc-100">
        {hino.versos.map((verso, i) => (
          <div key={i}>
            {hino.temCoro && i > 0 && (
              <div className="my-4 border-l-4 border-zinc-200 pl-4 text-base italic text-zinc-500 dark:border-zinc-700 dark:text-zinc-200">
                {hino.coro.split('\n').map((linha, j) => (
                  <p key={j}>{linha}</p>
                ))}
              </div>
            )}
            {verso.split('\n').map((linha, j) => (
              <p key={j}>{linha}</p>
            ))}
          </div>
        ))}
        {hino.temCoro && (
          <div className="border-l-4 border-zinc-200 pl-4 text-base italic text-zinc-500 dark:border-zinc-700 dark:text-zinc-200">
            {hino.coro.split('\n').map((linha, j) => (
              <p key={j}>{linha}</p>
            ))}
          </div>
        )}
      </section>

      <nav className="mt-12 flex items-center justify-between border-t border-zinc-200 pt-6 dark:border-zinc-800">
        {anterior ? (
          <Link
            href={`/hino/${anterior.id}`}
            className="flex items-center gap-2 py-2 text-sm text-zinc-500 transition hover:text-zinc-800 dark:hover:text-zinc-200 cursor-pointer"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path d="m15 18-6-6 6-6" />
            </svg>
            {anterior.numero}. {anterior.titulo}
          </Link>
        ) : (
          <div />
        )}
        {proximo ? (
          <Link
            href={`/hino/${proximo.id}`}
            className="flex items-center gap-2 py-2 text-right text-sm text-zinc-500 transition hover:text-zinc-800 dark:hover:text-zinc-200 cursor-pointer"
          >
            {proximo.numero}. {proximo.titulo}
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path d="m9 18 6-6-6-6" />
            </svg>
          </Link>
        ) : (
          <div />
        )}
      </nav>
    </article>
  )
}
