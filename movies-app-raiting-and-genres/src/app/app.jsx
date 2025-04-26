import { Component } from 'react'
import { Offline, Online } from 'react-detect-offline'
import { Alert, Input, Pagination, Spin, Tabs } from 'antd'
import debounce from 'lodash/debounce'

import MovieList from '../movie-list'
import { fetchMoviesByQuery, fetchGuestSession, fetchGenres, fetchRatedMovies } from '../api-service/api-service'
import { GenreProvider } from '../genre-context/genre-context'

import './app.scss'

const MOVIES_PER_PAGE = 6
const SEARCH_QUERY_KEY = 'movieSearchQuery'

export default class App extends Component {
  state = {
    movies: [],
    visibleMovies: [],
    ratedMovies: [],
    visibleRatedMovies: [],
    loading: true,
    error: null,
    searchQuery: '',
    currentPage: 1,
    totalResults: 0,
    ratedCurrentPage: 1,
    ratedTotalResults: 0,
    genres: [],
    guestSessionId: null,
    activeTab: 'search',
  }

  _saveSearchQuery = (query) => {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(SEARCH_QUERY_KEY, query)
    }
  }

  _loadSearchQuery = () => {
    if (typeof localStorage !== 'undefined') {
      const savedQuery = localStorage.getItem(SEARCH_QUERY_KEY)
      return savedQuery || ''
    }
    return ''
  }

  _fetchMovies = (query = 'return', page = 1) => {
    const realQuery = query.trim() || 'return'
    const apiPage = Math.floor(((page - 1) * MOVIES_PER_PAGE) / 20) + 1

    this.setState({ loading: true, error: null })

    fetchMoviesByQuery(realQuery, apiPage)
      .then((data) => {
        const startIndex = ((page - 1) * MOVIES_PER_PAGE) % 20
        let visibleMovies = data.results.slice(startIndex, startIndex + MOVIES_PER_PAGE)
        if (visibleMovies.length < MOVIES_PER_PAGE && data.results.length === 20) {
          const nextPage = apiPage + 1
          fetchMoviesByQuery(realQuery, nextPage)
            .then((nextData) => {
              const remaining = MOVIES_PER_PAGE - visibleMovies.length
              const additionalMovies = nextData.results.slice(0, remaining)
              visibleMovies = [...visibleMovies, ...additionalMovies]
              this.setState({
                movies: data.results,
                visibleMovies,
                loading: false,
                totalResults: data.total_results,
              })
            })
            .catch(() => {
              this.setState({
                loading: false,
                error: 'Something went wrong, \nbut we do everything \nto RETURN \nyou joy',
              })
            })
        } else {
          this.setState({
            movies: data.results,
            visibleMovies,
            loading: false,
            totalResults: data.total_results,
          })
        }
      })
      .catch(() => {
        this.setState({ loading: false, error: 'Something went wrong, \nbut we do everything \nto RETURN \nyou joy' })
      })
  }

  _fetchRatedMovies = (page = 1) => {
    const { guestSessionId } = this.state

    const apiPage = Math.floor(((page - 1) * MOVIES_PER_PAGE) / 20) + 1

    this.setState({ loading: true, error: null })

    fetchRatedMovies(guestSessionId, apiPage)
      .then((data) => {
        const startIndex = ((page - 1) * MOVIES_PER_PAGE) % 20
        let visibleMovies = data.results.slice(startIndex, startIndex + MOVIES_PER_PAGE)

        const hasMorepages = data.total_pages && apiPage < data.total_pages

        if (visibleMovies.length < MOVIES_PER_PAGE && data.results.length === 20 && hasMorepages) {
          const nextPage = apiPage + 1
          fetchRatedMovies(guestSessionId, nextPage)
            .then((nextData) => {
              const remaining = MOVIES_PER_PAGE - visibleMovies.length
              const additionalMovies = nextData.results.slice(0, remaining)
              visibleMovies = [...visibleMovies, ...additionalMovies]
              this.setState({
                ratedMovies: data.results,
                visibleRatedmovies: visibleMovies,
                loading: false,
                ratedTotalResults: data.total_results,
              })
            })
            .catch(() => {
              this.setState({
                loading: false,
                error: 'Failed to fetch additional rated movies',
              })
            })
        } else {
          this.setState({
            ratedMovies: data.results,
            visibleRatedMovies: visibleMovies,
            loading: false,
            ratedTotalResults: data.total_results,
          })
        }
      })
      .catch(() => {
        this.setState({
          loading: false,
          error: 'Failed to fetch rated movies',
        })
      })
  }

  debouncedFetchMovies = debounce((query, page) => {
    this._fetchMovies(query, page)
  }, 700)

  handleInputSearch = (event) => {
    const query = event.target.value
    this.setState({ searchQuery: query, currentPage: 1 }, () => {
      this._saveSearchQuery(query)
      this.debouncedFetchMovies(query, 1)
    })
  }

  onPageChange = (page) => {
    const { searchQuery, activeTab } = this.state
    this.setState(
      activeTab === 'search' ? { currentPage: page, loading: true } : { ratedCurrentPage: page, loading: true },
      () => {
        if (activeTab === 'search') {
          this.debouncedFetchMovies(searchQuery, page)
        } else {
          this._fetchRatedMovies(page)
        }
      }
    )
  }

  onTabChange = (key) => {
    this.setState({ activeTab: key })
    if (key === 'rated') {
      this._fetchRatedMovies(this.state.ratedCurrentPage)
    }
  }

  componentDidMount() {
    const storedSession = localStorage.getItem('guestSession')
    let sessionId = null

    if (storedSession) {
      const { guestSessionId: guestSession, expiresAt } = JSON.parse(storedSession)
      const currentTime = new Date().getTime()
      if (new Date(expiresAt).getTime() > currentTime) {
        sessionId = guestSession
        this.setState({ guestSessionId: sessionId }, () => {
          this._fetchRatedMovies()
        })
      }
    }

    if (!sessionId) {
      fetchGuestSession()
        .then(({ guestSessionId, expiresAt }) => {
          localStorage.setItem('guestSession', JSON.stringify({ guestSessionId, expiresAt }))
          this.setState({ guestSessionId }, () => {
            this._fetchRatedMovies()
          })
        })
        .catch(() => {
          this.setState({ error: 'Failed to create guest session' })
        })
    }

    fetchGenres()
      .then((genres) => {
        this.setState({ genres })
      })
      .catch(() => {
        this.setState({ error: 'Failed to fetch genres' })
      })

    const savedQuery = this._loadSearchQuery()
    this.setState({ searchQuery: savedQuery }, () => {
      this._fetchMovies(savedQuery)
    })
    // this._fetchMovies()
  }

  render() {
    const {
      visibleMovies = [],
      ratedMovies = [],
      visibleRatedMovies = [],
      loading,
      error,
      searchQuery,
      currentPage,
      ratedCurrentPage,
      totalResults,
      ratedTotalResults,
      activeTab,
      genres,
    } = this.state

    return (
      <GenreProvider value={genres}>
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
            <Tabs
              activeKey={activeTab}
              onChange={this.onTabChange}
              items={[
                {
                  key: 'search',
                  label: 'Search',
                  children: (
                    <>
                      <Input
                        className="input-class"
                        placeholder="Type to search..."
                        value={searchQuery}
                        onChange={this.handleInputSearch}
                        disabled={loading}
                      />
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
                          <MovieList
                            movies={visibleMovies}
                            ratedMovies={ratedMovies}
                            loading={loading}
                            guestSessionId={this.state.guestSessionId}
                          />
                          <Pagination
                            current={currentPage}
                            total={totalResults}
                            pageSize={MOVIES_PER_PAGE}
                            onChange={this.onPageChange}
                            style={{ margin: '20px auto', textAlign: 'center' }}
                            disabled={loading}
                            showSizeChanger={false}
                          />
                        </>
                      )}
                    </>
                  ),
                },
                {
                  key: 'rated',
                  label: 'Rated',
                  children: (
                    <>
                      {loading && ratedMovies.length === 0 ? (
                        <div className="loading-container-common">
                          <Spin fullscreen />
                        </div>
                      ) : error ? (
                        <Alert message={error} />
                      ) : ratedMovies.length === 0 ? (
                        <Alert message="No rated movies found" />
                      ) : (
                        <>
                          <MovieList
                            movies={visibleRatedMovies}
                            loading={loading}
                            guestSessionId={this.state.guestSessionId}
                          />
                          <Pagination
                            current={ratedCurrentPage}
                            total={ratedTotalResults}
                            pageSize={MOVIES_PER_PAGE}
                            onChange={this.onPageChange}
                            style={{ margin: '20px auto', textAlign: 'center' }}
                            disabled={loading}
                            showSizeChanger={false}
                          />
                        </>
                      )}
                    </>
                  ),
                },
              ]}
            />
          </Online>
        </div>
      </GenreProvider>
    )
  }
}
