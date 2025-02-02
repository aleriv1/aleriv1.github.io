import './app.css'
import { Component } from 'react'

import AppHeader from '../header'
import MainSection from '../main'

class App extends Component {

  maxId = 100

  
  state = {
    todoData: [
      this.createTaskItem('Completed task', false, 'created 17 seconds ago'),
      this.createTaskItem('Editing task', true, 'created 5 minutes ago'),
      this.createTaskItem('Active task', false, 'created 5 minutes ago')
    ],
    filter: 'all',
  }

  createTaskItem(label, editing, creatTime) {
    return {
      label: label,
      editing: editing,
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

  onToggleDone = (id) => {
    this.setState(({todoData}) => {
      const idx = todoData.findIndex((el) => el.id === id)

      const oldItem = todoData[idx]

      const newItem = { ...oldItem, done: !oldItem.done}

      const newArray = [
        ...todoData.slice(0, idx),
        newItem,
        ...todoData.slice(idx + 1)
      ]

      return {
        todoData: newArray
      }
    })
  }
  
  // onFilterActive = () => {

  //   this.setState(({todoData}) => {
  //     return {
  //       todoData: todoData.filter((el) => !el.done)
  //     }
  //   } )
    
  // }

  // onFilterCompleted = () =>  {
  //   this.setState(({todoData})=>{

  //     this.prevState = todoData

  //     const doneTasks = todoData.filter((el) => el.done)
  //     const activeTasks = todoData.filter((el) => !el.done)

  //     return {
  //       todoData: todoData.filter((el) => el.done)
  //     }
  //   })
  // }
  
onFilterChange = (filter) => {
  this.setState({
    filter: filter
})
}

taskFilter = (tasks, filter) => {
  switch (filter) {
    case 'all':
      return tasks
    case 'active':
      return tasks.filter(tasks => !tasks.done)
    case 'completed':
      return tasks.filter(tasks => tasks.done)
    default:
     return tasks;
  }
}

  render() {

    const { todoData, filter } = this.state

    const visibleTasks = this.taskFilter(todoData, filter)

    const taskLeft = todoData.length - todoData.filter((task) => task.done).length

    return (

      <section className='todoapp'>
        <AppHeader />
        <MainSection 
          todos={visibleTasks}
          onDeleted={this.deleteItem}
          onToggleDone={this.onToggleDone} 
          onFilterChange={this.onFilterChange}
          taskLeft={taskLeft}
        />
      </section>
    )
  }
}

export default App