import "./header.css"
import NewTaskForm from "../new-task-form"

const AppHeader = () => {
  return (

    <header className="header">
      <h1>todos</h1>
      <NewTaskForm />
    </header>
  )
}

export default AppHeader