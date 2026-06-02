import hinosRaw from '@/data/hinos.json'

function limparHino(raw) {
  const parts = raw.hino.split(' - ')
  const numero = Number(parts[0])
  const titulo = parts.slice(1).join(' - ')

  const coro = (raw.coro || '').replace(/<br>/g, '\n').trim()

  const versos = Object.values(raw.verses || {}).map(v =>
    v.replace(/<br>/g, '\n').trim()
  )

  return {
    id: numero,
    numero,
    titulo,
    coro,
    temCoro: coro.length > 0,
    versos
  }
}

function normalizar(str) {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim()
}

let hinosProcessados = null

export function carregarHinos() {
  if (hinosProcessados) return hinosProcessados
  hinosProcessados = Object.entries(hinosRaw)
    .filter(([key]) => /^\d+$/.test(key))
    .map(([, value]) => limparHino(value))
    .sort((a, b) => a.numero - b.numero)
  return hinosProcessados
}

export function buscarHino(id) {
  const hinos = carregarHinos()
  return hinos.find(h => h.id === id) || null
}

export function buscarHinos(query) {
  const hinos = carregarHinos()
  const q = normalizar(query)

  if (!q) return hinos

  const num = Number(q)
  if (!isNaN(num) && num >= 1 && num <= 640) {
    const porNumero = hinos.filter(h => h.numero === num)
    if (porNumero.length > 0) return porNumero
  }

  return hinos.filter(h => {
    if (normalizar(h.titulo).includes(q)) return true
    if (h.temCoro && normalizar(h.coro).includes(q)) return true
    return h.versos.some(v => normalizar(v).includes(q))
  })
}

export function paginar(hinos, pagina = 1, porPagina = 8) {
  const inicio = (pagina - 1) * porPagina
  return {
    itens: hinos.slice(inicio, inicio + porPagina),
    total: hinos.length,
    paginaAtual: pagina,
    totalPaginas: Math.ceil(hinos.length / porPagina)
  }
}
