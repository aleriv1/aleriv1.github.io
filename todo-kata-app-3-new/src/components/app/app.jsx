import { Component } from "react";
import "./app.scss";

import Header from "../header";
import Main from "../main";

export default class App extends Component {
  maxId = 100;

  state = {
    todoData: [
      this.createTaskItem("Completed task", false, "created 17 seconds ago"),
      this.createTaskItem("Editing task", true, "created 5 minutes ago"),
      this.createTaskItem("Active task", false, "created 5 minutes ago"),
    ],
    filter: "all",
  };

  createTaskItem(label, editing = false, creationTime = '0 minutes ago') {
    return {
      label: label,
      editing: editing,
      done: false,
      id: this.maxId++,
      creationTime: creationTime,
    };
  }

  editTask = (id) => {
    // console.log(`edit ${id}`)
    this.setState(({todoData}) => {
      return {
        todoData: this.toggleProperty(todoData, id, 'editing')
      }
    })
  }

  deleteTask = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id);

      const newTodoData = [
        ...todoData.slice(0, idx),
        ...todoData.slice(idx + 1),
      ];

      return {
        todoData: newTodoData,
      };
    });
  };

  deleteAllDone = () => {
    this.setState(({ todoData }) => {
      return {
        todoData: todoData.filter((task) => !task.done),
      };
    });
  };

  addNewTask = (text) => {
    const newTask = this.createTaskItem(text)

    this.setState(({todoData}) => {
      const newArr = [...todoData, newTask]

      return {
        todoData: newArr
      }
    })
  }

  toggleProperty = (arr, id, propName) => {
    const idx = arr.findIndex((el) => el.id === id)
    
    const oldItem = arr[idx]

    const newItem = { ...oldItem, [propName] : !oldItem[propName] }

    return [...arr.slice(0, idx), newItem, ...arr.slice(idx + 1)]

  }
  
  onToggleDone = (id) => {
    this.setState(({ todoData }) => {
      // const idx = todoData.findIndex((el) => el.id === id);

      // const oldItem = todoData[idx];

      // const newItem = { ...oldItem, done: !oldItem.done };

      // const newArray = [
      //   ...todoData.slice(0, idx),
      //   newItem,
      //   ...todoData.slice(idx + 1),
      // ];

      return {
        // todoData: newArray,
        todoData: this.toggleProperty(todoData, id, 'done'),
      };
    });
  };

  onFilterChange = (filter) => {
    this.setState({
      filter: filter,
    });
  };

  taskFilter = (tasks, filter) => {
    switch (filter) {
      case "all":
        return tasks;
      case "active":
        return tasks.filter((tasks) => !tasks.done);
      case "completed":
        return tasks.filter((tasks) => tasks.done);
      default:
        return tasks;
    }
  };

  render() {
    const { todoData, filter } = this.state;

    const visibleTasks = this.taskFilter(todoData, filter);

    const taskLeft =
      todoData.length - todoData.filter((task) => task.done).length;

    return (
      <section className="todoapp">
        <Header
          onAddNewTask = {this.addNewTask}
         />
        <Main
          todos={visibleTasks}
          onEditTask = {this.editTask}
          onDeleteTask={this.deleteTask}
          onToggleDone={this.onToggleDone}
          onFilterChange={this.onFilterChange}
          taskLeft={taskLeft}
          onDeleteAllDone={this.deleteAllDone}
          filter={filter}
        />
      </section>
    );
  }
}
