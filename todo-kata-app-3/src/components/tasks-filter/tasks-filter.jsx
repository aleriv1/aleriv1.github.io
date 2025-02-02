import "./tasks-filter.css"

const TasksFilter = ({ onFilterChange}) => {


  
  return (
    <ul className="filters">
      <li>
        <button className="selected" onClick={() => onFilterChange('all')}>All</button>
        {/* <button className="selected">All</button> */}
      </li>
      <li>
        <button onClick={() => onFilterChange('active')}>Active</button>
      </li>
      <li>
        <button onClick={() => onFilterChange('completed')}>Completed</button>
      </li>
    </ul>
  )
}

export default TasksFilter