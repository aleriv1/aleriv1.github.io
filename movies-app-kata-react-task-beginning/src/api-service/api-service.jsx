export default async function fetchMoviesByQuery(query) {
  const apiKey = 'a1393a81c921f0017ed0d451aef0668e'
  const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}`
  try {
    const response = await fetch(url)
    const data = await response.json()
    return data.results || []
  } catch (error) {
    console.error('Ошибка получения фильмов', error)
  }
}
