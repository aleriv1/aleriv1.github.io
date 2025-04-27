import { createContext, useReducer, useEffect, useRef } from 'react'
import { formatDistanceToNowStrict } from 'date-fns'

export const TaskContext = createContext()

const initialState = {
  todoData: [
    {
      label: 'task 0',
      editing: false,
      done: false,
      id: 100,
      creationTime: `created ${formatDistanceToNowStrict(new Date(Date.now() - 17 * 1000), { addSuffix: true, includeSeconds: true })}`,
      timerSeconds: 17,
      initialSeconds: 17,
      isTimerRunning: false,
      isCountingUp: false,
    },
    {
      label: 'Editing task',
      editing: true,
      done: false,
      id: 101,
      creationTime: `created ${formatDistanceToNowStrict(new Date(Date.now() - 0 * 1000), { addSuffix: true, includeSeconds: true })}`,
      timerSeconds: 0,
      initialSeconds: 0,
      isTimerRunning: false,
      isCountingUp: false,
    },
    {
      label: 'task 2',
      editing: false,
      done: false,
      id: 102,
      creationTime: `created ${formatDistanceToNowStrict(new Date(Date.now() - 300 * 1000), { addSuffix: true, includeSeconds: true })}`,
      timerSeconds: 300,
      initialSeconds: 300,
      isTimerRunning: false,
      isCountingUp: false,
    },
  ],
  filter: 'all',
}

/* eslint-disable indent */

const taskReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TASK':
      return {
        ...state,
        todoData: [...state.todoData, action.payload],
      }
    case 'CHANGE_LABEL':
      return {
        ...state,
        todoData: state.todoData.map((task) =>
          task.id === action.payload.id ? { ...task, label: action.payload.text } : task
        ),
      }
    case 'TOGGLE_DONE':
      return {
        ...state,
        todoData: state.todoData.map((task) => {
          if (task.id === action.payload) {
            const updatedTask = { ...task, done: !task.done }
            if (updatedTask.done) {
              return { ...updatedTask, isTimerRunning: false, timerSeconds: 0, initialSeconds: 0 }
            }
            return updatedTask
          }
          return task
        }),
      }
    case 'EDIT_TASK':
      return {
        ...state,
        todoData: state.todoData.map((task) =>
          task.id === action.payload ? { ...task, editing: !task.editing } : task
        ),
      }
    case 'DELETE_TASK':
      return {
        ...state,
        todoData: state.todoData.filter((task) => task.id !== action.payload),
      }
    case 'DELETE_ALL_DONE':
      return {
        ...state,
        todoData: state.todoData.filter((task) => !task.done),
      }
    case 'SET_FILTER':
      return {
        ...state,
        filter: action.payload,
      }
    case 'START_TIMER':
      return {
        ...state,
        todoData: state.todoData.map((task) =>
          task.id === action.payload && !task.done ? { ...task, isTimerRunning: true } : task
        ),
      }
    case 'STOP_TIMER':
      return {
        ...state,
        todoData: state.todoData.map((task) =>
          task.id === action.payload ? { ...task, isTimerRunning: false } : task
        ),
      }
    case 'UPDATE_TIMER':
      return {
        ...state,
        todoData: state.todoData.map((task) => {
          if (task.id === action.payload.id && !task.done) {
            let newSeconds
            if (task.initialSeconds > 0 && task.timerSeconds > 0 && !task.isCountingUp) {
              newSeconds = task.timerSeconds - 1
              if (newSeconds === 0) {
                return { ...task, timerSeconds: 0, isTimerRunning: false, done: true, isCountingUp: true }
              }
            } else {
              newSeconds = task.timerSeconds + 1
            }
            return { ...task, timerSeconds: newSeconds }
          }
          return task
        }),
      }
    default:
      return state
  }
}

/* eslint-enable indent */

let maxId = 103

export const TaskProvider = ({ children }) => {
  const [state, dispatch] = useReducer(taskReducer, initialState)
  const timerIntervals = useRef({})

  const createTaskItem = (label, editing = false, timeShift = 1, initialSeconds = 0) => {
    const creationTime = new Date(Date.now() - timeShift * 1000)
    return {
      label,
      editing,
      done: false,
      id: maxId++,
      creationTime: `created ${formatDistanceToNowStrict(creationTime, { addSuffix: true, includeSeconds: true })}`,
      timerSeconds: initialSeconds,
      initialSeconds,
      isTimerRunning: false,
      isCountingUp: false,
    }
  }

  const startTimerInterval = (id) => {
    if (timerIntervals.current[id]) clearInterval(timerIntervals.current[id])

    timerIntervals.current[id] = setInterval(() => {
      dispatch({ type: 'UPDATE_TIMER', payload: { id } })
    }, 1000)
  }

  const handleVisibilityChange = () => {
    if (document.hidden) {
      state.todoData.forEach((task) => {
        if (task.isTimerRunning) {
          dispatch({ type: 'STOP_TIMER', payload: task.id })
          clearInterval(timerIntervals.current[task.id])
          timerIntervals.current[task.id] = null
        }
      })
    } else {
      state.todoData.forEach((task) => {
        if (task.isTimerRunning) {
          startTimerInterval(task.id)
        }
      })
    }
  }

  useEffect(() => {
    document.addEventListener('visibilitychange', handleVisibilityChange)
    state.todoData.forEach((task) => {
      if (task.isTimerRunning) {
        startTimerInterval(task.id)
      }
    })

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      Object.values(timerIntervals.current).forEach((interval) => clearInterval(interval))
      timerIntervals.current = {}
    }
  }, [state.todoData])

  const taskFilter = (tasks, filter) => {
    if (filter === 'all') return tasks
    if (filter === 'active') return tasks.filter((task) => !task.done)
    if (filter === 'completed') return tasks.filter((task) => task.done)
    return tasks
  }

  const value = {
    todoData: state.todoData,
    filter: state.filter,
    visibleTasks: taskFilter(state.todoData, state.filter),
    taskLeft: state.todoData.length - state.todoData.filter((task) => task.done).length,
    addNewTask: (text, initialSeconds) => {
      const newTask = createTaskItem(text, false, 1, initialSeconds)
      dispatch({ type: 'ADD_TASK', payload: newTask })
    },
    changeLabel: (id, text) => dispatch({ type: 'CHANGE_LABEL', payload: { id, text } }),
    toggleDone: (id) => {
      dispatch({ type: 'TOGGLE_DONE', payload: id })
      clearInterval(timerIntervals.current[id])
    },
    editTask: (id) => dispatch({ type: 'EDIT_TASK', payload: id }),
    deleteTask: (id) => {
      dispatch({ type: 'DELETE_TASK', payload: id })
      clearInterval(timerIntervals.current[id])
    },
    deleteAllDone: () => {
      const tasksToDelete = state.todoData.filter((task) => task.done)
      tasksToDelete.forEach((task) => clearInterval(timerIntervals.current[task.id]))
      dispatch({ type: 'DELETE_ALL_DONE' })
    },
    setFilter: (filter) => dispatch({ type: 'SET_FILTER', payload: filter }),
    startTimer: (id) => {
      dispatch({ type: 'START_TIMER', payload: id })
      startTimerInterval(id)
    },
    stopTimer: (id) => {
      dispatch({ type: 'STOP_TIMER', payload: id })
      clearInterval(timerIntervals.current[id])
    },
  }

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>
}
