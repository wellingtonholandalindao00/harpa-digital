const STORAGE_KEY = 'harpa-digital-favoritos'

export function getFavorites() {
  try {
    const data = localStorage.getItem(STORAGE_KEY)
    return data ? JSON.parse(data) : []
  } catch {
    return []
  }
}

export function isFavorite(id) {
  return getFavorites().includes(id)
}

export function toggleFavorite(id) {
  try {
    const favs = getFavorites()
    const index = favs.indexOf(id)
    if (index >= 0) {
      favs.splice(index, 1)
    } else {
      favs.push(id)
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favs))
    return !(index >= 0)
  } catch {
    return isFavorite(id)
  }
}
