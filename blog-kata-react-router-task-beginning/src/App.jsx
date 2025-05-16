import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import ArticleList from './components/ArticleList'
import ArticleDetail from './components/ArticleDetail'
import './App.scss'

function App() {
  return (
    <Router>
      <div className="app">
        <header className="header">
          <div className="logo">Realworld Blog</div>
          <div className="auth-buttons">
            <button>Sign In</button>
            <button>Sign Up</button>
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
