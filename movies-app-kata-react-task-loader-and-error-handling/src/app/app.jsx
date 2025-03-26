import { Component } from 'react'
import { Offline, Online } from 'react-detect-offline'
import { Alert } from 'antd'

import fetchMoviesByQuery from '../api-service/api-service'
import MovieList from '../movie-list'

import './app.scss'

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      movies: [],
      loading: true,
      error: null,
    }
    this.fetchMovies()
  }

  fetchMovies() {
    // Promise.reject(() => {
    // throw new Error('error')
    // })
    fetchMoviesByQuery('return')
      .then((movies) => {
        const limitedMovies = movies.slice(0, 6)
        setTimeout(() => {
          this.setState({ movies: limitedMovies, loading: false })
        }, 1000)
      })
      .catch(() => {
        this.setState({ loading: false, error: 'Something went wrong, \nbut we do everything \nto RETURN \nyou joy' })
      })
  }

  render() {
    return (
      <div className="app">
        <Offline>
          <Alert
            message="You are offline"
            type="warning"
            description="Make sure you have an active internet connection"
            banner={true}
          />
        </Offline>

        <Online>
          {this.state.error ? (
            <Alert message={this.state.error} />
          ) : (
            <MovieList movies={this.state.movies} loading={this.state.loading} />
            // <MovieList movies={[]} loading={true} />
          )}
        </Online>
      </div>
    )
  }
}
