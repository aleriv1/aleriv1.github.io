import './app.css'
import { Component } from 'react'

import Header from '../header'
import Main from '../main'

class App extends Component {
  deleteItem = (id) => {
    this.setState(({ todoData }) => {
      return {
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
