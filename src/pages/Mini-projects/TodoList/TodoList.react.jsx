import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';

import AddTodo from './components/AddTodo.react';
import Todos from './components/Todos.react';
import Footer from './components/Footer.react';
import * as Action from '../../../actions/TodoList.action';

//使用reselect
import {getVisibleTodos} from './selector';

// console.log(getVisibleTodos);

class TodoList extends Component {

  static propTypes = {
    visibleTodos: PropTypes.arrayOf(PropTypes.shape({
      text: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired
    }).isRequired).isRequired,

    visibilityFilter: PropTypes.oneOf([
      'SHOW_ALL',
      'SHOW_ACTIVE',
      'SHOW_COMPLETE'
    ]).isRequired
  }

  state = {
    test: false
  }

  render() {
    const {dispatch, visibleTodos, visibilityFilter} = this.props;
    return (
      <section id='todoapp'>
        <AddTodo addTodo={(text) => {
          this.addTodo(text)
        }}></AddTodo>
        <Todos todos={visibleTodos} toggleTodo={index => this.toggleTodo(index)} markAll={checked => this.markAll(checked)}></Todos>
        <Footer filter={visibilityFilter} onFilterChange={filter => this.onFilterChange(filter)} todoCount={visibleTodos.length}></Footer>
        <button type="button" onClick={() => this.setState({test: !this.state.test})}>通过setState改变组件内部state状态不会重新走了mapStateToProps</button>
        <button type='button' onClick={() => dispatch(Action.toggleTest())}>改变无关的注入到props上的store上的数据，组件会更新，重新触发mapStateToProps</button>
      </section>
    );
  }

  addTodo(text) {
    this.props.dispatch(Action.addTodo(text));
  }

  toggleTodo(index) {
    this.props.dispatch(Action.toggleTodo(index));
  }

  onFilterChange(filter) {
    this.props.dispatch(Action.setFilter(filter));
  }

  markAll(checked) {
    this.props.dispatch(Action.completeAllTodos(checked));
  }
}

//state中present的todos，需要根据state.visibilityFilter的过滤条件过滤
//最后通过connect注入到TodoList组件props上的visibleTodos是过滤后的数据
// const selectTodos = (todos, filter) => {
//     switch (filter) {
//         case 'SHOW_ALL':
//             return todos;
//         case 'SHOW_ACTIVE':
//             return todos.filter((todo) => !todo.completed);
//         case 'SHOW_COMPLETE':
//             return todos.filter((todo) => todo.completed);
//         default: 
//             return todos;
//     }
// };

//该函数的作用是从store的state tree上取出业务逻辑需要的数据，经过逻辑处理后，返回一个对象，这个对象就是需要注入到组件中数据。
//将这个函数(这里是select)传入connect方法，将该函数返回的对象，注入到TodoList组件中
//常见的方法名是mapStateToProps
const select = (state) => {
  const {TodoList} = state;
  //不使用reselect
  // const visibleTodos = selectTodos(TodoList.todos, TodoList.visibilityFilter);
  //使用reselect
  const visibleTodos = getVisibleTodos(TodoList)
  console.log('select', visibleTodos)
  return {
    visibleTodos,
    visibilityFilter: TodoList.visibilityFilter,
    test: TodoList.test
  }
};

export default connect(select)(TodoList);
