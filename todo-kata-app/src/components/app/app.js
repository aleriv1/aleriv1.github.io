import './app.css'

import AppHeader from "../header"
import MainSection from '../main'

const App = () => {
  return (
    <section className="todoapp">
      <AppHeader />
      <MainSection />
    </section>
  )
}

export default App