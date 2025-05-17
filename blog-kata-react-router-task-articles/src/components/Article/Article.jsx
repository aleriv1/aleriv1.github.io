import React, { useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import { format } from 'date-fns'

import { AuthContext } from '../../App'

import styles from './Article.module.scss'

function ArticleDetail() {
  const { slug } = useParams()
  const [article, setArticle] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const history = useHistory()
  const { user } = React.useContext(AuthContext)

  React.useEffect(() => {
    const fetchArticle = async () => {
      setLoading(true)
      setError(null)
      try {
        const response = await fetch(`https://blog-platform.kata.academy/api/articles/${slug}`, {
          headers: {
            Authorization: `Token ${localStorage.getItem('token')}`,
          },
        })
        if (!response.ok) throw new Error('Ошибка загрузки')
        const data = await response.json()
        setArticle(data.article)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchArticle()
  }, [slug])

  const handleDelete = async () => {
    const response = await fetch(`https://blog-platform.kata.academy/api/articles/${slug}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Token ${localStorage.getItem('token')}`,
      },
    })
    if (response.ok) {
      history.push('/articles')
    }
    setShowDeleteModal(false)
  }

  if (loading) return <div className={styles.loading}>Загрузка...</div>
  if (error) return <div className={styles.error}>{error}</div>
  if (!article) return null

  return (
    <div className={styles.article}>
      <div className={styles.articleHeader}>
        <div className={styles.articleHeader__title}>
          <div className={styles.articleTitleGroup}>
            <h2 className={styles.articleTitle}>{article.title}</h2>
            <span className={styles.likes}>❤️ {article.favoritesCount}</span>
          </div>
          <div className={styles.tagsAndActions}>
            <span className={styles.tags}>
              {article.tagList.map((tag) => (
                <span className={styles.tag} key={tag}>
                  {tag}
                </span>
              ))}
            </span>
          </div>
        </div>
        <div className={styles.articleAuthorAndDate}>
          <div className={styles.userNameAndCreationDate}>
            <span className={styles.userName}>{article.author.username}</span>
            <span className={styles.creationDate}>{format(new Date(article.createdAt), 'MMMM d, yyyy')}</span>
          </div>
          <img className={styles.userImage} src={article.author.image} alt={article.author.username} />
        </div>
      </div>
      <div className={styles.descriptionAndControl}>
        <span className={styles.articleDescription}>{article.description}</span>
        {user && user.username === article.author.username && (
          <div className={styles.articleActions}>
            <button onClick={() => setShowDeleteModal(true)} className={styles.deleteButton}>
              Delete
            </button>
            <button onClick={() => history.push(`/articles/${slug}/edit`)} className={styles.editButton}>
              Edit
            </button>
          </div>
        )}
      </div>
      <ReactMarkdown
        components={{
          img: (props) => <img className={styles.articleImage} {...props} />,
        }}
      >
        {article.body}
      </ReactMarkdown>
      {showDeleteModal && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <p>Are you sure to delete this article?</p>
            <div className={styles.modalButtons}>
              <button onClick={() => setShowDeleteModal(false)} className={styles.noButton}>
                No
              </button>
              <button onClick={handleDelete} className={styles.yesButton}>
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ArticleDetail
