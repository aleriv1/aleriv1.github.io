import './task-list.scss'

import Task from '../task'

const TaskList = ({ todos, onDeleteTask, onEditTask, onChangeLabel, onToggleDone }) => {
  const elements = todos.map((item) => {
    const { id, ...taskProps } = item

    return (
      <Task
        key={id}
        {...taskProps}
        onDeleteTask={() => onDeleteTask(id)}
        onToggleDone={() => onToggleDone(id)}
        onEditTask={() => onEditTask(id)}
        onChangeLabel={onChangeLabel}
        id={id}
      />
    )
  })

  return <ul className="todo-list">{elements}</ul>
}

export default TaskList
