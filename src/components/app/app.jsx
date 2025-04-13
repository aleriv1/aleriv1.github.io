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
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id)
      const task = todoData[idx]

      if (task.done) return null

      const taskRunning = { ...task, isTimerRunning: true }

      const newArr = [...todoData.slice(0, idx), taskRunning, ...todoData.slice(idx + 1)]

      this.startTimerInterval(id, taskRunning)

      return { todoData: newArr }
    })
  }

  stopTimer = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id)
      const task = todoData[idx]
      const taskStopped = { ...task, isTimerRunning: false }

      const newArr = [...todoData.slice(0, idx), taskStopped, ...todoData.slice(idx + 1)]

      clearInterval(this.timerIntervals[id])

      return { todoData: newArr }
    })
  }

  startTimerInterval = (id) => {
    if (this.timerIntervals[id]) clearInterval(this.timerIntervals[id])

    this.timerIntervals[id] = setInterval(() => {
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
      const newTodoData = this.toggleProperty(todoData, id, 'done')
      const task = newTodoData.find((el) => el.id === id)

      if (this.timerIntervals[id]) clearInterval(this.timerIntervals[id])

      const updatedTask = task.done ? { ...task, isTimerRunning: false } : task

      const updatedTodoData = newTodoData.map((item) => (item.id === id ? updatedTask : item))

      return {
        todoData: updatedTodoData,
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
    clearInterval(this.timerIntervals[id])
    this.setState(({ todoData }) => {
      return { todoData: todoData.filter((task) => task.id !== id) }
    })
  }

  deleteAllDone = () => {
    const tasksToDelete = this.state.todoData.filter((task) => task.done)
    tasksToDelete.forEach((task) => clearInterval(this.timerIntervals[task.id]))
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

  handleVisibilityChange = () => {
    if (document.hidden) {
      this.state.todoData.forEach((task) => {
        if (task.isTimerRunning) {
          this.stopTimer(task.id)
        }
      })
    } else {
      this.state.todoData.forEach((task) => {
        if (task.isTimerRunning) {
          this.startTimer(task.id)
        }
      })
    }
  }

  componentDidMount() {
    document.addEventListener('visibilitychange', this.handleVisibilityChange)
    this.state.todoData.forEach((task) => {
      if (task.isTimerRunning) {
        this.startTimerInterval(task.id)
      }
    })
  }

  componentWillUnmount() {
    document.removeEventListener('visibilitychange', this.handleVisibilityChange)
    Object.values(this.timerIntervals).forEach((interval) => clearInterval(interval))
    this.timerINtervals = []
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
