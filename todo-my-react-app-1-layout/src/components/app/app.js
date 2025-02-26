import './app.css'

import Header from '../header'
import Main from '../main'

const todoData = [
  { label: 'Completed task', status: 'completed', id: 1, creationTime: 'created 17 seconds ago' },
  { label: 'Editing task', status: 'editing', id: 2 },
  { label: 'Active task', status: 'active', id: 3, creationTime: 'created 5 minutes ago' },
]
const App = () => {
  return (
    <section className="todoapp">
      <Header />
      <Main todos={todoData} />
    </section>
  )
}
export default App
