import './app.css'
import { Component } from 'react'

import AppHeader from '../header'
import MainSection from '../main'

// const todoData = [
//   { label: 'Completed task', status: 'completed', id: 1, creationTime: 'created 17 seconds ago' },
//   { label: 'Editing task', status: 'editing', id: 2 },
//   { label: 'Active task', status: 'active', id: 3, creationTime: 'created 5 minutes ago' }
// ]

const todoData = [
  { label: 'Completed task', editing: false, id: 1, creationTime: 'created 17 seconds ago' },
  { label: 'Editing task', editing: true, id: 2 },
  { label: 'Active task', editing: false, id: 3, creationTime: 'created 5 minutes ago' }
]

// const AppFunc = () => {
//   return (
//     <section className='todoapp'>
//       <AppHeader />
//       <MainSection todos={todoData} />
//     </section>
//   )
// }


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: todoData
    }
  }
  render() {
    return (
      <section className='todoapp'>
        <AppHeader />
        <MainSection todos={todoData} />
      </section>
    )
  }
}


export default App