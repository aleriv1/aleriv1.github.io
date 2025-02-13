import './header.scss'
import NewTaskForm from '../new-task-form'

const Header = ({ onAddNewTask }) => {
  return (
    <header className="header">
      <h1>todos</h1>
      <NewTaskForm onAddNewTask={onAddNewTask} />
    </header>
  )
}

export default Header
