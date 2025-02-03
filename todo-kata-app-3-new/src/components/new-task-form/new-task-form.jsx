import "./new-task-form.scss";

const NewTaskForm = () => {
  return (
    <input
      type="text"
      className="new-todo"
      placeholder="What needs to be done?"
      autoFocus
    />
  );
};

export default NewTaskForm;
