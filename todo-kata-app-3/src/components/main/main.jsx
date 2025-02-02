import "./main.css"

import Footer from "../footer"
import TaskList from "../task-list"

const MainSection = ({ todos, onDeleted, onToggleDone, onFilterChange, taskLeft }) => {
  return (
    <section className="main">
      <TaskList todos={todos}
        onDeleted={onDeleted} 
        onToggleDone={onToggleDone}/>
      <Footer 
      onFilterChange={onFilterChange} 
      taskLeft = {taskLeft}/>
    </section>
  )
}

export default MainSection