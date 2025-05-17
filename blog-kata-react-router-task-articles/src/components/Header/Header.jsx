import { useContext } from 'react'
import { Link } from 'react-router-dom'

import { AuthContext } from '../../App'
import mockAva from '../../assets/mockAva.png'

import styles from './Header.module.scss'

function Header({ onLogout }) {
  const { user } = useContext(AuthContext)

  return (
    <header className={styles.header}>
      <Link to="/" className={styles.logoLink}>
        <div className={styles.logo}>Realworld Blog</div>
      </Link>
      <div className={styles.authButtons}>
        {user ? (
          <>
            <Link to="/new-article">
              <button className={styles.createArticle}>Create article</button>
            </Link>
            <Link to="/profile" className={styles.profileLink}>
              <span className={styles.userName}>{user.username}</span>
              <img src={user.image || mockAva} alt={user.username} className={styles.userAvatar} />
            </Link>
            <button className={styles.logout} onClick={onLogout}>
              Log Out
            </button>
          </>
        ) : (
          <>
            <Link to="/sign-in">
              <button className={styles.signIn}>Sign In</button>
            </Link>
            <Link to="/sign-up">
              <button className={styles.signUp}>Sign Up</button>
            </Link>
          </>
        )}
      </div>
    </header>
  )
}

export default Header
