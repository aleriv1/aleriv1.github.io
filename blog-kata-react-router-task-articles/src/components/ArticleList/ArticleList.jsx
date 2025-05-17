import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { format } from 'date-fns'

// import mockAva from '../../assets/mockAva.png'
import { mockArticles } from '../../mockData'

import styles from './ArticleList.module.scss'

const API_URL = 'https://blog-platform.kata.academy/api'

function ArticleList() {
  const [articles, setArticles] = useState([])
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [useMock] = useState(false)
  const limit = 4

  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true)
      setError(null)
      try {
        let data
        if (useMock) {
          const start = (page - 1) * 3
          const end = start + 3
          data = mockArticles.slice(start, end)
        } else {
          const offset = (page - 1) * limit
          const response = await fetch(`${API_URL}/articles?limit=${limit}&offset=${offset}`)
          if (!response.ok) throw new Error('Ошибка загрузки ArticleList')
          data = await response.json()
        }
        setArticles(data.articles || data)
        setTotalPages(Math.ceil(data.articlesCount / limit))
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchArticles()
  }, [page, useMock])

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setPage(newPage)
    }
  }

  const renderPageButtons = () => {
    const pages = []
    for (let i = 1; i <= totalPages; i++) {
      {
        pages.push(
          <button
            key={i}
            onClick={() => handlePageChange(i)}
            className={page === i ? styles.activeButton : styles.notActiveButton}
          >
            {i}
          </button>
        )
      }
    }
    return pages
  }

  return (
    <div className={styles.articleList}>
      {loading && <div className={styles.loading}>Загрузка...</div>}
      {error && <div className={styles.error}>{error}</div>}

      {articles.map((article) => (
        <div key={article.slug} className={styles.article}>
          <div className={styles.articleHeader}>
            <div className={styles.articleHeader__title}>
              <div className={styles.articleTitleGroup}>
                <Link className={styles.articleTitleLink} to={`/articles/${article.slug}`}>
                  <h2 className={styles.articleTitle}>{article.title}</h2>
                </Link>
                <span className={styles.likes}>❤️ {article.favoritesCount}</span>
              </div>
              <span className={styles.tags}>
                {article.tagList.map((tag) => (
                  <span className={styles.tag} key={tag}>
                    {tag}
                  </span>
                ))}
              </span>
            </div>
            <div className={styles.articleAuthorAndDate}>
              <div className={styles.userNameAndCreationDate}>
                <span className={styles.userName}>{article.author.username}</span>
                <span className={styles.creationDate}>{format(new Date(article.createdAt), 'MMMM d, yyyy')}</span>
              </div>
              <img className={styles.userImage} src={article.author.image} alt={article.author.username} />
            </div>
          </div>

          <span className={styles.articleDescription}>{article.description}</span>
        </div>
      ))}

      <div className={styles.pagination}>
        <button onClick={() => handlePageChange(page - 1)} className={styles.arroButton} disabled={page === 1}>
          {'<'}
        </button>
        {renderPageButtons()}
        <button onClick={() => handlePageChange(page + 1)} className={styles.arroButton} disabled={page === totalPages}>
          {'>'}
        </button>
      </div>
    </div>
  )
}

export default ArticleList
