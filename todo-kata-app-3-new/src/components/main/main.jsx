import "./main.scss";

import Footer from "../footer";
import TaskList from "../task-list";

const MainSection = ({
  todos,
  onDeleted,
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
        onDeleted={onDeleted}
        onToggleDone={onToggleDone}
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
