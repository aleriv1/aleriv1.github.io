import "./task-list.css"

import Task from "../task"

const TaskList = ({ todos, onDeleted }) => {

  const elements = todos.map((item) => {

    const { id, ...taskProps } = item

    return (
      <Task key={id} {...taskProps}
        onDeleted={() => onDeleted(id)}
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