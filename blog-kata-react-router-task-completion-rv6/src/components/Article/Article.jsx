import { useState, useContext } from 'react'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import { format } from 'date-fns'

import { AuthContext } from '../../App'
import { useGetArticleQuery, useToggleFavoriteMutation, useDeleteArticleMutation } from '../../store/api'

import styles from './Article.module.scss'

function ArticleDetail() {
  const { slug } = useParams()
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const navigate = useNavigate()
  const { user } = useContext(AuthContext)
  const { data: article, isLoading: loading, error } = useGetArticleQuery(slug)
  const [toggleFavorite, { isLoading: isLiking }] = useToggleFavoriteMutation()
  const [deleteArticle, { isLoading: isDeleting }] = useDeleteArticleMutation()
  const handleFavorite = async () => {
    try {
      await toggleFavorite({ slug, favorited: article.article.favorited }).unwrap()
    } catch (err) {
      console.error(err)
    }
  }

  const handleDelete = async () => {
    try {
      await deleteArticle(slug).unwrap()
      navigate('/articles')
    } catch (err) {
      console.error(err)
    }
  }

  if (loading) return <div className={styles.loading}>Загрузка...</div>
  if (error) return <div className={styles.error}>Ошибка загрузки</div>
  if (!article) return null

  return (
    <div className={styles.article}>
      <div className={styles.articleHeader}>
        <div className={styles.articleTitleGroup}>
          <div className={styles.articleTitleAndLikes}>
            <h2 className={styles.articleTitle}>{article.article.title}</h2>
            <button
              onClick={handleFavorite}
              className={`${styles.likes} ${article.article.favorited ? styles.favorited : styles.unfavorited}`}
              disabled={!localStorage.getItem('token') || isLiking}
            >
              {article.article.favoritesCount}
            </button>
          </div>
          <div className={styles.tagsAndActions}>
            <span className={styles.tags}>
              {article.article.tagList.map((tag) => (
                <span className={styles.tag} key={tag}>
                  {tag}
                </span>
              ))}
            </span>
          </div>
        </div>
        <div className={styles.articleAuthorAndDate}>
          <div className={styles.userNameAndCreationDate}>
            <span className={styles.userName}>{article.article.author.username}</span>
            <span className={styles.creationDate}>{format(new Date(article.article.createdAt), 'MMMM d, yyyy')}</span>
          </div>
          <img className={styles.userImage} src={article.article.author.image} alt={article.article.author.username} />
        </div>
      </div>
      <div className={styles.descriptionAndControl}>
        <span className={styles.articleDescription}>{article.article.description}</span>
        {user && user.username === article.article.author.username && (
          <div className={styles.articleActions}>
            <button onClick={() => setShowDeleteModal(true)} className={styles.deleteButton} disabled={isDeleting}>
              Delete
            </button>
            <button
              onClick={() => navigate(`/articles/${slug}/edit`)}
              className={styles.editButton}
              disabled={isDeleting}
            >
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
        {article.article.body}
      </ReactMarkdown>
      {showDeleteModal && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <p>Are you sure to delete this article?</p>
            <div className={styles.modalButtons}>
              <button onClick={() => setShowDeleteModal(false)} className={styles.noButton} disabled={isDeleting}>
                No
              </button>
              <button onClick={handleDelete} className={styles.yesButton} disabled={isDeleting}>
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
