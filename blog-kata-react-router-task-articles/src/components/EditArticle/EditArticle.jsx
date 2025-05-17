import { useState, useContext, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'

import { AuthContext } from '../../App'
import ArticleForm from '../ArticleForm/ArticleForm'

function EditArticle() {
  const { slug } = useParams()
  const { user } = useContext(AuthContext)
  const history = useHistory()

  useEffect(() => {
    if (!user) {
      history.push('/sign-in')
    }
  }, [user, history])

  const [defaultValues, setDefaultValues] = useState(null)

  useEffect(() => {
    const fetchArticle = async () => {
      const response = await fetch(`https://blog-platform.kata.academy/api/articles/${slug}`, {
        headers: {
          Authorization: `Token ${localStorage.getItem('token')}`,
        },
      })
      const data = await response.json()
      if (response.ok) {
        setDefaultValues({
          title: data.article.title,
          shortDescription: data.article.description,
          text: data.article.body,
          tags: data.article.tagList.join(','),
        })
      }
    }
    fetchArticle()
  }, [slug])

  const onSubmit = async (data) => {
    const response = await fetch(`https://blog-platform.kata.academy/api/articles/${slug}`, {
      method: 'PUT',
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
    if (response.ok) {
      history.push(`/articles/${slug}`)
    }
  }

  return defaultValues ? <ArticleForm onSubmit={onSubmit} defaultValues={defaultValues} /> : <div>Loading...</div>
}

export default EditArticle
