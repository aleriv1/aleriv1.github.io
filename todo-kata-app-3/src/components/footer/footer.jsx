import "./footer.css"

import TasksFilter from "../tasks-filter"

const Footer = ({onFilterChange, taskLeft}) => {
  return (
    <footer className="footer">
      <span className="todo-count">{taskLeft} items left</span>
      <TasksFilter onFilterChange={onFilterChange}/>
      <button className="clear-completed">Clear completed</button>
    </footer>
  )
}

export default Footer