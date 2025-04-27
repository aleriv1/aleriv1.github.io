import './app.scss'
import Header from '../header'
import Main from '../main-sec'
import { TaskProvider } from '../task-context'

const App = () => {
  return (
    <TaskProvider>
      <section className="todoapp">
        <Header />
        <Main />
      </section>
    </TaskProvider>
  )
}

export default App
