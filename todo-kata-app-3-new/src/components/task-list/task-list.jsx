import "./task-list.scss"

import Task from "../task"

const TaskList = ({ todos, onDeleted, onToggleDone }) => {

  const elements = todos.map((item) => {

    const { id, ...taskProps } = item

    return (
      <Task key={id} {...taskProps}
        onDeleted={() => onDeleted(id)}
        onToggleDone ={() => onToggleDone(id)}
      />
    )
  });

  return (
    <ul className="todo-list">
      {elements}
    </ul>
  )

}

export default TaskList