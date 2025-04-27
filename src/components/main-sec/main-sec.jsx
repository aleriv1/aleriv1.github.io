import './main-sec.scss'
import PropTypes from 'prop-types'
import { useContext } from 'react'

import { TaskContext } from '../task-context'
import Footer from '../footer'
import TaskList from '../task-list'

const MainSection = () => {
  const { taskLeft, setFilter, deleteAllDone, filter } = useContext(TaskContext)

  return (
    <section className="main">
      <TaskList />
      <Footer onFilterChange={setFilter} taskLeft={taskLeft} onDeleteAllDone={deleteAllDone} filter={filter} />
    </section>
  )
}

MainSection.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object),
  onDeleteTask: PropTypes.func,
  onEditTask: PropTypes.func,
  onChangeLabel: PropTypes.func,
  onToggleDone: PropTypes.func,
  onFilterChange: PropTypes.func,
  taskLeft: PropTypes.number,
  onDeleteAllDone: PropTypes.func,
  filter: PropTypes.string,
}

export default MainSection
