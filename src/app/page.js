'use client'

import { useState, useCallback } from 'react'
import { carregarHinos, buscarHinos, paginar } from '@/lib/hinos'
import HinoCard from '@/components/HinoCard'
import SearchBar from '@/components/SearchBar'

const hinos = carregarHinos()

export default function Home() {
  const [filtrados, setFiltrados] = useState(hinos)
  const [pagina, setPagina] = useState(1)
  const [buscaAtiva, setBuscaAtiva] = useState(false)

  const handleSearch = useCallback((query) => {
    const resultado = buscarHinos(query)
    setFiltrados(resultado)
    setPagina(1)
    setBuscaAtiva(query.length > 0)
  }, [])

  const { itens, total, paginaAtual, totalPaginas } = paginar(filtrados, pagina)

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-bold">Harpa Cristã</h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            {total} hinos encontrados
          </p>
        </div>
        <SearchBar onSearch={handleSearch} />
      </div>

      {itens.length === 0 ? (
        <div className="flex flex-1 items-center justify-center py-20 text-center">
          <div>
            <p className="text-lg font-medium text-zinc-500 dark:text-zinc-400">
              Nenhum hino encontrado
            </p>
            <p className="mt-1 text-sm text-zinc-400 dark:text-zinc-500">
              Tente buscar por outro termo
            </p>
          </div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {itens.map((hino) => (
              <HinoCard key={hino.id} hino={hino} />
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
        </>
      )}
    </div>
  )
}
