import { Component } from 'react'
// import { formatDistanceToNow } from 'date-fns'
import { formatDistanceToNowStrict } from 'date-fns'

import './app.scss'

import Header from '../header'
import Main from '../main'

export default class App extends Component {
  maxId = 100

  state = {
    todoData: [
      this.createTaskItem('Completed task', false, 17),
      this.createTaskItem('Editing task', true),
      this.createTaskItem('Active task', false, 300),
    ],
    filter: 'all',
  }

  createTaskItem(label, editing = false, timeShift = 17) {
    let creationTime = new Date(Date.now() - timeShift * 1000)

    return {
      label: label,
      editing: editing,
      done: false,
      id: this.maxId++,
      // creationTime: `created ${formatDistanceToNow(creationTime, { addSuffix: true, includeSeconds: true })}`,
      creationTime: `created ${formatDistanceToNowStrict(creationTime, { addSuffix: true, includeSeconds: true })}`,
    }
  }

  changeLabel = (id, text) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id)
      const oldItem = todoData[idx]
      const newItem = { ...oldItem, label: text }

      const newArr = [...todoData.slice(0, idx), newItem, ...todoData.slice(idx + 1)]

      return {
        todoData: newArr,
      }
    })
  }

  editTask = (id) => {
    this.setState(({ todoData }) => {
      return {
        todoData: this.toggleProperty(todoData, id, 'editing'),
      }
    })
  }

  deleteTask = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id)

      const newTodoData = [...todoData.slice(0, idx), ...todoData.slice(idx + 1)]

      return {
        todoData: newTodoData,
      }
    })
  }

  deleteAllDone = () => {
    this.setState(({ todoData }) => {
      return {
        todoData: todoData.filter((task) => !task.done),
      }
    })
  }

  addNewTask = (text) => {
    const newTask = this.createTaskItem(text)

    this.setState(({ todoData }) => {
      const newArr = [...todoData, newTask]

      return {
        todoData: newArr,
      }
    })
  }

  toggleProperty = (arr, id, propName) => {
    const idx = arr.findIndex((el) => el.id === id)

    const oldItem = arr[idx]

    const newItem = { ...oldItem, [propName]: !oldItem[propName] }

    return [...arr.slice(0, idx), newItem, ...arr.slice(idx + 1)]
  }

  onToggleDone = (id) => {
    this.setState(({ todoData }) => {
      return {
        todoData: this.toggleProperty(todoData, id, 'done'),
      }
    })
  }

  onFilterChange = (filter) => {
    this.setState({
      filter: filter,
    })
  }

  taskFilter = (tasks, filter) => {
    if (filter === 'all') {
      return tasks
    } else if (filter === 'active') {
      return tasks.filter((tasks) => !tasks.done)
    } else if (filter === 'completed') {
      return tasks.filter((tasks) => tasks.done)
    } else {
      return tasks
    }
  }

  render() {
    const { todoData, filter } = this.state

    const visibleTasks = this.taskFilter(todoData, filter)

    const taskLeft = todoData.length - todoData.filter((task) => task.done).length

    return (
      <section className="todoapp">
        <Header onAddNewTask={this.addNewTask} />
        <Main
          todos={visibleTasks}
          onEditTask={this.editTask}
          onChangeLabel={this.changeLabel}
          onDeleteTask={this.deleteTask}
          onToggleDone={this.onToggleDone}
          onFilterChange={this.onFilterChange}
          taskLeft={taskLeft}
          onDeleteAllDone={this.deleteAllDone}
          filter={filter}
        />
      </section>
    )
  }
}
