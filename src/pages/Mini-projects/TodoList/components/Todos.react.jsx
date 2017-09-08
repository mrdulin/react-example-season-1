import React, {Component, PropTypes} from 'react';
import Todo from './Todo.react';

class Todos extends Component {
  static propTypes = {
    toggleTodo: PropTypes.func.isRequired,
    todos: PropTypes.arrayOf(PropTypes.shape({
      text: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired
    }).isRequired).isRequired,
    markAll: PropTypes.func.isRequired
  }

  constructor() {
    super();
    this.handleMarkAll = ::this.handleMarkAll;
  }

  render() {
    const {todos} = this.props;
    const todoItems = todos.map((todo, index) => {
      return <Todo {...todo} key={index} onClick={e => this.handleToggleTodo(index)}></Todo>
    });
    return (
      <section id='main' style={{display: todos.length > 0 ? 'block' : 'none'}}>
        <input type="checkbox" id="toggle-all" onClick={this.handleMarkAll}/>
        <label htmlFor="toggle-all">Mark all as complete</label>
        <ul id='todo-list'>{todoItems}</ul>
      </section>
    );
  }

  handleToggleTodo(index) {
    const {toggleTodo} = this.props;
    toggleTodo && toggleTodo(index);
  }

  handleMarkAll(e) {
    const {markAll} = this.props;
    const checked = e.target.checked;
    markAll && markAll(checked);
  }
}

export default Todos;
