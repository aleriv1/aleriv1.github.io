import './task.scss'
import PropTypes from 'prop-types'
import { Component } from 'react'

export default class Task extends Component {
  static propTypes = {
    label: PropTypes.string.isRequired,
    editing: PropTypes.bool.isRequired,
    done: PropTypes.bool,
    creationTime: PropTypes.string,
    onDeleteTask: PropTypes.func.isRequired,
    onEditTask: PropTypes.func.isRequired,
    onToggleDone: PropTypes.func.isRequired,
    onChangeLabel: PropTypes.func.isRequired,
    id: PropTypes.number.isRequired,
  }

  static defaultProps = {
    done: false,
    creationTime: '',
  }

  state = {
    labelInput: this.props.label,
  }

  onLabelChange = (e) => {
    this.setState({
      labelInput: e.target.value,
    })
  }

  onSubmit = (e) => {
    e.preventDefault()
    this.props.onChangeLabel(this.props.id, this.state.labelInput)
    this.props.onEditTask()
  }

  onBlur = () => {
    console.log('onBlur')
    if (!this.props.editing) return
    this.setState({ labelInput: this.props.label })
    this.props.onEditTask()
  }

  onKeyDown = (e) => {
    if (e.key === 'Escape') {
      this.setState({ labelInput: this.props.label })
      this.props.onEditTask()
    }
  }

  inputRef = null

  componentDidUpdate(preProps) {
    if (!preProps.editing && this.props.editing && this.inputRef) {
      this.inputRef.focus()
    }
  }

  formatTime = (timerSeconds) => {
    const minutes = Math.floor((timerSeconds % 3600) / 60)
    const secs = timerSeconds % 60
    return `${minutes.toString().padStart(2, 0)}:${secs.toString().padStart(2, 0)}`
  }

  render() {
    const {
      label,
      editing,
      done,
      creationTime,
      timerSeconds,
      isTimerRunning,
      onDeleteTask,
      onEditTask,
      onToggleDone,
      id,
      onStartTimer,
      onStopTimer,
    } = this.props

    let taskItemClassNames = 'task-item'

    if (done) {
      taskItemClassNames += ' completed'
    }

    if (editing) {
      taskItemClassNames += ' editing'
    }

    return (
      <li className={taskItemClassNames}>
        <div className="view">
          <input id={id} className="toggle" type="checkbox" onChange={onToggleDone} checked={done} />
          <label htmlFor={id}>
            <span className="title">{label}</span>
            <span className="description">
              <button className="icon icon-play" onClick={onStartTimer} disabled={isTimerRunning || done}></button>
              <button className="icon icon-pause" onClick={onStopTimer} disabled={!isTimerRunning}></button>
              {this.formatTime(timerSeconds)}
            </span>
            <span className="created"> {creationTime}</span>
          </label>
          <button className="icon icon-edit" onClick={onEditTask}></button>
          <button className="icon icon-destroy" onClick={onDeleteTask}></button>
        </div>
        <form onSubmit={this.onSubmit}>
          <input
            type="text"
            className="edit"
            onChange={this.onLabelChange}
            onBlur={this.onBlur}
            onKeyDown={this.onKeyDown}
            value={this.state.labelInput}
            ref={(input) => (this.inputRef = input)}
          />
        </form>
      </li>
    )
  }
}
