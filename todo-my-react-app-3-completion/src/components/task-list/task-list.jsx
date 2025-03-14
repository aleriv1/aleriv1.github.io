import './task-list.scss'

import Task from '../task'

const TaskList = ({ todos, onDeleteTask, onEditTask, onChangeLabel, onToggleDone }) => {
  const elements = todos.map((item) => {
    return (
      <Task
        key={item.id}
        {...item}
        onDeleteTask={() => onDeleteTask(item.id)}
        onToggleDone={() => onToggleDone(item.id)}
        onEditTask={() => onEditTask(item.id)}
        onChangeLabel={onChangeLabel}
        id={item.id}
      />
    )
  })

  return <ul className="todo-list">{elements}</ul>
}

export default TaskList
