const apiKey = 'a1393a81c921f0017ed0d451aef0668e'

export async function fetchMoviesByQuery(query, page) {
  const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}&page=${page}`
  try {
    const response = await fetch(url)
    const data = await response.json()
    return { results: data.results, total_results: data.total_results } || []
  } catch (error) {
    console.error('Ошибка получения фильмов', error)
    throw error
  }
}

export async function fetchGuestSession() {
  const url = `https://api.themoviedb.org/3/authentication/guest_session/new?api_key=${apiKey}`
  try {
    const response = await fetch(url)
    const data = await response.json()
    console.log(data)
    return {
      guestSessionId: data.guest_session_id,
      expiresAt: data.expires_at,
    }
  } catch (error) {
    console.error('Ошибка создания гостевой сессии', error)
    throw error
  }
}

export async function fetchGenres() {
  const url = `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}`

  try {
    const response = await fetch(url)
    const data = await response.json()
    return data.genres
  } catch (error) {
    console.error('Ошибка получения жанров', error)
    throw error
  }
}

export async function fetchRatedMovies(guestSessionId, page) {
  const url = `https://api.themoviedb.org/3/guest_session/${guestSessionId}/rated/movies?api_key=${apiKey}&page=${page}`

  try {
    const response = await fetch(url)
    const data = await response.json()
    return (
      {
        results: data.results,
        total_results: data.total_results,
      } || []
    )
  } catch (error) {
    console.error('Ошибка получения оцененных фильмов', error)
    throw error
  }
}

export async function rateMovie(guestSessionId, movieId, rating) {
  const url = `https://api.themoviedb.org/3/movie/${movieId}/rating?api_key=${apiKey}&guest_session_id=${guestSessionId}`

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ value: rating }),
    })
    const data = await response.json()
    return data
  } catch (error) {
    console.error('Ошибка оценки фильма', error)
    throw error
  }
}
