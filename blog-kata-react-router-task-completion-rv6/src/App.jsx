import { useState, useEffect, createContext } from 'react'
import { HashRouter as Router, Route, Routes } from 'react-router-dom'
import { Navigate } from 'react-router-dom'
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
  const dispatch = useDispatch()

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
    dispatch(api.util.invalidateTags(['Articles', 'Article']))
  }

  const PrivateRoute = ({ children }) => {
    return user ? children : <Navigate to="/sign-in" replace />
  }

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <Router>
        <div className={styles.app}>
          <Header onLogout={handleLogout} />
          <Routes>
            <Route path="/" element={<ArticleList />} />
            <Route path="/articles" element={<ArticleList />} />
            <Route
              path="/articles/:slug/edit"
              element={
                <PrivateRoute>
                  <EditArticle />
                </PrivateRoute>
              }
            />
            <Route path="/articles/:slug" element={<ArticleDetail />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/profile" element={<Profile />} />
            <Route
              path="/new-article"
              element={
                <PrivateRoute>
                  <CreateArticle />
                </PrivateRoute>
              }
            />
          </Routes>
        </div>
      </Router>
    </AuthContext.Provider>
  )
}

export default App
