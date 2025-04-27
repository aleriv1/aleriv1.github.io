import './new-task-form.scss'
import PropTypes from 'prop-types'
import { useState, useContext } from 'react'

import { TaskContext } from '../task-context'

const NewTaskForm = () => {
  const { addNewTask } = useContext(TaskContext)
  const [label, setLabel] = useState('')
  const [minutes, setMinutes] = useState('')
  const [seconds, setSeconds] = useState('')

  const onLabelChange = (e) => {
    setLabel(e.target.value)
  }

  const onMinutesChange = (e) => {
    const value = e.target.value.replace(/\D/g, '')
    setMinutes(value)
  }

  const onSecondsChange = (e) => {
    const value = e.target.value.replace(/\D/g, '')
    setSeconds(value)
  }

  const onSubmit = (e) => {
    e.preventDefault()
    if (label.trim()) {
      const totalSeconds = (parseInt(minutes) || 0) * 60 + (parseInt(seconds) || 0)
      addNewTask(label, totalSeconds)
      setLabel('')
      setMinutes('')
      setSeconds('')
    }
  }

  return (
    <form className="new-todo-form" onSubmit={onSubmit}>
      <input
        type="text"
        className="new-todo-form__task"
        placeholder="Tasks"
        autoFocus
        value={label}
        onChange={onLabelChange}
      />
      <input
        className="new-todo-form__timer"
        type="text"
        placeholder="Min"
        value={minutes}
        onChange={onMinutesChange}
      />
      <input
        className="new-todo-form__timer"
        type="text"
        placeholder="Sec"
        value={seconds}
        onChange={onSecondsChange}
      />
      <button type="submit" style={{ display: 'none' }}></button>
    </form>
  )
}

NewTaskForm.propTypes = {
  onAddNewTask: PropTypes.func,
}

export default NewTaskForm
