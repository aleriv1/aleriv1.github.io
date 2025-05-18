import React, { useState, useContext } from 'react'
import { useForm } from 'react-hook-form'
import { useHistory, Link } from 'react-router-dom'

import { AuthContext } from '../../App'

import styles from './SignIn.module.scss'

const API_URL = 'https://blog-platform.kata.academy/api'

function SignIn() {
  const { setUser } = useContext(AuthContext)
  const history = useHistory()
  const [serverError, setServerError] = useState(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const onSubmit = async (data) => {
    try {
      const response = await fetch(`${API_URL}/users/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user: {
            email: data.email,
            password: data.password,
          },
        }),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.errors || 'Ошибка входа')
      }

      localStorage.setItem('token', result.user.token)
      localStorage.setItem('user', JSON.stringify(result.user))
      setUser(result.user)
      history.push('/')
    } catch (err) {
      setServerError(err.message)
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

        {serverError && (
          <div className={styles.serverError}>Такого пользователя не существует либо Вы ввели неправильный пароль</div>
        )}

        <button type="submit" className={styles.submitButton}>
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
