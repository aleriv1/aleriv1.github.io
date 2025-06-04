import { useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'

import { AuthContext } from '../../App'
import { useCreateArticleMutation } from '../../store/api'
import ArticleForm from '../ArticleForm/ArticleForm'

function CreateArticle() {
  const { user } = useContext(AuthContext)
  const navigate = useNavigate()
  const [createArticle, { isLoading: isSubmitting }] = useCreateArticleMutation()

  useEffect(() => {
    if (!user) {
      navigate('/sign-in')
    }
  }, [user, navigate])

  const onSubmit = async (data) => {
    try {
      const result = await createArticle({
        title: data.title,
        description: data.shortDescription,
        body: data.text,
        tagList: data.tags || [],
      }).unwrap()
      navigate(`/articles/${result.article.slug}`)
    } catch (error) {
      console.error(error)
    }
  }
  return <ArticleForm onSubmit={onSubmit} isSubmitting={isSubmitting} />
}

export default CreateArticle
