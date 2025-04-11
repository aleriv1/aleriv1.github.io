import './task-list.scss'
import PropTypes from 'prop-types'

import Task from '../task'

const TaskList = ({ todos = [], onDeleteTask, onEditTask, onChangeLabel, onToggleDone }) => {
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

TaskList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object).isRequired,
  onDeleteTask: PropTypes.func.isRequired,
  onEditTask: PropTypes.func.isRequired,
  onchangeLabel: PropTypes.func.isRequired,
  ontoggleDone: PropTypes.func.isRequired,
}

export default TaskList
