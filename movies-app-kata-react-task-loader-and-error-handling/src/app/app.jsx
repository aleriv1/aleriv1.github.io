import { Component } from 'react'
// import { Offline, Online } from 'react-detect-offline'
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
      isOffline: false,
    }
    this.fetchMovies()
    this.checkNetworkPeriodically()
  }

  async checkNetworkStatus() {
    try {
      const controller = new AbortController()
      const timeout = setTimeout(() => controller.abort(), 5000)
      const response = await fetch('https://www.google.com/favicon.ico', {
        method: 'HEAD',
        signal: controller.signal,
        cache: 'no-store',
      })
      clearTimeout(timeout)
      if (response.ok) {
        this.setState({ isOffline: false })
        return true
      }
      throw new Error('Invalid response')
    } catch (err) {
      this.setState({ isOffline: true })
      return false
    }
  }

  checkNetworkPeriodically() {
    setInterval(() => {
      this.checkNetworkStatus()
    }, 5000)
  }

  fetchMovies() {
    this.setState({ loading: true, error: null })
    this.checkNetworkStatus().then((isOnline) => {
      if (!isOnline) {
        this.setState({
          loading: false,
          error: '!There is no internet connection',
        })
        return
      }
      fetchMoviesByQuery('return')
        .then((movies) => {
          const limitedMovies = movies.slice(0, 6)
          setTimeout(() => {
            this.setState({ movies: limitedMovies, loading: false })
          }, 1000)
        })
        .catch((err) => {
          console.log('err is', err)
          this.setState({ loading: false, error: 'Something went wrong' })
        })
    })
  }

  render() {
    return (
      <div style={{ height: '100%' }}>
        {this.state.isOffline ? (
          <Alert
            className="alert-cutom"
            message="You are offline"
            type="warning"
            description="Make sure you have an active internet connection"
            banner={true}
          />
        ) : this.state.error ? (
          <Alert message={this.state.error} />
        ) : (
          <MovieList movies={this.state.movies} loading={this.state.loading} />
        )}
      </div>
    )
  }
}
