'use client'

import { useState, useCallback, useMemo } from 'react'
import { carregarHinos, buscarHinos, paginar } from '@/lib/hinos'
import { getFavorites } from '@/lib/favorites'
import HinoCard from '@/components/HinoCard'
import SearchBar from '@/components/SearchBar'

const hinos = carregarHinos()

export default function Home() {
  const [query, setQuery] = useState('')
  const [pagina, setPagina] = useState(1)
  const [mostrarFavoritos, setMostrarFavoritos] = useState(false)
  const [favVersion, setFavVersion] = useState(0)

  const filtrados = useMemo(() => {
    const resultado = query ? buscarHinos(query) : hinos
    if (!mostrarFavoritos) return resultado
    const favIds = getFavorites()
    return resultado.filter(h => favIds.includes(h.id))
  }, [query, mostrarFavoritos, favVersion])

  const buscaAtiva = query.length > 0 || mostrarFavoritos
  const { itens, total, paginaAtual, totalPaginas } = paginar(filtrados, pagina)

  const handleSearch = useCallback((q) => {
    setQuery(q)
    setPagina(1)
  }, [])

  const handleFavChange = useCallback(() => {
    setFavVersion(v => v + 1)
  }, [])

  const toggleFavFilter = useCallback(() => {
    setMostrarFavoritos(v => !v)
    setPagina(1)
  }, [])

  return (
    <div className="mx-auto max-w-6xl px-6 sm:px-12 py-8">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={toggleFavFilter}
            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-sm transition ${
              mostrarFavoritos
                ? 'bg-red-50 text-red-600 dark:bg-red-900/30 dark:text-red-400'
                : 'bg-zinc-100 text-zinc-500 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700'
            }`}
          >
            <svg className={`h-3.5 w-3.5 ${mostrarFavoritos ? 'fill-red-500 text-red-500' : 'fill-none'}`} viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
            Favoritos
          </button>
        </div>
        <SearchBar onSearch={handleSearch} />
      </div>

      {itens.length === 0 ? (
        <div className="flex flex-1 items-center justify-center py-20 text-center">
          <div>
            <p className="text-lg font-medium text-zinc-500 dark:text-zinc-400">
              {mostrarFavoritos ? 'Nenhum favorito' : 'Nenhum hino encontrado'}
            </p>
            <p className="mt-1 text-sm text-zinc-400 dark:text-zinc-500">
              {mostrarFavoritos
                ? 'Favorite um hino para vê-lo aqui'
                : 'Tente buscar por outro termo'}
            </p>
          </div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {itens.map((hino) => (
              <HinoCard key={hino.id} hino={hino} onFavChange={handleFavChange} />
            ))}
          </div>

          {!buscaAtiva && totalPaginas > 1 && (
            <div className="mt-8 flex items-center justify-center gap-2">
              <button
                onClick={() => setPagina(p => Math.max(1, p - 1))}
                disabled={paginaAtual <= 1}
                className="rounded-lg px-3 py-1.5 text-sm text-zinc-500 transition hover:bg-zinc-100 disabled:opacity-30 dark:hover:bg-zinc-800"
              >
                Anterior
              </button>
              <span className="text-sm text-zinc-400">
                {paginaAtual} de {totalPaginas}
              </span>
              <button
                onClick={() => setPagina(p => Math.min(totalPaginas, p + 1))}
                disabled={paginaAtual >= totalPaginas}
                className="rounded-lg px-3 py-1.5 text-sm text-zinc-500 transition hover:bg-zinc-100 disabled:opacity-30 dark:hover:bg-zinc-800"
              >
                Próximo
              </button>
            </div>
          )}

          {mostrarFavoritos && !buscaAtiva && totalPaginas === 1 && filtrados.length > 0 && (
            <p className="mt-6 text-center text-xs text-zinc-400 dark:text-zinc-500">
              Mostrando todos os {filtrados.length} favoritos
            </p>
          )}
        </>
      )}
    </div>
  )
}
