'use client'

import { useState, useCallback, useMemo, useEffect } from 'react'
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
  const [porPagina, setPorPagina] = useState(6)

  useEffect(() => {
    function calcular() {
      const altura = window.innerHeight
      const cabem = Math.max(2, Math.floor((altura - 200) / 84))
      setPorPagina(cabem)
    }
    calcular()
    window.addEventListener('resize', calcular)
    return () => window.removeEventListener('resize', calcular)
  }, [])

  useEffect(() => {
    function handleToggle() {
      setMostrarFavoritos(v => !v)
      setPagina(1)
    }
    window.addEventListener('harpa:toggle-fav-filter', handleToggle)
    return () => window.removeEventListener('harpa:toggle-fav-filter', handleToggle)
  }, [])

  const filtrados = useMemo(() => {
    const resultado = query ? buscarHinos(query) : hinos
    if (!mostrarFavoritos) return resultado
    const favIds = getFavorites()
    return resultado.filter(h => favIds.includes(h.id))
  }, [query, mostrarFavoritos, favVersion])

  const buscaAtiva = query.length > 0 || mostrarFavoritos
  const { itens, total, paginaAtual, totalPaginas } = paginar(filtrados, pagina, porPagina)

  const handleSearch = useCallback((q) => {
    setQuery(q)
    setPagina(1)
  }, [])

  const handleFavChange = useCallback(() => {
    setFavVersion(v => v + 1)
  }, [])


  return (
    <div className="mx-auto max-w-6xl px-3 sm:px-12 pt-8">
      <div className="mb-8">
        <SearchBar onSearch={handleSearch} />
      </div>

      {itens.length === 0 ? (
        <div className="flex flex-1 items-center justify-center py-20 text-center">
          <div>
            <p className="text-lg font-medium text-zinc-500 dark:text-zinc-200">
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
            <div className="fixed bottom-0 left-0 right-0 z-10 flex items-center justify-center gap-2 border-t border-zinc-200 bg-white/80 px-4 py-3 backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/80">
              <button
                onClick={() => setPagina(p => Math.max(1, p - 1))}
                disabled={paginaAtual <= 1}
                className="rounded-lg px-4 min-h-[44px] text-sm text-zinc-500 transition hover:bg-zinc-100 disabled:opacity-30 dark:hover:bg-zinc-800 cursor-pointer active:scale-[0.97]"
              >
                Anterior
              </button>
              <span className="text-sm text-zinc-400">
                {paginaAtual} de {totalPaginas}
              </span>
              <button
                onClick={() => setPagina(p => Math.min(totalPaginas, p + 1))}
                disabled={paginaAtual >= totalPaginas}
                className="rounded-lg px-4 min-h-[44px] text-sm text-zinc-500 transition hover:bg-zinc-100 disabled:opacity-30 dark:hover:bg-zinc-800 cursor-pointer active:scale-[0.97]"
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
