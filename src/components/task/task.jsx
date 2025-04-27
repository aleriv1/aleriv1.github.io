import './task.scss'
import PropTypes from 'prop-types'
import { useState, useEffect, useContext, useRef } from 'react'

// import { TaskContext } from '../TaskContext'
import { TaskContext } from '../task-context'

const Task = ({ label, editing, done, creationTime, timerSeconds, isTimerRunning, id }) => {
  const { toggleDone, changeLabel, editTask, deleteTask, startTimer, stopTimer } = useContext(TaskContext)
  const [labelInput, setLabelInput] = useState(label)
  const inputRef = useRef(null)

  useEffect(() => {
    if (editing && inputRef.current) {
      inputRef.current.focus()
    }
  }, [editing])

  useEffect(() => {
    setLabelInput(label)
  }, [label])

  const onLabelChange = (e) => {
    setLabelInput(e.target.value)
  }

  const onSubmit = (e) => {
    e.preventDefault()
    changeLabel(id, labelInput)
    editTask(id)
  }

  const onBlur = () => {
    if (!editing) return
    setLabelInput(label)
    editTask(id)
  }

  const onKeyDown = (e) => {
    if (e.key === 'Escape') {
      setLabelInput(label)
      editTask(id)
    }
  }

  const formatTime = (timerSeconds) => {
    const minutes = Math.floor((timerSeconds % 3600) / 60)
    const secs = timerSeconds % 60
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  let taskItemClassNames = 'task-item'
  if (done) taskItemClassNames += ' completed'
  if (editing) taskItemClassNames += ' editing'

  return (
    <li className={taskItemClassNames}>
      <div className="view">
        <input id={id} className="toggle" type="checkbox" onChange={() => toggleDone(id)} checked={done} />
        <label htmlFor={id}>
          <span className="title">{label}</span>
          <span className="description">
            <button
              className="icon icon-play"
              onClick={() => startTimer(id)}
              disabled={isTimerRunning || done}
            ></button>
            <button className="icon icon-pause" onClick={() => stopTimer(id)} disabled={!isTimerRunning}></button>
            {formatTime(timerSeconds)}
          </span>
          <span className="created">{creationTime}</span>
        </label>
        <button className="icon icon-edit" onClick={() => editTask(id)}></button>
        <button className="icon icon-destroy" onClick={() => deleteTask(id)}></button>
      </div>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          className="edit"
          onChange={onLabelChange}
          onBlur={onBlur}
          onKeyDown={onKeyDown}
          value={labelInput}
          ref={inputRef}
        />
      </form>
    </li>
  )
}

Task.propTypes = {
  label: PropTypes.string.isRequired,
  editing: PropTypes.bool.isRequired,
  done: PropTypes.bool,
  creationTime: PropTypes.string,
  timerSeconds: PropTypes.number.isRequired,
  isTimerRunning: PropTypes.bool.isRequired,
  id: PropTypes.number.isRequired,
}

Task.defaultProps = {
  done: false,
  creationTime: '',
}

export default Task
