import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'

// import mockAva from '../../assets/mockAva.png'
import { mockArticles } from '../../mockData'

import styles from './ArticleDetail.module.scss'

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
    <div className={styles.articleDetail}>
      <h1>{article.title}</h1>
      <div className={styles.header}>
        <div className={styles.header__left}>
          <span className={styles.tags}>
            {/* {article.tags.map((tag) => ( */}
            {article.tagList.map((tag) => (
              <span className={styles.tag} key={tag}>
                {tag}
              </span>
            ))}
          </span>
          <span className={styles.articleDescription}>{article.description}</span>
        </div>
        <div className={styles.articleAuthor}>
          <div>
            <span>{article.author.username}</span>
            <span>{new Date(article.createdAt).toLocaleDateString()}</span>
          </div>
          <img src={article.author.image} alt={article.author.username} />
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
