import './task-list.css'

import Task from '../task'

const TaskList = ({ todos, onDeleted }) => {
  const elements = todos.map((item) => {
    return <Task key={item.id} {...item} onDeleted={() => onDeleted(item.id)} />
  })

  return <ul className="todo-list">{elements}</ul>
}

export default TaskList
