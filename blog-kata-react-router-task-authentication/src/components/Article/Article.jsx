import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import { format } from 'date-fns'

// import mockAva from '../../assets/mockAva.png'

import { mockArticles } from '../../mockData'

import styles from './Article.module.scss'

const API_URL = 'https://blog-platform.kata.academy/api'

function ArticleDetail() {
  const { slug } = useParams()
  const [article, setArticle] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  // const [useMock] = useState(true)
  const [useMock] = useState(false)

  useEffect(() => {
    const fetchArticle = async () => {
      setLoading(true)
      setError(null)
      try {
        let data
        if (useMock) {
          data = mockArticles.find((a) => a.slug === slug)
        } else {
          const response = await fetch(`${API_URL}/articles/${slug}`)
          if (!response.ok) throw new Error('Ошибка загрузки')
          data = await response.json()
        }
        setArticle(data.article || data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchArticle()
  }, [slug, useMock])

  if (loading) return <div className={styles.loading}>Загрузка...</div>
  if (error) return <div className={styles.error}>{error}</div>
  if (!article) return null

  return (
    <div className={styles.article}>
      <div className={styles.articleHeader}>
        <div className={styles.articleHeader__mainGroup}>
          <h2 className={styles.articleTitle}>
            {article.title}
            <span className={styles.likes}>❤️ {article.favoritesCount}</span>
          </h2>
          <span className={styles.tags}>
            {article.tagList.map((tag) => (
              <span className={styles.tag} key={tag}>
                {tag}
              </span>
            ))}
          </span>
          <span className={styles.articleDescription}>{article.description}</span>
        </div>
        <div className={styles.articleAuthorAndDate}>
          <div className={styles.userNameAndCreationDate}>
            <span className={styles.userName}>{article.author.username}</span>
            <span className={styles.creationDate}>{format(new Date(article.createdAt), 'MMMM d, yyyy')}</span>
          </div>
          <img className={styles.userImage} src={article.author.image} alt={article.author.username} />

          {/* <img src={mockAva} alt={article.author.username} /> */}
        </div>
      </div>
      <ReactMarkdown
        components={{
          img: (props) => <img className={styles.articleImage} {...props} />,
        }}
      >
        {article.body}
      </ReactMarkdown>
    </div>
  )
}

export default ArticleDetail
