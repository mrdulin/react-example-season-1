import {applyMiddleware, createStore, compose} from 'redux';
import rootReducer from './reducer';
import sagas from './saga';
//webpack未开启noParse
import createLogger from 'redux-logger';
// const createLogger = require('redux-logger');

//使用ES6
// import thunk from 'redux-thunk';
//使用commonjs
const thunk = require('redux-thunk').default;
import createSagaMiddleware from 'redux-saga';

import {apiMiddleware} from 'redux-api-middleware';
// import {testMiddleware} from './middlewares/testMiddleware';
import api from './middlewares/api';

const sagaMiddleware = createSagaMiddleware();


const api_host = 'http://www.google.com';
let middlewares = [apiMiddleware, api, thunk.withExtraArgument({api_host}), sagaMiddleware];

if (__DEV__) {
  //如果action常量是Symbol类型，那么会报错： Uncaught (in promise) TypeError: Cannot convert a Symbol value to a string
  //解决方法: 如下，将Symbol类型转换成字符串
  const logger = createLogger({
    duration: true, //action的耗时，action @ 10:27:55.461 todolist_addTodo (in 2.31 ms)
    timestamp: true, //action的时间戳, action @ 10:27:55.461 todolist_addTodo (in 2.31 ms)
    logErrors: true, //是否允许action catch到错误，打印或者抛出错误
    diff: true,
    actionTransformer: (action) => ({
      ...action,
      type: String(action.type),
    })
  });
  middlewares = [...middlewares, logger];
}

//logger中间件必须放在所有中间件的最后，否则它会打印出thunk和promise中间件的一些操作，而不是action
const createStoreWithMiddleware = compose(
  applyMiddleware(...middlewares),
  window.devToolsExtension ? window.devToolsExtension() : f => f
)(createStore);

const store = createStoreWithMiddleware(rootReducer);

sagaMiddleware.run(sagas);

export default store;
