import "./task.css"

// const Task = ({ label, status, creationTime, id }) => {

const Task = ({ label, creationTime, id }) => {

  // const taskEditing = status === 'editing' ? <input type="text" className="edit" defaultValue={label}></input> : ""

  return (

    // <li key={id} className={status} >
    //   {taskEditing}
    // </li>

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