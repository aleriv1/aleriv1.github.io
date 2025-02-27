import './app.css'
import { Component } from 'react'

import Header from '../header'
import Main from '../main'

class App extends Component {
  deleteItem = (id) => {
    this.setState(({ todoData }) => {
      // const idx = todoData.findIndex((el) => el.id === id)
      // const newTodoData = [...todoData.slice(0, idx), ...todoData.slice(idx + 1)]
      // const newTodoData = todoData.filter((el) => el.id !== id)

      return {
        // todoData: newTodoData,
        todoData: todoData.filter((el) => el.id !== id),
      }
    })
  }

  constructor(props) {
    super(props)
    this.state = {
      todoData: [
        { label: 'Completed task', editing: false, id: 1, creationTime: 'created 17 seconds ago' },
        { label: 'Editing task', editing: true, id: 2 },
        { label: 'Active task', editing: false, id: 3, creationTime: 'created 5 minutes ago' },
      ],
    }
  }

  render() {
    return (
      <section className="todoapp">
        <Header />
        <Main todos={this.state.todoData} onDeleted={this.deleteItem} />
      </section>
    )
  }
}

export default App
