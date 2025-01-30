import "./task.css"
import { Component } from "react"

export default class Task extends Component {

  state = {
    done: false,
    edit: false,
  }

  onLabelClick = () => {
    this.setState(({ done }) => {
      return {
        done: !done
      }
    }
    )
  }

  render() {
    const { label, editing, creationTime, onDeleted } = this.props

    const { done } = this.state

    const taskEditing = editing ? <input type="text" className="edit" defaultValue={label}></input> : ""

    let taskItemClassNames = "task-item"

    if (done) {
      taskItemClassNames += " completed"
    }

    if (editing) {
      taskItemClassNames += " editing"
    }

    return (
      <li className={taskItemClassNames} >

        <div className="view">
          <input className="toggle" type="checkbox" />
          <label>
            <span className="description" onClick={this.onLabelClick}>{label}</span>
            <span className="created"> {creationTime}</span>
          </label>
          <button className="icon icon-edit"></button>
          <button className="icon icon-destroy"
            onClick={onDeleted}>

          </button>
        </div>
        {taskEditing}
      </li>
    )
  }
}