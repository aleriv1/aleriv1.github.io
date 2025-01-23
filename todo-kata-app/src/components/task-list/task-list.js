import "./task-list.css"

import Task from "../task"

const TaskList = ({ todos }) => {

  const elements = todos.map((item) => {

    const { id, ...taskProps } = item

    return (
      <Task {...taskProps} />
    )
  });

  return (
    <ul className="todo-list">
      {elements}
    </ul>
  )

}

export default TaskList