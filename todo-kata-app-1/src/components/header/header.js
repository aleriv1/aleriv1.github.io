import "./header.css"
import NewTaskForm from "../new-task-form"

const Header = () => {
  return (
    <header className="header">
      <h1>todos</h1>
      <NewTaskForm />
    </header>
  )
}

export default Header