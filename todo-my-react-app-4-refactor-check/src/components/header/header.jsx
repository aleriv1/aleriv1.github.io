import './header.scss'
import PropTypes from 'prop-types'

import NewTaskForm from '../new-task-form'

const Header = ({ onAddNewTask }) => {
  return (
    <header className="header">
      <h1>todos</h1>
      <NewTaskForm onAddNewTask={onAddNewTask} />
    </header>
  )
}

Header.propTypes = {
  onAddNewTask: PropTypes.func.isRequired,
}

export default Header
