import "./task-list.css"

import Task from "../task"

const TaskList = ({ todos }) => {

  const elements = todos.map((item) => {

    // const { id, ...taskProps } = item
    const { status, id, ...taskProps } = item

    const taskEditing = status === 'editing' ? <input type="text" className="edit" defaultValue='Editing task'></input> : ""

    return (
      <li key={id} className={status} >
        <Task {...taskProps} />
        {taskEditing}
      </li>
    )
  });

  return (
    <ul className="todo-list">
      {elements}
    </ul>
  )

}

export default TaskList