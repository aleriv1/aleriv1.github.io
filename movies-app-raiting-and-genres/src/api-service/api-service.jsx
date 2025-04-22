export default async function fetchMoviesByQuery(query, page) {
  const apiKey = 'a1393a81c921f0017ed0d451aef0668e'
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
