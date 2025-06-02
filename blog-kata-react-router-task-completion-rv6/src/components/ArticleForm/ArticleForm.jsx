import { useState } from 'react'
import { useForm } from 'react-hook-form'

import styles from './ArticleForm.module.scss'

function ArticleForm({ onSubmit, defaultValues, isSubmitting }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: defaultValues || {},
  })

  const [tags, setTags] = useState(defaultValues?.tags?.filter((tag) => tag) || [])
  const [newTag, setNewTag] = useState('')

  const handleAddTag = () => {
    if (newTag.trim()) {
      setTags([...tags, newTag.trim()])
      setNewTag('')
    }
  }

  const clearFieldTag = () => {
    setNewTag('')
  }

  const handleDeleteTag = (tagToDelete) => {
    setTags(tags.filter((tag) => tag !== tagToDelete))
  }

  const onFormSubmit = (data) => {
    onSubmit({
      ...data,
      tags: tags,
    })
  }

  return (
    <div className={styles.articleForm}>
      <h2 className={styles.formHeader}>{defaultValues ? 'Edit article' : 'Create new article'}</h2>
      <form className={styles.form} onSubmit={handleSubmit(onFormSubmit)}>
        <div className={styles.inputGroup}>
          <label className={styles.inputGroupTitle}>Title</label>
          <input {...register('title', { required: 'Title is required' })} />
          {errors.title && <span className={styles.error}>{errors.title.message}</span>}
        </div>
        <div>
          <label className={styles.inputGroupDescription}>Short description</label>
          <input
            {...register('shortDescription', {
              required: 'Short description is required',
            })}
          />
          {errors.shortDescription && <span className={styles.error}>{errors.shortDescription.message}</span>}
        </div>
        <div>
          <label className={styles.inputGroupText}>Text</label>
          <textarea {...register('text', { required: 'Text is required' })} />
          {errors.text && <span className={styles.error}>{errors.text.message}</span>}
        </div>
        <div className={styles.tagsSection}>
          <label className={styles.tags}>Tags</label>
          <div className={styles.tagList}>
            {tags.map((tag, index) => (
              <div key={index} className={styles.tagItem}>
                <span className={styles.tag}>{tag}</span>
                <button type="button" className={styles.deleteTag} onClick={() => handleDeleteTag(tag)}>
                  Delete
                </button>
              </div>
            ))}
          </div>
          <div className={styles.tagInput}>
            <input value={newTag} onChange={(e) => setNewTag(e.target.value)} placeholder="Tag" />
            <button type="button" className={styles.deleteTag} onClick={clearFieldTag}>
              Delete
            </button>
            <button type="button" className={styles.addTag} onClick={handleAddTag}>
              Add tag
            </button>
          </div>
        </div>
        <button type="submit" className={styles.submitButton} disabled={isSubmitting}>
          Send
        </button>
      </form>
    </div>
  )
}

export default ArticleForm
