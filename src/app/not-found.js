import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex flex-1 items-center justify-center px-4 py-20 text-center">
      <div>
        <p className="text-5xl font-bold text-zinc-200 dark:text-zinc-800">
          404
        </p>
        <h1 className="mt-4 text-xl font-semibold">
          Hino não encontrado
        </h1>
        <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
          O hino que você procura não existe ou foi removido.
        </p>
        <Link
          href="/"
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-zinc-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300"
        >
          Voltar para lista
        </Link>
      </div>
    </div>
  )
}
