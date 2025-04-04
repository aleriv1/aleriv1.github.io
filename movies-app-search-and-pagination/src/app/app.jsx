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
    // this.handleSearch = debounce(this.handleSearch.bind(this), 200)
    this.handleSearch = debounce(this._handleSearch, 300)
    // this.fetchMovies()
  }

  fetchMovies(query = 'return', page = 1) {
    this.setState({ loading: true, error: null })
    fetchMoviesByQuery(query, page)
      .then((data) => {
        const moviesToShow = data.results.slice(0, 6)

        // console.log('data.results', data.results)
        // const moviesPerPage = 6
        // const startIndex = (page - 1) * moviesPerPage
        // const endIndex = startIndex + moviesPerPage
        // const paginatedMovies = data.results.slice(startIndex, endIndex)
        // this.setState({ movies: paginatedMovies, loading: false, totalResults: data.total_results })

        // this.setState({ movies: data.results, loading: false, totalResults: data.total_results })
        this.setState({ movies: moviesToShow, loading: false, totalResults: data.total_results })

        // setTimeout(() => {
        //   this.setState({ movies: data.results, loading: false, totalResults: data.total_results })
        // }, 1000)
      })
      .catch(() => {
        this.setState({ loading: false, error: 'Something went wrong, \nbut we do everything \nto RETURN \nyou joy' })
      })
  }

  // handleSearch(event) {
  _handleSearch = (event) => {
    const query = event.target.value
    this.setState({ searchQuery: query, currentPage: 1 }, () => {
      this.fetchMovies(query, 1)
    })
  }

  onPageChange = (page) => {
    console.log('onPageChange', page)
    const { searchQuery } = this.state
    this.setState({ currentPage: page, loading: true }, () => {
      this.fetchMovies(searchQuery, page)
    })
  }

  componentDidMount() {
    console.log('componentDidMount')
    this.fetchMovies()
  }

  render() {
    const { movies, loading, error, searchQuery, currentPage, totalResults } = this.state

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
          {/* {console.log('movies', movies)} */}
          <Input
            placeholder="search"
            value={searchQuery}
            onChange={this.handleSearch}
            // disabled={loading}
            style={{ margin: '20px auto', width: '90%', maxWidth: '600px', display: 'block' }}
          />

          {loading && movies.length === 0 ? (
            <div className="loading-container-common">
              <Spin fullscreen />
            </div>
          ) : error ? (
            <Alert message={error} />
          ) : movies.length === 0 ? (
            <Alert message="No movies found" />
          ) : (
            <>
              <MovieList movies={movies} loading={loading} />
              <Pagination
                current={currentPage}
                total={totalResults}
                pageSize={6}
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
