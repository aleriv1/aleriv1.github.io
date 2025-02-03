import "./main.scss";

import Footer from "../footer";
import TaskList from "../task-list";

const MainSection = ({
  todos,
  onDeleteTask,
  onEditTask,
  onToggleDone,
  onFilterChange,
  taskLeft,
  onDeleteAllDone,
  filter,
}) => {
  return (
    <section className="main">
      <TaskList
        todos={todos}
        onDeleteTask={onDeleteTask}
        onToggleDone={onToggleDone}
        onEditTask={onEditTask}
      />
      <Footer
        onFilterChange={onFilterChange}
        taskLeft={taskLeft}
        onDeleteAllDone={onDeleteAllDone}
        filter={filter}
      />
    </section>
  );
};

export default MainSection;
