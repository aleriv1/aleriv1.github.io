import { Component } from 'react'

import fetchMoviesByQuery from '../api-service/api-service'
import MovieList from '../movie-list'
import './app.scss'

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      movies: [],
    }
    this.fetchMovies()
  }

  fetchMovies() {
    fetchMoviesByQuery('return').then((movies) => {
      const limitedMOvies = movies.slice(0, 6)
      this.setState({ movies: limitedMOvies })
    })
  }

  render() {
    return (
      <div>
        <MovieList movies={this.state.movies} />
      </div>
    )
  }
}
