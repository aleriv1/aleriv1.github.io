import "./footer.scss";

import TasksFilter from "../tasks-filter";

const Footer = ({ onFilterChange, taskLeft, onDeleteAllDone, filter }) => {
  return (
    <footer className="footer">
      <span className="todo-count">{taskLeft} items left</span>
      <TasksFilter
        onFilterChange={onFilterChange}
        filter={filter}
      />
      <button className="clear-completed" onClick={onDeleteAllDone}>
        Clear completed
      </button>
    </footer>
  );
};
export default Footer;
