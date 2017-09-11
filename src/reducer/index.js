import { combineReducers } from 'redux';
import undoable, { distinctState } from 'redux-undo';

import { TodoList } from '../pages/Mini-projects/TodoList/reducers';
import * as MapStateToProps from '../pages/React-redux-demos/mapStateToProps/reducers';
import * as ConnectMultipleNestedComponents from '../pages/React-redux-demos/connect-multiple-nested-components/reducers';
import * as InjectStateToEs5ComponentMixins from '../pages/React-redux-demos/inject-state-to-es5-component-mixins/reducers';
import * as TestApiMiddleware from '../pages/React-redux-demos/test-api-middleware/reducers';
import * as InjectActionCreatorsToComponentProps from '../pages/React-redux-demos/inject-action-creators-to-component-props/reducers';
import * as AsyncActionInComponentWillReceiveProps from '../pages/React-redux-demos/dispatch-async-action-within-componentWillReceiveProps/reducers';
import * as MapDispatchToProps from '../pages/React-redux-demos/mapDispatchToProps/reducers';
import * as DefineReduxStateDataStructure from '../pages/React-redux-demos/how-to-define-state-structure/reducers';
import * as AutoComplete from '../pages/React-redux-demos/autocomplete/reducers';
import * as InitReduxStateTreeDataInComponentWillMount from '../pages/React-redux-demos/dispatch-action-to-reset-state-within-componentWillMount/reducers';
import * as ChangeStateTreeRefData from '../pages/React-redux-demos/modify-state-directly/reducers';
import * as Es6ComponentInheritEs5Component from '../pages/React-redux-demos/es6-component-inherit-es5-component/reducers';
import * as scrollTop from '../pages/React-demos/scroll-top/reducers';
import * as reduxApiMiddlewareReducers from '../pages/React-redux-demos/redux-api-middware-example/reducers';
import * as MultipleStore from '../pages/Redux/multiple-store/reducers';

import * as common from './common.reducer';

//通过combineReducers合成reducer后，state的数据结构就为{todos: [], visibilityFilter: ''}
//传入combineReducers的对象的key名就是state对象的key名，combineReducers的对象的key对应的reducer函数名，可以与key名相同，也可以不同，
//与key名相同的好处就是，在使用ES6语法的时候，如果一个对象的key和value相同，那么可以简写为{key},等同于es5的{key: key}

//这里使用了redux-undo模块，用来实现action的undo,redo功能，使用之前的state的todos的数据结构是{todos: []}，
//使用该模块后，它将数据结构转换为{todos: {future: [], history: {...}, present: [], past: []}}
//这时候'todos'reducer操作的应该是present字段对应的数据

const rootReducer = combineReducers({
  TodoList,
  // todos: undoable(todos, {
  // 	filter: distinctState()
  // }),
  ...ChangeStateTreeRefData,
  ...MapStateToProps,
  ...InjectActionCreatorsToComponentProps,
  ...MapDispatchToProps,
  ...reduxApiMiddlewareReducers,
  ...scrollTop,
  ...DefineReduxStateDataStructure,
  ...InitReduxStateTreeDataInComponentWillMount,
  ...AsyncActionInComponentWillReceiveProps,
  ...common,
  ...AutoComplete,
  ...Es6ComponentInheritEs5Component,
  ...MultipleStore,
  ...ConnectMultipleNestedComponents,
  ...InjectStateToEs5ComponentMixins,
  ...TestApiMiddleware
});

export default rootReducer;
