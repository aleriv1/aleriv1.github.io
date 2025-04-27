import './task-list.scss'
import PropTypes from 'prop-types'
import { useContext } from 'react'

import { TaskContext } from '../task-context'
import Task from '../task'

const TaskList = () => {
  const { visibleTasks, toggleDone, editTask, changeLabel, deleteTask, startTimer, stopTimer } = useContext(TaskContext)

  const elements = visibleTasks.map((item) => (
    <Task
      key={item.id}
      {...item}
      onDeleteTask={() => deleteTask(item.id)}
      onToggleDone={() => toggleDone(item.id)}
      onEditTask={() => editTask(item.id)}
      onChangeLabel={changeLabel}
      id={item.id}
      onStartTimer={() => startTimer(item.id)}
      onStopTimer={() => stopTimer(item.id)}
    />
  ))

  return <ul className="todo-list">{elements}</ul>
}

TaskList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object),
  onDeleteTask: PropTypes.func,
  onEditTask: PropTypes.func,
  onChangeLabel: PropTypes.func,
  onToggleDone: PropTypes.func,
  onStartTimer: PropTypes.func,
  onStopTimer: PropTypes.func,
}

export default TaskList
