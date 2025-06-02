import { useState, useContext, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'

import { AuthContext } from '../../App'
import { useGetArticleQuery, useUpdateArticleMutation } from '../../store/api'
import ArticleForm from '../ArticleForm/ArticleForm'
function EditArticle() {
  const { slug } = useParams()
  const { user } = useContext(AuthContext)
  const history = useHistory()
  const [defaultValues, setDefaultValues] = useState(null)
  const { data: article } = useGetArticleQuery(slug)
  const [updateArticle, { isLoading: isSubmitting }] = useUpdateArticleMutation()
  useEffect(() => {
    if (!user) {
      history.push('/sign-in')
    }
  }, [user, history])
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
      history.push(`/articles/${slug}`)
    } catch (error) {
      console.error(error)
    }
  }
  return defaultValues ? (
    <ArticleForm onSubmit={onSubmit} defaultValues={defaultValues} isSubmitting={isSubmitting} />
  ) : (
    <div>Loading...</div>
  )
}
export default EditArticle
