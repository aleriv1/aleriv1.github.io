import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Switch, useHistory } from 'react-router-dom'

import ArticleList from './components/ArticleList/ArticleList'
import ArticleDetail from './components/Article/Article'
import SignUp from './components/SignUp/SignUp'
import SignIn from './components/SignIn/SignIn'
import Profile from './components/Profile/Profile'
import Header from './components/Header/Header'
import styles from './App.module.scss'

export const AuthContext = React.createContext()

function App() {
  const [user, setUser] = useState(null)
  const history = useHistory()

  useEffect(() => {
    const token = localStorage.getItem('token')
    const savedUser = localStorage.getItem('user')
    if (token && savedUser) {
      setUser(JSON.parse(savedUser))
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setUser(null)
    history.push('/sign-in')
  }

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <Router>
        <div className={styles.app}>
          <Header onLogout={handleLogout} />
          <Switch>
            <Route exact path="/" component={ArticleList} />
            <Route exact path="/articles" component={ArticleList} />
            <Route path="/articles/:slug" component={ArticleDetail} />
            <Route path="/sign-up" component={SignUp} />
            <Route path="/sign-in" component={SignIn} />
            <Route path="/profile" component={Profile} />
          </Switch>
        </div>
      </Router>
    </AuthContext.Provider>
  )
}

export default App
