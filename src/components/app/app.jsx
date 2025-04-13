import { Component } from 'react'
import { formatDistanceToNowStrict } from 'date-fns'

import './app.scss'

import Header from '../header'
import Main from '../main'

export default class App extends Component {
  maxId = 100

  state = {
    todoData: [
      // this.createTaskItem('Completed task', false, 17),
      this.createTaskItem('task 0', false, 17),
      this.createTaskItem('Editing task', true, 0),
      // this.createTaskItem('Active task', false, 300),
      this.createTaskItem('task 2', false, 300),
    ],
    filter: 'all',
  }

  timerIntervals = []

  startTimer = (id) => {
    // console.log('startTimer', id)
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id)
      const oldItem = todoData[idx]
      const newItem = { ...oldItem, isTimerRunning: true }

      const newArr = [...todoData.slice(0, idx), newItem, ...todoData.slice(idx + 1)]

      this.startTimerInterval(id, newItem)

      return { todoData: newArr }
    })
  }

  stopTimer = (id) => {
    // console.log('stopTimer', id)
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id)
      const oldItem = todoData[idx]
      const newItem = { ...oldItem, isTimerRunning: false }

      const newArr = [...todoData.slice(0, idx), newItem, ...todoData.slice(idx + 1)]

      clearInterval(this.timerIntervals[id])

      return { todoData: newArr }
    })
  }

  startTimerInterval = (id) => {
    // console.log(this.timerIntervals, id, this.state.todoData.timerSeconds)
    if (this.timerIntervals[id]) clearInterval(this.timerIntervals[id])

    this.timerIntervals[id] = setInterval(() => {
      // console.log('test')
      this.setState(({ todoData }) => {
        const idx = todoData.findIndex((el) => el.id === id)
        const oldItem = todoData[idx]
        const newItem = { ...oldItem, timerSeconds: oldItem.timerSeconds + 1 }

        const newArr = [...todoData.slice(0, idx), newItem, ...todoData.slice(idx + 1)]

        return { todoData: newArr }
      })
    }, 1000)
  }

  createTaskItem(label, editing = false, timeShift = 1) {
    let creationTime = new Date(Date.now() - timeShift * 1000)

    return {
      label: label,
      editing: editing,
      done: false,
      id: this.maxId++,
      creationTime: `created ${formatDistanceToNowStrict(creationTime, { addSuffix: true, includeSeconds: true })}`,
      timerSeconds: 0,
      isTimerRunning: false,
    }
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

  editTask = (id) => {
    this.setState(({ todoData }) => {
      return {
        todoData: this.toggleProperty(todoData, id, 'editing'),
      }
    })
  }

  deleteTask = (id) => {
    this.setState(({ todoData }) => {
      return { todoData: todoData.filter((task) => task.id !== id) }
    })
  }

  deleteAllDone = () => {
    this.setState(({ todoData }) => {
      return {
        todoData: todoData.filter((task) => !task.done),
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
          onStartTimer={this.startTimer}
          // onStartTimer={(id) => this.startTimer(id)}
          onStopTimer={this.stopTimer}
          // onStopTimer={(id) => this.stopTimer(id)}
        />
      </section>
    )
  }
}
