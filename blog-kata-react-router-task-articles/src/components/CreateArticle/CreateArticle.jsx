import { useEffect, useContext } from 'react'
import { useHistory } from 'react-router-dom'

import { AuthContext } from '../../App'
import ArticleForm from '../ArticleForm/ArticleForm'

function CreateArticle() {
  const { user } = useContext(AuthContext)
  const history = useHistory()

  useEffect(() => {
    if (!user) {
      history.push('/sign-in')
    }
  }, [user, history])

  const onSubmit = async (data) => {
    const response = await fetch('https://blog-platform.kata.academy/api/articles', {
      method: 'POST',
      headers: {
        Authorization: `Token ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        article: {
          title: data.title,
          description: data.shortDescription,
          body: data.text,
          tagList: data.tags ? data.tags.split(',').map((tag) => tag.trim()) : [],
        },
      }),
    })
    const result = await response.json()
    if (response.ok) {
      history.push(`/articles/${result.article.slug}`)
    }
  }

  return <ArticleForm onSubmit={onSubmit} />
}

export default CreateArticle
