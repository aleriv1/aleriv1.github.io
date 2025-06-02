import { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

import { AuthContext } from '../../App'
import { useRegisterMutation } from '../../store/api'

import styles from './SignUp.module.scss'

function SignUp() {
  const { setUser } = useContext(AuthContext)
  const navigate = useNavigate()
  const [registerUser, { isLoading: isSubmitting }] = useRegisterMutation()

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setError,
  } = useForm()

  const password = watch('password')
  const onSubmit = async (data) => {
    try {
      const result = await registerUser({
        username: data.username,
        email: data.email,
        password: data.password,
      }).unwrap()
      localStorage.setItem('token', result.user.token)
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
          message: 'Ошибка регистрации',
        })
      }
    }
  }
  return (
    <div className={styles.signUp}>
      <h2 className={styles.title}>Create new account</h2>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
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
          Password
          <input
            type="password"
            placeholder="Password"
            {...register('password', {
              required: 'Password is required',
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
          Repeat Password
          <input
            type="password"
            placeholder="Password"
            {...register('repeatPassword', {
              required: 'Please confirm your password',
              validate: (value) => value === password || 'Passwords must match',
            })}
            className={errors.repeatPassword ? styles.inputError : styles.input}
          />
          {errors.repeatPassword && <span className={styles.error}>{errors.repeatPassword.message}</span>}
        </label>
        <label className={styles.checkboxLabel}>
          <input
            type="checkbox"
            {...register('agree', {
              required: 'You must agree to the processing of your personal information',
            })}
          />
          I agree to the processing of my personal information
          {errors.agree && <span className={styles.error}>{errors.agree.message}</span>}
        </label>
        {errors.general && <div className={styles.serverError}>{errors.general.message}</div>}
        <button type="submit" className={styles.submitButton} disabled={isSubmitting}>
          Create
        </button>
        <p className={styles.signInLink}>
          Already have an account? <Link to="/sign-in">Sign In.</Link>
        </p>
      </form>
    </div>
  )
}

export default SignUp
