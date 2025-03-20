import { Component } from 'react'

import fetchMoviesByQuery from '../api-service/api-service'
import MovieList from '../movie-list'

export default class App extends Component {
  constructor(props) {
    super(props)
    // this.
    this.state = {
      movies: [],
    }
    this.fetchMovies()
  }

  // state = {
  //   movies: [],
  // }

  fetchMovies() {
    // const movies = fetchMoviesByQuery('return')
    // console.log(movies)
    // this.setState({ movies })
    fetchMoviesByQuery('return').then((movies) => {
      this.setState({ movies })
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
