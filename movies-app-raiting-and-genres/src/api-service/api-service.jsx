const apiKey = 'a1393a81c921f0017ed0d451aef0668e'

export async function fetchMoviesByQuery(query, page) {
  const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}&page=${page}`
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error(`Http error: ${response.status}`)
  }
  const data = await response.json()
  return { results: data.results, total_results: data.total_results } || []
}

export async function fetchGuestSession() {
  const url = `https://api.themoviedb.org/3/authentication/guest_session/new?api_key=${apiKey}`
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error(`Http error: ${response.status}`)
  }
  const data = await response.json()
  console.log(data)
  return {
    guestSessionId: data.guest_session_id,
    expiresAt: data.expires_at,
  }
}

export async function fetchGenres() {
  const url = `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}`

  const response = await fetch(url)
  if (!response.ok) {
    throw new Error(`Http error: ${response.status}`)
  }
  const data = await response.json()
  return data.genres
}

export async function fetchRatedMovies(guestSessionId, page) {
  const url = `https://api.themoviedb.org/3/guest_session/${guestSessionId}/rated/movies?api_key=${apiKey}&page=${page}`

  const response = await fetch(url)
  if (!response.ok) {
    if (response.status === 404) {
      return { results: [], total_results: 0 }
    }
    throw new Error(`Http error: ${response.status}`)
  }
  const data = await response.json()
  return (
    {
      results: data.results,
      total_results: data.total_results,
    } || []
  )
}

export async function rateMovie(guestSessionId, movieId, rating) {
  const url = `https://api.themoviedb.org/3/movie/${movieId}/rating?api_key=${apiKey}&guest_session_id=${guestSessionId}`

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ value: rating }),
  })
  if (!response.ok) {
    throw new Error(`Http error: ${response.status}`)
  }
  const data = await response.json()
  return data
}
