import { format } from 'date-fns'
import { Row, Col, Card, Tooltip, Tag } from 'antd'

import './movie-list.scss'
import cutText from '../cut-text/cut-text'

export default function MovieList({ movies }) {
  return (
    <Row className="row">
      {movies.map((movie) => (
        <Col key={movie.id}>
          <Card
            className="movie-card"
            hoverable
            cover={
              movie.poster_path ? (
                <img alt={movie.title} src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} />
              ) : (
                <div className="image-placeholder" />
              )
            }
          >
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
                  <p className="date">
                    {movie.release_date ? format(new Date(movie.release_date), 'MMMM d, yyyy') : 'no date'}
                  </p>
                  <Tag>Action</Tag>
                  <Tag>Drama</Tag>
                  <p className="description">{cutText(movie.overview || 'There is no description', 100)}</p>
                </div>
              }
            />
          </Card>
        </Col>
      ))}
    </Row>
  )
}
