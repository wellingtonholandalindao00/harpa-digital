import { notFound } from 'next/navigation'
import { carregarHinos, buscarHino } from '@/lib/hinos'
import HinoViewer from '@/components/HinoViewer'

export function generateStaticParams() {
  const hinos = carregarHinos()
  return hinos.map(h => ({ id: String(h.id) }))
}

export default async function HinoPage({ params }) {
  const { id: idStr } = await params
  const id = Number(idStr)

  if (isNaN(id) || id < 1 || id > 640) {
    notFound()
  }

  const hino = buscarHino(id)

  if (!hino) {
    notFound()
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <HinoViewer hino={hino} />
    </div>
  )
}
