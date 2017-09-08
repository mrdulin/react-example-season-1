// import {createSelector} from 'reselect';

const {createSelector} = require('reselect');
// console.log(createSelector);

const getVisibilityFilter = (state) => state.visibilityFilter;
const getTodos = (state) => state.todos;

export const getVisibleTodos = createSelector([getVisibilityFilter, getTodos], (visibilityFilter, todos) => {
  console.log('getVisibleTodos');
  switch (visibilityFilter) {
    case 'SHOW_ALL':
      return todos;
    case 'SHOW_ACTIVE':
      return todos.filter((todo) => !todo.completed);
    case 'SHOW_COMPLETE':
      return todos.filter((todo) => todo.completed);
    default:
      return todos;
  }
})
