import './task.css'

const Task = ({ label, creationTime }) => {
  return (
    <div className="view">
      <input className="toggle" type="checkbox" />
      <label>
        <span className="description">{label}</span>
        <span className="created"> {creationTime}</span>
      </label>
      <button className="icon icon-edit"></button>
      <button className="icon icon-destroy"></button>
    </div>
  )
}

export default Task
