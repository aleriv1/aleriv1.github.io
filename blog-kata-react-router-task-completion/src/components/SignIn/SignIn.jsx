import { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { useHistory, Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import { AuthContext } from '../../App'
import { useLoginMutation, api } from '../../store/api'

import styles from './SignIn.module.scss'
function SignIn() {
  const { setUser } = useContext(AuthContext)
  const history = useHistory()
  const disaptch = useDispatch()
  const [login, { isLoading: isSubmitting }] = useLoginMutation()
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm()
  const onSubmit = async (data) => {
    try {
      const result = await login({
        email: data.email,
        password: data.password,
      }).unwrap()
      localStorage.setItem('token', result.user.token)
      localStorage.setItem('user', JSON.stringify(result.user))
      setUser(result.user)
      disaptch(api.util.invalidateTags(['Articles', 'Article']))
      history.push('/')
    } catch (err) {
      if (err.data?.errors) {
        Object.keys(err.data.errors).forEach((field) => {
          if (field === 'email or password') {
            setError('general', { type: 'server', message: 'Неверный email или пароль' })
          } else {
            setError(setError('general', { type: 'server', message: 'Ошибка входа' }))
          }
        })
      } else {
        setError('general', {
          type: 'server',
          message: 'Неверный email или пароль',
        })
      }
    }
  }
  return (
    <div className={styles.signIn}>
      <h2 className={styles.title}>Sign In</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
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
          Password
          <input
            type="password"
            placeholder="Password"
            {...register('password', {
              required: 'Password is required',
            })}
            className={errors.password ? styles.inputError : styles.input}
          />
          {errors.password && <span className={styles.error}>{errors.password.message}</span>}
        </label>
        {errors.general && <div className={styles.serverError}>{errors.general.message}</div>}
        <button type="submit" className={styles.submitButton} disabled={isSubmitting}>
          Login
        </button>
        <p className={styles.signUpLink}>
          Don’t have an account? <Link to="/sign-up">Sign Up.</Link>
        </p>
      </form>
    </div>
  )
}

export default SignIn
