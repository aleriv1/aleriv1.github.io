import { Component } from 'react'
import { Offline, Online } from 'react-detect-offline'
import { Alert, Input, Pagination, Spin } from 'antd'
import debounce from 'lodash/debounce'

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
      searchQuery: '',
      currentPage: 1,
      totalResults: 0,
    }
    // this.fetchMovies()
  }

  fetchMovies(query = 'return', page = 1) {
    // Promise.reject(() => {
    // throw new Error('error')
    // })
    this.setState({ loading: true, error: null })
    fetchMoviesByQuery(query, page)
      .then((data) => {
        // const limitedMovies = movies.slice(0, 6)
        setTimeout(() => {
          this.setState({ movies: data.results, loading: false, totalResults: data.total_results })
        }, 1000)
      })
      .catch(() => {
        this.setState({ loading: false, error: 'Something went wrong, \nbut we do everything \nto RETURN \nyou joy' })
      })
  }

  handleSearch(event) {
    const query = event.target.value
    this.setState({ searchQuery: query, currentPage: 1 })
  }

  componentDidMount() {
    this.fetchMovies()
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
          <Input placeholder="search" value={searchQuery} onChange={this.handleSearch} disabled={loading} />

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
