import { useContext, useState } from 'react'
import { format } from 'date-fns'
import { Row, Col, Card, Tooltip, Tag, Spin, Rate } from 'antd'

import './movie-list.scss'
import cutText from '../cut-text/cut-text'
import { GenreContext } from '../genre-context/genre-context'
import { rateMovie } from '../api-service/api-service'

export default function MovieList({ movies, ratedMovies, loading, guestSessionId }) {
  const genres = useContext(GenreContext)

  const [localRatings, setLocalRatings] = useState({})

  const getGenreNames = (genreIds) => {
    return genreIds
      .map((id) => {
        const genre = genres.find((g) => g.id === id)
        return genre ? genre.name : null
      })
      .filter((name) => name)
      .slice(0, 2)
  }

  const getRatingColor = (rating) => {
    return rating < 3 ? '#E90000' : rating < 5 ? '#E97E00' : rating < 7 ? '#E9D100' : '#66E900'
  }

  const handleRate = async (movieId, value) => {
    if (!guestSessionId) return

    setLocalRatings((prev) => ({ ...prev, [movieId]: value }))
    await rateMovie(guestSessionId, movieId, value)
  }

  return (
    <Row className="row">
      {movies.map((movie) => {
        const userRating = localRatings[movie.id] || ratedMovies?.find((rated) => rated.id === movie.id)?.rating || 0

        return (
          <Col key={movie.id}>
            <Card
              className="movie-card"
              hoverable
              cover={
                loading ? (
                  <div className="loading-container">
                    <Spin />
                  </div>
                ) : movie.poster_path ? (
                  <img alt={movie.title} src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} />
                ) : (
                  <div className="image-placeholder" />
                )
              }
            >
              <Spin spinning={loading}>
                <Card.Meta
                  description={
                    <div className="description-additional-wrapper">
                      <div className="top-card-info-wrapper">
                        {loading ? (
                          <div className="loading-container loading-container--mobile">
                            <Spin />
                          </div>
                        ) : movie.poster_path ? (
                          <img
                            className="poster-additional"
                            alt={movie.title}
                            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                          />
                        ) : (
                          <div className="image-placeholder-additional" />
                        )}
                        <div className="header-group-wrapper">
                          {movie.title.length > 20 ? (
                            <Tooltip title={movie.title}>
                              <h2 className="movie-title">{cutText(movie.title || 'there is no title', 20)}</h2>
                            </Tooltip>
                          ) : (
                            <h2 className="movie-title">{movie.title || 'there is no title'}</h2>
                          )}
                          <p className="date">
                            {movie.release_date ? format(new Date(movie.release_date), 'MMMM d, yyyy') : 'no date'}
                          </p>
                          <div className="genres">
                            {getGenreNames(movie.genre_ids).map((genre) => (
                              <Tag key={genre}>{genre}</Tag>
                            ))}
                          </div>
                        </div>
                        <div
                          className="rating-circle"
                          style={{ border: `3px solid ${getRatingColor(movie.vote_average)}` }}
                        >
                          {movie.vote_average.toFixed(1)}
                        </div>
                      </div>
                      <p className="description-text">{cutText(movie.overview || 'There is no description', 100)}</p>
                      <Rate
                        allowHalf
                        // value={movie.rating || 0}
                        value={userRating || movie.rating}
                        onChange={(value) => handleRate(movie.id, value)}
                        count={10}
                      />
                    </div>
                  }
                />
              </Spin>
            </Card>
          </Col>
        )
      })}
    </Row>
  )
}
