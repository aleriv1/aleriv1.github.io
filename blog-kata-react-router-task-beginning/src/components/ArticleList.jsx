import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'

import mockAva from '../assets/mockAva.png'

import styles from './ArticleList.module.scss'
import { mockArticles } from './mockData'

const API_URL = 'https://blog-platform.kata.academy/api'

function ArticleList() {
  const [articles, setArticles] = useState([])
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [useMock] = useState(true)

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
          const response = await fetch(`${API_URL}/articles?limit=10&page=${page}`)
          if (!response.ok) throw new Error('Ошибка загрузки')
          data = await response.json()
        }
        setArticles(data.articles || data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchArticles()
  }, [page, useMock])

  const handlePageChange = (newPage) => {
    setPage(newPage)
  }

  return (
    <div className={styles.articleList}>
      {loading && <div className={styles.loading}>Загрузка...</div>}
      {error && <div className={styles.error}>{error}</div>}
      {articles.map((article) => (
        <div key={article.slug} className={styles.articleItem}>
          <div className={styles.articleTop}>
            <Link to={`/articles/${article.slug}`}>
              <h2>
                {article.title} <span>❤️ {article.favoritesCount}</span>
              </h2>
            </Link>
            <div className={styles.articleMeta}>
              <span>
                {article.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </span>
              {/* <ReactMarkdown>{article.description}</ReactMarkdown> */}
              <ReactMarkdown>{article.body}</ReactMarkdown>
            </div>
          </div>
          <div className={styles.articleAuthor}>
            <div>
              <span>{article.author.username}</span>
              <span>{new Date(article.createdAt).toLocaleDateString()}</span>
            </div>
            {/* <img src={article.author.image} alt={article.author.username} /> */}
            <img src={mockAva} alt={article.author.username} />
          </div>
        </div>
      ))}
      <div className={styles.pagination}>
        <button onClick={() => handlePageChange(page - 1)} disabled={page === 1}>
          ←
        </button>
        <span>{page}</span>
        <button onClick={() => handlePageChange(page + 1)}>→</button>
      </div>
    </div>
  )
}

export default ArticleList
