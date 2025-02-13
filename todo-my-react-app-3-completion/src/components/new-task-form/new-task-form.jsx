import './new-task-form.scss'

import { Component } from 'react'
export default class NewTaskForm extends Component {
  static defaultProps = {
    onAddNewTask: () => {
      console.log('Default onAddNewTask called')
    },
  }

  state = {
    label: '',
  }

  onLabelChange = (e) => {
    this.setState({
      label: e.target.value,
    })
  }

  onSubmit = (e) => {
    e.preventDefault()
    this.props.onAddNewTask(this.state.label)
    this.setState({
      label: '',
    })
  }

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <input
          type="text"
          className="new-todo"
          placeholder="What needs to be done?"
          autoFocus
          value={this.state.label}
          onChange={this.onLabelChange}
        />
      </form>
    )
  }
}
