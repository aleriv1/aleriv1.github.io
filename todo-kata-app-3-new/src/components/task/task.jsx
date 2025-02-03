import "./task.scss";
import { Component } from "react";

export default class Task extends Component {
  render() {
    const { label, editing, done, creationTime, onDeleted, onToggleDone } =
      this.props;

    const taskEditing = editing ? (
      <input type="text" className="edit" defaultValue={label}></input>
    ) : (
      ""
    );

    let taskItemClassNames = "task-item";

    if (done) {
      taskItemClassNames += " completed";
    }

    if (editing) {
      taskItemClassNames += " editing";
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
          <button className="icon icon-edit"></button>
          <button className="icon icon-destroy" onClick={onDeleted}></button>
        </div>
        {taskEditing}
      </li>
    );
  }
}
