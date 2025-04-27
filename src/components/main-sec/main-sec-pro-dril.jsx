import './main-sec.scss'
import PropTypes from 'prop-types'

import Footer from '../footer'
import TaskList from '../task-list'

const MainSection = ({
  todos = [],
  onDeleteTask,
  onEditTask,
  onChangeLabel,
  onToggleDone,
  onFilterChange,
  taskLeft,
  onDeleteAllDone,
  filter = 'all',
  onStartTimer,
  onStopTimer,
}) => {
  return (
    <section className="main">
      <TaskList
        todos={todos}
        onDeleteTask={onDeleteTask}
        onToggleDone={onToggleDone}
        onEditTask={onEditTask}
        onChangeLabel={onChangeLabel}
        onStartTimer={onStartTimer}
        onStopTimer={onStopTimer}
      />
      <Footer onFilterChange={onFilterChange} taskLeft={taskLeft} onDeleteAllDone={onDeleteAllDone} filter={filter} />
    </section>
  )
}

MainSection.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object).isRequired,
  onDeleteTask: PropTypes.func.isRequired,
  onEditTask: PropTypes.func.isRequired,
  onChangeLabel: PropTypes.func.isRequired,
  onToggleDone: PropTypes.func.isRequired,
  onFilterChange: PropTypes.func.isRequired,
  taskLeft: PropTypes.number.isRequired,
  onDeleteAllDone: PropTypes.func.isRequired,
  filter: PropTypes.string.isRequired,
}

export default MainSection
