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
    const { label, editing, done, creationTime, onDeleteTask, onEditTask, onToggleDone } = this.props

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
          <input className="toggle" type="checkbox" />
          <label>
            <span className="description" onClick={onToggleDone}>
              {label}
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
