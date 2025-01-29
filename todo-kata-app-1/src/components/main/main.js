import "./main.css"

import Footer from "../footer"
import TaskList from "../task-list"

const MainSection = ({ todos }) => {
  return (
    <section className="main">
      <TaskList todos={todos} />
      <Footer />
    </section>
  )
}

export default MainSection