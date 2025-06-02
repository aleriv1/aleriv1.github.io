import { useState, useEffect, createContext } from 'react'
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import { api } from './store/api'
import ArticleList from './components/ArticleList/ArticleList'
import ArticleDetail from './components/Article/Article'
import SignUp from './components/SignUp/SignUp'
import SignIn from './components/SignIn/SignIn'
import Profile from './components/Profile/Profile'
import Header from './components/Header/Header'
import CreateArticle from './components/CreateArticle/CreateArticle'
import EditArticle from './components/EditArticle/EditArticle'
import styles from './App.module.scss'

export const AuthContext = createContext()

function App() {
  const [user, setUser] = useState(null)
  const disaptch = useDispatch()

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
    disaptch(api.util.invalidateTags(['Articles', 'Article']))
  }

  const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (user ? <Component {...props} /> : <Redirect to="/sign-in" />)} />
  )

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <Router>
        <div className={styles.app}>
          <Header onLogout={handleLogout} />
          <Switch>
            <Route exact path="/" component={ArticleList} />
            <Route exact path="/articles" component={ArticleList} />
            <PrivateRoute path="/articles/:slug/edit" component={EditArticle} />
            <Route path="/articles/:slug" component={ArticleDetail} />
            <Route path="/sign-up" component={SignUp} />
            <Route path="/sign-in" component={SignIn} />
            <Route path="/profile" component={Profile} />
            <PrivateRoute path="/new-article" component={CreateArticle} />
          </Switch>
        </div>
      </Router>
    </AuthContext.Provider>
  )
}

export default App
