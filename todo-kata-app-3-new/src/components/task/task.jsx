import "./task.scss";
import { Component } from "react";

export default class Task extends Component {
  onLabelChange = () => {
    console.log(".");
  };

  render() {
    const {
      label,
      editing,
      done,
      creationTime,
      onDeleteTask,
      onEditTask,
      onToggleDone,
    } = this.props;

    // const taskEditing = editing ? (
    //   <input type="text" className="edit" defaultValue={label}></input>
    // ) : (
    //   ""
    // );

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
          <button className="icon icon-edit" onClick={onEditTask}></button>
          <button className="icon icon-destroy" onClick={onDeleteTask}></button>
        </div>
        <form>
          <input
            type="text"
            className="edit"
            onChange={this.onLabelChange}
            defaultValue={label}
          />
        </form>
        {/* {taskEditing} */}
      </li>
    );
  }
}
