import { Link, useLocation, useHistory } from 'react-router-dom'
import { format } from 'date-fns'

import { useGetArticlesQuery, useToggleFavoriteMutation } from '../../store/api'

import styles from './ArticleList.module.scss'
function ArticleList() {
  const limit = 4
  const location = useLocation()
  const history = useHistory()
  const query = new URLSearchParams(location.search)
  const page = parseInt(query.get('page') || '1', 10)
  const { data, isLoading: loading, error } = useGetArticlesQuery({ page, limit })
  const [toggleFavorite, { isLoading: isLiking }] = useToggleFavoriteMutation()
  const handleFavorite = async (slug, favorited) => {
    try {
      await toggleFavorite({ slug, favorited }).unwrap()
    } catch (err) {
      console.error(err)
    }
  }
  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= (data?.articlesCount ? Math.ceil(data.articlesCount / limit) : 1)) {
      history.push(`/articles?page=${newPage}`)
    }
  }
  const renderPageButtons = () => {
    const pages = []
    const maxButtons = 5
    const totalPages = data?.articlesCount ? Math.ceil(data.articlesCount / limit) : 1
    let startPage = Math.max(1, page - 2)
    let endPage = Math.min(totalPages, startPage + maxButtons - 1)

    if (endPage - startPage + 1 < maxButtons) {
      startPage = Math.max(1, endPage - maxButtons + 1)
    }

    if (startPage > 1) {
      pages.push(
        <button
          key={1}
          onClick={() => handlePageChange(1)}
          className={page === 1 ? styles.activeButton : styles.notActiveButton}
          disabled={page === 1 || loading}
        >
          1
        </button>
      )
      if (startPage > 2) pages.push(<span key="start-ellipsis">...</span>)
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={page === i ? styles.activeButton : styles.notActiveButton}
          disabled={page === i || loading}
        >
          {i}
        </button>
      )
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) pages.push(<span key="end-ellipsis">...</span>)
      pages.push(
        <button
          key={totalPages}
          onClick={() => handlePageChange(totalPages)}
          className={page === totalPages ? styles.activeButton : styles.notActiveButton}
          disabled={page === totalPages || loading}
        >
          {totalPages}
        </button>
      )
    }

    return pages
  }
  return (
    <div className={styles.articleList}>
      {loading && <div className={styles.loading}>Загрузка...</div>}
      {error && <div className={styles.error}>Ошибка загрузки</div>}

      {data?.articles?.map((article) => (
        <div key={article.slug} className={styles.article}>
          <div className={styles.articleHeader}>
            <div className={styles.articleTitleGroup}>
              <div className={styles.articleTitleAndLikes}>
                <Link className={styles.articleTitleLink} to={`/articles/${article.slug}`}>
                  <h2 className={styles.articleTitle}>{article.title}</h2>
                </Link>
                <button
                  onClick={() => handleFavorite(article.slug, article.favorited)}
                  className={`${styles.likes} ${article.favorited ? styles.favorited : styles.unfavorited}`}
                  disabled={!localStorage.getItem('token') || isLiking}
                >
                  {article.favoritesCount}
                </button>
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
        <button
          onClick={() => handlePageChange(page - 1)}
          className={styles.arroButton}
          disabled={page === 1 || loading}
        >
          {'<'}
        </button>
        {renderPageButtons()}
        <button
          onClick={() => handlePageChange(page + 1)}
          className={styles.arroButton}
          disabled={page === (data?.articlesCount ? Math.ceil(data.articlesCount / limit) : 1) || loading}
        >
          {'>'}
        </button>
      </div>
    </div>
  )
}
export default ArticleList
