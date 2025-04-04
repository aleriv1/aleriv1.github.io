import { Component } from 'react'
import { Offline, Online } from 'react-detect-offline'
import { Alert, Input, Pagination, Spin } from 'antd'
import debounce from 'lodash/debounce'

import fetchMoviesByQuery from '../api-service/api-service'
import MovieList from '../movie-list'

import './app.scss'

const MOVIES_PER_PAGE = 6

export default class App extends Component {
  state = {
    movies: [],
    visibleMovies: [],
    loading: true,
    error: null,
    searchQuery: '',
    currentPage: 1,
    totalResults: 0,
  }

  _fetchMovies = (query = 'return', page = 1) => {
    const realQuery = query.trim() || 'return'
    const apiPage = Math.floor(((page - 1) * MOVIES_PER_PAGE) / 20) + 1
    this.setState({ loading: true, error: null })
    // fetchMoviesByQuery(query, page)
    // fetchMoviesByQuery(realQuery, page)
    fetchMoviesByQuery(realQuery, apiPage)
      .then((data) => {
        const startIndex = ((page - 1) * MOVIES_PER_PAGE) % 20
        const visibleMovies = data.results.slice(startIndex, startIndex + MOVIES_PER_PAGE)

        this.setState({ movies: data.results, visibleMovies, loading: false, totalResults: data.total_results })
      })
      .catch(() => {
        this.setState({ loading: false, error: 'Something went wrong, \nbut we do everything \nto RETURN \nyou joy' })
      })
  }

  debouncedFetchMovies = debounce((query, page) => {
    // const { currentPage } = this.state
    // this._fetchMovies(query, currentPage)
    this._fetchMovies(query, page)
  }, 300)

  handleInputSearch = (event) => {
    const query = event.target.value
    this.setState({ searchQuery: query }, () => {
      // this.debouncedFetchMovies(query)
      this.debouncedFetchMovies(query, 1)
    })
  }

  onPageChange = (page) => {
    console.log('searchQuery', this.state.searchQuery)
    const { searchQuery } = this.state
    this.setState({ currentPage: page, loading: true }, () => {
      // this.debouncedFetchMovies(searchQuery)
      this.debouncedFetchMovies(searchQuery, page)
    })
  }

  componentDidMount() {
    console.log('componentDidMount')
    this._fetchMovies()
  }

  render() {
    // const { movies, loading, error, searchQuery, currentPage, totalResults } = this.state
    const { visibleMovies, loading, error, searchQuery, currentPage, totalResults } = this.state

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
          <Input
            placeholder="search"
            value={searchQuery}
            onChange={this.handleInputSearch}
            disabled={loading}
            style={{ margin: '20px auto', width: '90%', maxWidth: '600px', display: 'block' }}
          />

          {/* {loading && movies.length === 0 ? ( */}
          {loading && visibleMovies.length === 0 ? (
            <div className="loading-container-common">
              <Spin fullscreen />
            </div>
          ) : error ? (
            <Alert message={error} />
          ) : visibleMovies.length === 0 ? (
            <Alert message="No movies found" />
          ) : (
            <>
              <MovieList movies={visibleMovies} loading={loading} />
              <Pagination
                current={currentPage}
                total={totalResults}
                // pageSize={6}
                pageSize={20}
                onChange={this.onPageChange}
                style={{ margin: '20px auto', textAlign: 'center' }}
                disabled={loading}
              />
            </>
            // <MovieList movies={[]} loading={true} />
          )}
        </Online>
      </div>
    )
  }
}
