import "./task-list.css"

import Task from "../task"

const TaskList = ({ todos }) => {
  // let t = false

  // if (t) {
  //   return console.log('true')
  // } else {
  //   return console.log('false')
  // }

  // console.log(tasks)

  const elements = todos.map((item) => {

    const { id, ...taskProps } = item

    return (
      // <li key={id}>
      // </li>
      <Task />
    )

  });

  return (
    <ul className="todo-list">
      {elements}
    </ul>
  )

}

export default TaskList