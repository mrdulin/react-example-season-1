import { combineReducers } from 'redux';

const initState = {
  visibilityFilter: 'SHOW_ALL',
  todos: [],
  test: false
}

const createReducer = (initialState, handlersMap) => (state = initialState, action) => {
  if (handlersMap.hasOwnProperty(action.type)) {
    return handlersMap[action.type](state, action);
  } else {
    return state;
  }
}

const TodoList = createReducer(initState, {
  todolist_addTodo: addTodo,
  todolist_toggleTodo: toggleTodo,
  todolist_setFilter: setFilter,
  todolist_completeAllTodos: completeAllTodos,
  todolist_toggleTest: toggleTest
})

function toggleTest(state) {
  return {
    ...state,
    test: !state.test
  }
}

function completeAllTodos(state, { checked }) {
  return {
    ...state,
    todos: state.todos.map(todo => Object.assign({}, todo, { completed: checked }))
  }
}

function toggleTodo(state, { index }) {
  const target = state.todos[index];
  return {
    ...state,
    todos: [
      ...state.todos.slice(0, index),
      Object.assign({}, target, { text: target.text, completed: !target.completed }),
      ...state.todos.slice(index + 1)
    ]
  }
}

function addTodo(state, action) {
  return Object.assign({}, state, {
    todos: [
      ...state.todos,
      {
        text: action.text,
        completed: false
      }
    ]
  })
}

function setFilter(state, action) {
  return {
    ...state,
    visibilityFilter: action.filter
  }
}


export { TodoList };
