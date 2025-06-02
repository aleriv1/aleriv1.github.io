import { useEffect, useContext } from 'react'
import { useHistory } from 'react-router-dom'

import { AuthContext } from '../../App'
import { useCreateArticleMutation } from '../../store/api'
import ArticleForm from '../ArticleForm/ArticleForm'
function CreateArticle() {
  const { user } = useContext(AuthContext)
  const history = useHistory()
  const [createArticle, { isLoading: isSubmitting }] = useCreateArticleMutation()
  useEffect(() => {
    if (!user) {
      history.push('/sign-in')
    }
  }, [user, history])
  const onSubmit = async (data) => {
    try {
      const result = await createArticle({
        title: data.title,
        description: data.shortDescription,
        body: data.text,
        tagList: data.tags || [],
      }).unwrap()
      history.push(`/articles/${result.article.slug}`)
    } catch (error) {
      console.error(error)
    }
  }
  return <ArticleForm onSubmit={onSubmit} isSubmitting={isSubmitting} />
}
export default CreateArticle
