import { Component } from 'react'

import fetchMoviesByQuery from '../api-service/api-service'
import MovieList from '../movie-list'
import './app.scss'

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      movies: [],
      loading: true,
    }
    this.fetchMovies()
  }

  fetchMovies() {
    // console.log('fetchMovies called')
    fetchMoviesByQuery('return')
      .then((movies) => {
        const limitedMovies = movies.slice(0, 6)
        // console.log('Before setTimeout, loading:', this.state.loading)
        setTimeout(() => {
          // console.log('Inside setTimeout, setting loading to false')
          this.setState({ movies: limitedMovies, loading: false })
        }, 1000)
      })
      .catch((error) => {
        console.log('the erroris', error)
        this.setState({ loading: false })
      })
  }

  render() {
    return (
      <div style={{ height: '100%' }}>
        <MovieList movies={this.state.movies} loading={this.state.loading} />
        {/* <MovieList movies={this.state.movies} loading={true} /> */}
      </div>
    )
  }
}
