import { useContext } from 'react'
import { format } from 'date-fns'
import { Row, Col, Card, Tooltip, Tag, Spin, Rate } from 'antd'

import './movie-list.scss'
import cutText from '../cut-text/cut-text'
import { GenreContext } from '../genre-context/genre-context'
import { rateMovie } from '../api-service/api-service'

export default function MovieList({ movies, loading, guestSessionId }) {
  const genres = useContext(GenreContext)

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

    try {
      await rateMovie(guestSessionId, movieId, value)
    } catch (error) {
      console.log('Ошибка оценки фильма', error)
    }
  }

  return (
    <Row className="row">
      {movies.map((movie) => (
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
                title={
                  movie.title.length > 20 ? (
                    <Tooltip title={movie.title}>
                      <span>{cutText(movie.title || 'there is no title', 20)}</span>
                    </Tooltip>
                  ) : (
                    <span>{movie.title || 'there is no title'}</span>
                  )
                }
                description={
                  <div>
                    <div
                      className="rating-circle"
                      style={{ border: `3px solid ${getRatingColor(movie.vote_average)}` }}
                    >
                      {movie.vote_average.toFixed(1)}
                    </div>
                    <p className="date">
                      {movie.release_date ? format(new Date(movie.release_date), 'MMMM d, yyyy') : 'no date'}
                    </p>
                    {getGenreNames(movie.genre_ids).map((genre) => (
                      <Tag key={genre}>{genre}</Tag>
                    ))}
                    <p className="description">{cutText(movie.overview || 'There is no description', 100)}</p>
                    <Rate allowHalf value={movie.rating || 0} onChange={(value) => handleRate(movie.id, value)} />
                  </div>
                }
              />
            </Spin>
          </Card>
        </Col>
      ))}
    </Row>
  )
}
