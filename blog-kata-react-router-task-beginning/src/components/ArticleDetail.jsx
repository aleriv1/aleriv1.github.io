import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'

import mockAva from '../assets/mockAva.png'

import styles from './ArticleDetail.module.scss'
import { mockArticles } from './mockData'

const API_URL = 'https://blog-platform.kata.academy/api'

function ArticleDetail() {
  const { slug } = useParams()
  const [article, setArticle] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [useMock] = useState(true)

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
    <div className={styles.articleDetail}>
      <h1>{article.title}</h1>
      <span>
        {article.tags.map((tag) => (
          <span key={tag}>{tag}</span>
        ))}
      </span>
      <span className={styles.articleDescription}>{article.description}</span>
      <div className={styles.articleAuthor}>
        <div>
          <span>{article.author.username}</span>
          <span>{new Date(article.createdAt).toLocaleDateString()}</span>
        </div>
        {/* <img src={article.author.image} alt={article.author.username} /> */}
        <img src={mockAva} alt={article.author.username} />
      </div>
      <ReactMarkdown>{article.body}</ReactMarkdown>
      <Link to="/articles">Назад к списку</Link>
    </div>
  )
}

export default ArticleDetail
