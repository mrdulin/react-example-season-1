import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';

import AddTodo from './components/AddTodo.react';
import Todos from './components/Todos.react';
import Footer from './components/Footer.react';
import * as Action from '../../../actions/TodoList.action';

class TodoList extends Component{

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

    render() {
        const {dispatch, visibleTodos, visibilityFilter} = this.props;
        return (
            <section id='todoapp'>
                <AddTodo addTodo={(text) => {this.addTodo(text)}}></AddTodo>
                <Todos todos={visibleTodos} toggleTodo={index => this.toggleTodo(index)} markAll={checked => this.markAll(checked)}></Todos>
                <Footer filter={visibilityFilter} onFilterChange={filter => this.onFilterChange(filter)} todoCount={visibleTodos.length}></Footer>
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
const selectTodos = (todos, filter) => {
    switch (filter) {
        case 'SHOW_ALL':
            return todos;
        case 'SHOW_ACTIVE':
            return todos.filter((todo) => !todo.completed);
        case 'SHOW_COMPLETE':
            return todos.filter((todo) => todo.completed);
        default: 
            return todos;
    }
};

//该函数的作用是从store的state tree上取出业务逻辑需要的数据，经过逻辑处理后，返回一个对象，这个对象就是需要注入到组件中数据。
//将这个函数(这里是select)传入connect方法，将该函数返回的对象，注入到TodoList组件中
//常见的方法名是mapStateToProps
const select = (state) => {
    const {TodoList} = state;
    const visibleTodos = selectTodos(TodoList.todos, TodoList.visibilityFilter);
    console.log('select', visibleTodos)
    return {
        visibleTodos,
        visibilityFilter: TodoList.visibilityFilter
    }
};

export default connect(select)(TodoList);
