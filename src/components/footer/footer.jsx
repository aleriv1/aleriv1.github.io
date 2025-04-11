import './footer.scss'
import PropTypes from 'prop-types'

import TasksFilter from '../tasks-filter'

const Footer = ({ onFilterChange, taskLeft = 0, onDeleteAllDone, filter = 'all' }) => {
  return (
    <footer className="footer">
      <span className="todo-count">{taskLeft} items left</span>
      <TasksFilter onFilterChange={onFilterChange} filter={filter} />
      <button className="clear-completed" onClick={onDeleteAllDone}>
        Clear completed
      </button>
    </footer>
  )
}

Footer.propTypes = {
  onFilterChange: PropTypes.func.isRequired,
  taskLeft: PropTypes.number.isRequired,
  onDeleteAllDone: PropTypes.func.isRequired,
  filter: PropTypes.string.isRequired,
}

export default Footer
