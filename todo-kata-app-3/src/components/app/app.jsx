import './app.css'
import { Component } from 'react'

import AppHeader from '../header'
import MainSection from '../main'

class App extends Component {

  maxId = 100
  
  state = {
    todoData: [
      { label: 'Completed task', editing: false, done: false, id: 1, creationTime: 'created 17 seconds ago' },
      { label: 'Editing task', editing: true, done: false, id: 2, creationTime: 'created 5 minutes ago' },
      { label: 'Active task', editing: false, done: false, id: 3, creationTime: 'created 5 minutes ago' }
    ]
  }

  createToItem(label, creatTime) {
    return {
      label: label,
      editing: false,
      done: false,
      id: this.maxId++,
      creatTime: creatTime
    }
  }

  deleteItem = (id) => {
    console.log('test del')
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id)

      const newTodoData = [
        ...todoData.slice(0, idx),
        ...todoData.slice(idx + 1),
      ]

      console.log(newTodoData)

      return {
        todoData: newTodoData
      }

    })
  }

  
  render() {
    return (
      <section className='todoapp'>
        <AppHeader />
        <MainSection todos={this.state.todoData}
          onDeleted={this.deleteItem} />

      </section>

    )
  }
}

export default App

  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     todoData: [
  //       { label: 'Completed task', editing: false, id: 1, creationTime: 'created 17 seconds ago' },
  //       { label: 'Editing task', editing: true, id: 2 },
  //       { label: 'Active task', editing: false, id: 3, creationTime: 'created 5 minutes ago' }
  //     ]
  //   }
  // }