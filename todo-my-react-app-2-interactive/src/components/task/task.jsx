import './task.css'
import { Component } from 'react'

export default class Task extends Component {
  state = {
    done: false,
    edit: false,
  }

  onLabelClick = () => {
    this.setState(({ done }) => {
      return {
        done: !done,
      }
    })
  }

  render() {
    const { label, editing, creationTime, onDeleted, id } = this.props

    const { done } = this.state

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
          <input id={id} className="toggle" type="checkbox" onChange={this.onLabelClick} />
          <label htmlFor={id}>
            <span className="description">{label}</span>
            <span className="created"> {creationTime}</span>
          </label>
          <button className="icon icon-edit"></button>
          <button className="icon icon-destroy" onClick={onDeleted}></button>
        </div>
        <form>
          <input type="text" className="edit" value={label} />
        </form>
      </li>
    )
  }
}
