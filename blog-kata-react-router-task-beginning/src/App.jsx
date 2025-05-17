import React from 'react'
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'

import ArticleList from './components/ArticleList/ArticleList'
import ArticleDetail from './components/Article/Article'
import styles from './App.module.scss'

function App() {
  return (
    <Router>
      <div className={styles.app}>
        <header className={styles.header}>
          <Link to="/" className={styles.logoLink}>
            <div className={styles.logo}>Realworld Blog</div>
          </Link>
          <div className={styles.authButtons}>
            <button className={styles.signIn}>Sign In</button>
            <button className={styles.signUp}>Sign Up</button>
          </div>
        </header>
        <Switch>
          <Route exact path="/" component={ArticleList} />
          <Route exact path="/articles" component={ArticleList} />
          <Route path="/articles/:slug" component={ArticleDetail} />
        </Switch>
      </div>
    </Router>
  )
}

export default App
