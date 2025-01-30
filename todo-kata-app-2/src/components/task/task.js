import "./task.css"
import { Component } from "react"

const TaskFunc = ({ label, status, creationTime }) => {

  const taskEditing = status === 'editing' ? <input type="text" className="edit" defaultValue={label}></input> : ""

  return (

    <li className={status} >

      <div className="view">
        <input className="toggle" type="checkbox" />
        <label>
          <span className="description">{label}</span>
          <span className="created"> {creationTime}</span>
        </label>
        <button className="icon icon-edit"></button>
        <button className="icon icon-destroy"></button>
      </div>
      {taskEditing}
    </li>
  )
}

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
    // const { label, status, creationTime } = this.props
    const { label, editing, creationTime } = this.props

    const { done } = this.state

    // const taskEditing = status === 'editing' ? <input type="text" className="edit" defaultValue={label}></input> : ""
    const taskEditing = editing ? <input type="text" className="edit" defaultValue={label}></input> : ""

    let taskItemClassNames = "task-item"

    if (done) {
      taskItemClassNames += " completed"
    }

    if (editing) {
      taskItemClassNames += " editing"
    }

    return (
      // <li className={status} >
      <li className={taskItemClassNames} >

        <div className="view">
          <input className="toggle" type="checkbox" />
          <label>
            <span className="description" onClick={this.onLabelClick}>{label}</span>
            <span className="created"> {creationTime}</span>
          </label>
          <button className="icon icon-edit"></button>
          <button className="icon icon-destroy"></button>
        </div>
        {taskEditing}
      </li>
    )
  }
}

// export default Task