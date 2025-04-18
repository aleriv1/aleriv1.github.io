import './new-task-form.scss'
import PropTypes from 'prop-types'
import { Component } from 'react'

export default class NewTaskForm extends Component {
  static propTypes = {
    onAddNewTask: PropTypes.func.isRequired,
  }

  state = {
    label: '',
    minutes: '',
    seconds: '',
  }

  onLabelChange = (e) => {
    this.setState({
      label: e.target.value,
    })
  }

  onMinutesChange = (e) => {
    const value = e.target.value.replace(/\D/g, '')
    this.setState({
      minutes: value,
    })
  }

  onSecondsChange = (e) => {
    const value = e.target.value.replace(/\D/g, '')
    this.setState({
      seconds: value,
    })
  }

  onSubmit = (e) => {
    e.preventDefault()
    const { label, minutes, seconds } = this.state
    if (label.trim()) {
      const totalSeconds = (parseInt(minutes) || 0) * 60 + (parseInt(seconds) || 0)
      console.log('totalSeconds', totalSeconds)
      this.props.onAddNewTask(label, totalSeconds)
      this.setState({
        label: '',
        minutes: '',
        seconds: '',
      })
    }
  }

  render() {
    const { label, minutes, seconds } = this.state
    return (
      <form className="new-todo-form" onSubmit={this.onSubmit}>
        {/* {console.log('render new task form')} */}
        <input
          type="text"
          className="new-todo-form__task"
          placeholder="Tasks"
          autoFocus
          value={label}
          onChange={this.onLabelChange}
        />
        <input
          className="new-todo-form__timer"
          type="text"
          placeholder="Min"
          value={minutes}
          onChange={this.onMinutesChange}
        />
        <input
          className="new-todo-form__timer"
          type="text"
          placeholder="Sec"
          value={seconds}
          onChange={this.onSecondsChange}
        />
        <button type="submit" style={{ display: 'none' }}></button>
      </form>
    )
  }
}
