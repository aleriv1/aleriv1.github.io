import './app.css'

import AppHeader from '../header'
import MainSection from '../main'

const todoData = [
  { label: 'Completed task', status: 'completed', id: 1 },
  { label: 'Editing task', status: 'editing', id: 2 },
  { label: 'Active task', status: 'active', id: 3 }
]

const App = () => {
  return (
    <section className='todoapp'>
      <AppHeader />
      <MainSection todos={todoData} />
    </section>
  )
}

export default App