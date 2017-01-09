const makeActionCreator = util.makeActionCreator;

export const addTodo = makeActionCreator('todolist_addTodo', 'text');
export const toggleTodo = makeActionCreator('todolist_toggleTodo', 'index');
export const completeAllTodos = makeActionCreator('todolist_completeAllTodos', 'checked');
export const deleteTodo = makeActionCreator('todolist_deleteTodo', 'index');
export const setFilter = makeActionCreator('todolist_setFilter', 'filter');
export const toggleTest = makeActionCreator('todolist_toggleTest');
