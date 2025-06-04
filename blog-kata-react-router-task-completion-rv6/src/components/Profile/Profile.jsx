import { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import { AuthContext } from '../../App'
import { useUpdateUserMutation } from '../../store/api'

import styles from './Profile.module.scss'

function Profile() {
  const { user, setUser } = useContext(AuthContext)
  const navigate = useNavigate()
  const [updateUser, { isLoading: isSubmitting }] = useUpdateUserMutation()
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({
    defaultValues: {
      username: user?.username || '',
      email: user?.email || '',
      password: '',
      image: user?.image || '',
    },
  })
  const onSubmit = async (data) => {
    try {
      const userData = {
        username: data.username,
        email: data.email,
        ...(data.password && { password: data.password }),
        ...(data.image && { image: data.image }),
      }
      const result = await updateUser(userData).unwrap()
      localStorage.setItem('user', JSON.stringify(result.user))
      setUser(result.user)
      navigate('/')
    } catch (err) {
      if (err.data?.errors) {
        Object.keys(err.data.errors).forEach((field) => {
          setError(field, {
            type: 'server',
            message: Array.isArray(err.data.errors[field]) ? err.data.errors[field].join(', ') : err.data.errors[field],
          })
        })
      } else {
        setError('general', {
          type: 'server',
          message: 'Ошибка обновления профиля',
        })
      }
    }
  }

  return (
    <div className={styles.profile}>
      <h2 className={styles.title}>Edit Profile</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label className={styles.label}>
          Username
          <input
            type="text"
            placeholder="Username"
            {...register('username', {
              required: 'Username is required',
              minLength: {
                value: 3,
                message: 'Username must be at least 3 characters',
              },
              maxLength: {
                value: 20,
                message: 'Username must not exceed 20 characters',
              },
            })}
            className={errors.username ? styles.inputError : styles.input}
          />
          {errors.username && <span className={styles.error}>{errors.username.message}</span>}
        </label>

        <label className={styles.label}>
          Email address
          <input
            type="email"
            placeholder="Email address"
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: 'Invalid email address',
              },
            })}
            className={errors.email ? styles.inputError : styles.input}
          />
          {errors.email && <span className={styles.error}>{errors.email.message}</span>}
        </label>

        <label className={styles.label}>
          New password
          <input
            type="password"
            placeholder="New password"
            {...register('password', {
              minLength: {
                value: 6,
                message: 'Password must be at least 6 characters',
              },
              maxLength: {
                value: 40,
                message: 'Password must not exceed 40 characters',
              },
            })}
            className={errors.password ? styles.inputError : styles.input}
          />
          {errors.password && <span className={styles.error}>{errors.password.message}</span>}
        </label>
        <label className={styles.label}>
          Avatar image (url)
          <input
            type="text"
            placeholder="Avatar image"
            {...register('image', {
              pattern: {
                value: /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/,
                message: 'Invalid URL',
              },
            })}
            className={errors.image ? styles.inputError : styles.input}
          />
          {errors.image && <span className={styles.error}>{errors.image.message}</span>}
        </label>
        {errors.general && <div className={styles.serverError}>{errors.general.message}</div>}
        <button type="submit" className={styles.submitButton} disabled={isSubmitting}>
          Save
        </button>
      </form>
    </div>
  )
}

export default Profile
