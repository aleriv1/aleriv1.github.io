import { useState, useContext, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

import { AuthContext } from '../../App'
import { useGetArticleQuery, useUpdateArticleMutation } from '../../store/api'
import ArticleForm from '../ArticleForm/ArticleForm'

function EditArticle() {
  const { slug } = useParams()
  const { user } = useContext(AuthContext)
  const navigate = useNavigate()
  const [defaultValues, setDefaultValues] = useState(null)
  const { data: article, isLoading } = useGetArticleQuery(slug)
  const [updateArticle, { isLoading: isSubmitting }] = useUpdateArticleMutation()

  useEffect(() => {
    if (!user) {
      navigate('/sign-in', { replace: true })
    } else if (article && user.username !== article.article.author.username) {
      navigate(`/articles/${slug}`, { replace: true })
    }
  }, [user, article, navigate, slug])

  useEffect(() => {
    if (article) {
      setDefaultValues({
        title: article.article.title,
        shortDescription: article.article.description,
        text: article.article.body,
        tags: article.article.tagList,
      })
    }
  }, [article])

  const onSubmit = async (data) => {
    try {
      await updateArticle({
        slug,
        article: {
          title: data.title,
          description: data.shortDescription,
          body: data.text,
          tagList: data.tags || [],
        },
      }).unwrap()
      navigate(`/articles/${slug}`)
    } catch (error) {
      console.error(error)
    }
  }

  return isLoading ? (
    <div>Loading...</div>
  ) : defaultValues ? (
    <ArticleForm onSubmit={onSubmit} defaultValues={defaultValues} isSubmitting={isSubmitting} />
  ) : null
}

export default EditArticle
