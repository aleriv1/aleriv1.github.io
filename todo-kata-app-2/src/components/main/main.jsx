import "./main.css"

import Footer from "../footer"
import TaskList from "../task-list"

const MainSection = ({ todos, onDeleted }) => {
  return (
    <section className="main">
      <TaskList todos={todos}
        onDeleted={onDeleted} />
      <Footer />
    </section>
  )
}

export default MainSection