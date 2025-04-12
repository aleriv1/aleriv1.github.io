import './task.scss'
import PropTypes from 'prop-types'
import { Component } from 'react'

export default class Task extends Component {
  static propTypes = {
    label: PropTypes.string.isRequired,
    editing: PropTypes.string.isRequired,
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
    time: 0,
    isRunning: false,
  }

  timer = null

  componentDidMount() {
    document.addEventListener('visibilitychange', this.handleVisibilityChange)
  }

  componentWillUnmount() {
    clearInterval(this.timer)
    document.removeEventListener('visibilitychange', this.handleVisibilityChange)
  }
  //   this.timer = setInterval(() => {
  //     this.setState((prevState) => ({
  //       time: prevState.time + 1,
  //     }))
  //   })
  // }

  // componentWillUnmount() {
  //   clearInterval(this.timer)

  startTimer = () => {
    console.log('this.state.isRunning', this.state.isRunning)
    // if (!this.state.isRunning) {
    if (this.timer) return

    // console.log('startTimer')
    this.setState({ isRunning: true })
    this.timer = setInterval(() => {
      this.setState((prevState) => ({
        time: prevState.time + 1,
      }))
    }, 1000)
    // }
  }

  stopTimer = () => {
    if (this.state.isRunning) {
      // console.log('stopTimer')
      clearInterval(this.timer)
      this.setState({ isRunning: false })
    }
  }

  handleVisibilityChange = () => {
    if (document.hidden && this.state.isRunning) {
      clearInterval(this.timer)
      this.timer = null
      // console.log(`time ${this.state.time}`, `this.state.isRunning ${this.state.isRunning}`, 'clear')
    } else if (!document.hidden && this.state.isRunning && !this.timer) {
      this.startTimer()
      // console.log(`time ${this.state.time}`, `this.state.isRunning ${this.state.isRunning}`, 'start')
    }
  }

  onLabelChange = (e) => {
    this.setState({
      labelInput: e.target.value,
    })
  }

  onSumbit = (e) => {
    e.preventDefault()
    this.props.onChangeLabel(this.props.id, this.state.labelInput)
    this.props.onEditTask()
  }

  render() {
    const { label, editing, done, creationTime, onDeleteTask, onEditTask, onToggleDone, id } = this.props

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
          <input id={id} className="toggle" type="checkbox" onChange={onToggleDone} />
          <label htmlFor={id}>
            <span className="title">{label}</span>
            <span className="description">
              <button className="icon icon-play" onClick={this.startTimer} disabled={this.state.isRunning}></button>
              <button className="icon icon-pause" onClick={this.stopTimer} disabled={this.isRunning}></button>
              {/* 12:25 */}
              {this.state.time}
            </span>
            <span className="created"> {creationTime}</span>
          </label>
          <button className="icon icon-edit" onClick={onEditTask}></button>
          <button className="icon icon-destroy" onClick={onDeleteTask}></button>
        </div>
        <form onSubmit={this.onSumbit}>
          <input type="text" className="edit" onChange={this.onLabelChange} value={this.state.labelInput} />
        </form>
      </li>
    )
  }
}
