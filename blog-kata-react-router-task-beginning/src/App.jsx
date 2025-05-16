import { BrowserRouter as Router, Route } from 'react-router-dom/cjs/react-router-dom.min'

import Test from './test'

export default function App() {
  return (
    <Router>
      <div className="App">
        {/* <h1>Hello</h1> */}
        {/* <Route path="/" element={<h1>Home</h1>} /> */}
        <Route path="/" exact render={() => <h1>Home</h1>} />
        <Route path="/test/" component={Test} />
      </div>
    </Router>
  )
}
