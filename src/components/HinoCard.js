'use client'

import Link from 'next/link'
import { isFavorite, toggleFavorite } from '@/lib/favorites'
import { useState, useEffect } from 'react'

export default function HinoCard({ hino, onFavChange }) {
  const [fav, setFav] = useState(false)

  useEffect(() => {
    setFav(isFavorite(hino.id))
  }, [hino.id])

  function handleFav(e) {
    e.preventDefault()
    e.stopPropagation()
    const novo = toggleFavorite(hino.id)
    setFav(novo)
    onFavChange?.()
  }

  return (
    <Link
      href={`/hino/${hino.id}`}
      className="group relative flex items-center gap-4 rounded-xl border border-zinc-200 bg-white p-4 transition hover:border-zinc-300 hover:shadow-sm dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-700 cursor-pointer"
    >
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-zinc-100 text-sm font-bold text-zinc-500 dark:bg-zinc-800 dark:text-zinc-200">
        {hino.numero}
      </span>
      <span className="flex-1 text-sm font-medium text-zinc-800 dark:text-zinc-200">
        {hino.titulo}
      </span>
      <button
        onClick={handleFav}
        className="flex shrink-0 items-center justify-center min-h-[44px] min-w-[44px] text-zinc-300 hover:text-red-400 dark:text-zinc-600 dark:hover:text-red-400 active:scale-[0.9] transition-transform"
        aria-label={fav ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
      >
        <svg
          className={`h-5 w-5 transition ${fav ? 'fill-red-500 text-red-500' : 'fill-none'}`}
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
        </svg>
      </button>
    </Link>
  )
}
