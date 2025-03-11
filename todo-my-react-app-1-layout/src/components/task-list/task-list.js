import './task-list.css'

import Task from '../task'

const TaskList = ({ todos }) => {
  const elements = todos.map((item) => {
    const { status, id, ...taskProps } = item

    return (
      <li key={id} className={status}>
        <Task {...taskProps} />
        <form>
          <input type="text" className="edit" value={taskProps.label} />
        </form>
      </li>
    )
  })

  return <ul className="todo-list">{elements}</ul>
}

export default TaskList
