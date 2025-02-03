import "./tasks-filter.scss"

const TasksFilter = ({onFilterChange, filter}) => {

  console.log(filter)
  return (
    <ul className="filters">
      <li>
        <button className={ filter === 'all' ? 'selected' : '' } onClick={() => onFilterChange('all')}>All</button>
      </li>
      <li>
        <button className={ filter === 'active' ? 'selected' : '' } onClick={() => onFilterChange('active')}>Active</button>
      </li>
      <li>
        <button className={ filter === 'completed' ? 'selected' : '' } onClick={() => onFilterChange('completed')}>Completed</button>
      </li>
    </ul>
  )
}

export default TasksFilter