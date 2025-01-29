import "./task.css"

const Task = ({ label, status, creationTime }) => {
  // 
  const taskEditing = status === 'editing' ? <input type="text" class="edit" value={label}></input> : ""

  return (
    <li className={status}>
      <div class="view">
        <input className="toggle" type="checkbox" />
        <label>
          <span className="description">{label}</span>
          <span className="created"> {creationTime}</span>
        </label>
        <button className="icon icon-edit"></button>
        <button className="icon icon-destroy"></button>
      </div>
      {taskEditing}
    </li>
  )
}

export default Task

