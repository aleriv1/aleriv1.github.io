import './app.css'
import { Component } from 'react'

import AppHeader from '../header'
import MainSection from '../main'



class App extends Component {

  // state = {
  //   todoData: [
  //     { label: 'Completed task', editing: false, id: 1, creationTime: 'created 17 seconds ago' },
  //     { label: 'Editing task', editing: true, id: 2 },
  //     { label: 'Active task', editing: false, id: 3, creationTime: 'created 5 minutes ago' }
  //   ]
  // }
  
  deleteItem = (id) => {
    console.log('test del')
    this.setState(({todoData}) => {
      const idx = todoData.findIndex((el) => el.id === id)

      const newTodoData = [
        ...todoData.slice(0, idx),
        ...todoData.slice(idx + 1),
      ]
    
      console.log(newTodoData)

      return {
        // todos: newTodoData        
        todoData: newTodoData        
      }
      
    })
  }

  constructor(props) {
    super(props);
    this.state = {
          todoData: [
      { label: 'Completed task', editing: false, id: 1, creationTime: 'created 17 seconds ago' },
      { label: 'Editing task', editing: true, id: 2 },
      { label: 'Active task', editing: false, id: 3, creationTime: 'created 5 minutes ago' }
    ]

    }
  }
  render() {
    return (
      <section className='todoapp'>
        <AppHeader />
        <MainSection todos={this.state.todoData}
        // <MainSection todos={this.state.todos}
          onDeleted={this.deleteItem} />
      </section>
    )
  }
}


export default App