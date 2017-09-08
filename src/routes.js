import React from 'react';
import { Route, IndexRoute, IndexRedirect } from 'react-router';

//各个demo页面component
import App from './pages/App/App.react';
import Sidebar from './pages/App/Sidebar.react';
import Main from './pages/App/Main.react';
import NoMatch from './pages/App/NoMatch.react';
import ArticleList from './pages/App/ArticleList/index.jsx';
//react

//react-router
import GetEveryTypeParams from './pages/React-router/GetEveryTypeParams.react';
import RouterWillLeave from './pages/React-router/RouterWillLeave.react';
import TransitionToAllWays from './pages/React-router/TransitionToAllWays.react';
import NamesComponent from './pages/React-router/NamesComponent.react';
import CreatePath from './pages/React-router/CreatePath.react';
import ListenEvent from './pages/React-router/ListenEvent.react';
import Tab from './pages/React-router/Tab/index';

//redux
import ReduxBeginning from './pages/Redux/ReduxBeginning.react';
import CreateStoreInComponentCompareWithConnectState from './pages/Redux/CreateStoreInComponentCompareWithConnectState.react';
import CheckDataInStateAndNewCreateStoreStateIsSameWhenDispatchAction from './pages/Redux/CheckDataInStateAndNewCreateStoreStateIsSameWhenDispatchAction.react';
//react-redux
import InitReduxStateTreeDataInComponentWillMount from './pages/React-redux/InitReduxStateTreeDataInComponentWillMount.react';
import DefineReduxStateDataStructure from './pages/React-redux/DefineReduxStateDataStructure.react';
import MapStateToProps from './pages/React-redux/MapStateToProps/MapStateToProps.react';
import InjectActionCreatorsToComponentProps from './pages/React-redux/InjectActionCreatorsToComponentProps.react';
import MapDispatchToProps from './pages/React-redux/MapDispatchToProps.react';
import ChangeStateTreeRefData from './pages/React-redux/ChangeStateTreeRefData.react';
import AsyncActionInComponentWillReceiveProps from './pages/React-redux/AsyncActionInComponentWillReceiveProps.react';
import AutoCompletePage from './pages/React-redux/AutoComplete';
import Es6ComponentInheritEs5Component from './pages/React-redux/Es6ComponentInheritEs5Component.react';
import ConnectMultipleNestedComponents from './pages/React-redux/ConnectMultipleNestedComponents';
import InjectStateToEs5ComponentMixins from './pages/React-redux/InjectStateToEs5ComponentMixins.react';
import TestApiMiddleware from './pages/React-redux/TestApiMiddleware.react';

//react-dom
import CallReactDOMRenderInParentComponent from './pages/React-dom/CallReactDOMRenderInParentComponent.react';

//redux-saga
import ReduxSagaBeginnning from './pages/Redux-saga/Beginning';

//mini-projects
import AdorableAvatars from './pages/Mini-projects/AdorableAvatars/AdorableAvatars.react';
import FileIO from './pages/Mini-projects/FileIO/FileIO.react';
import TodoList from './pages/Mini-projects/TodoList/TodoList.react';
import i18n from './pages/Mini-projects/i18n/i18n.react';
import MiniApp from './pages/Mini-projects/mini-app/app.jsx';
import { Hack, HackDetail, HackList, HackUser } from './pages/Mini-projects/hack/';

//待整理例子
import ReduxAPIMiddleware from './pages/ReduxAPIMiddleware.react';

import { loadMetaData } from './metadata';

const loadComponent = (name) => {
  let componentClass;
  try {
    componentClass = require(`./pages/${name}/index.js`);
  } catch (e) {
    componentClass = require(`./pages/${name}/index.jsx`);
  }
  return componentClass;
};

//路由规则
const routes = (
  //导航首页，导航到各个demo页面
  <Route path='/' component={App}>
    <IndexRedirect to='/react' />
    <Route path='react' components={{ sidebar: Sidebar, main: Main }}>
      <IndexRoute component={ArticleList} />
      {
        loadMetaData('react-demos').map((name, idx) => {
          const names = name.split('/');
          const path = names[names.length - 1];
          return <Route path={path} key={idx} component={loadComponent(name)} />
        })
      }
    </Route>
    <Route path='react-dom' components={{ sidebar: Sidebar, main: Main }}>
      <IndexRoute component={ArticleList} />
      <Route path='call-react-dom-render-in-parent-component' component={CallReactDOMRenderInParentComponent} />
    </Route>
    <Route path='react-router' components={{ sidebar: Sidebar, main: Main }}>
      <IndexRoute component={ArticleList} />
      <Route path='get-every-type-params(/:page)' component={GetEveryTypeParams}></Route>
      <Route path='router-will-leave' component={RouterWillLeave}></Route>
      <Route path='transition-to-all-ways' component={TransitionToAllWays}></Route>
      <Route path='create-path' component={CreatePath} />
      <Route path='listen-event' component={ListenEvent} />
      <Route path='tab' component={Tab}>
        <Route path='page1' component={require('./pages/React-router/Tab/pages/PageOne')}></Route>
        <Route path='page2' component={require('./pages/React-router/Tab/pages/PageTwo')}></Route>
        <Route path='page3' component={require('./pages/React-router/Tab/pages/PageThree')}></Route>
      </Route>
      <Route path="crumb" component={require('./pages/React-router/Crumb')}>
        <Route name='RouteName1' path='level1' component={require('./pages/React-router/Crumb/pages/PageOne')}>
          <Route name="RouteName2" path="level2" component={require('./pages/React-router/Crumb/pages/PageTwo')}>
            <Route name="RouteName3" path='level3' component={require('./pages/React-router/Crumb/pages/PageThree')}></Route>
          </Route>
        </Route>
      </Route>
    </Route>
    <Route path='redux' components={{ sidebar: Sidebar, main: Main }}>
      <IndexRoute component={ArticleList} />
      <Route path='redux-beginning' component={ReduxBeginning} />
      <Route path='create-store-in-component-compare-with-connect-state'
        component={CreateStoreInComponentCompareWithConnectState} />
      <Route path='check-data-in-state-and-new-createStore-state-is-same-when-dispatch-action'
        component={CheckDataInStateAndNewCreateStoreStateIsSameWhenDispatchAction} />
    </Route>
    <Route path='react-redux' components={{ sidebar: Sidebar, main: Main }}>
      <IndexRoute component={ArticleList} />
      <Route path="init-store-data-in-componentWillMount-when-go-back"
        component={InitReduxStateTreeDataInComponentWillMount}></Route>
      <Route path='define-redux-state-data-structure' component={DefineReduxStateDataStructure}></Route>
      <Route path='map-state-to-props' component={MapStateToProps}></Route>
      <Route path='inject-action-creators-to-component-props'
        component={InjectActionCreatorsToComponentProps}></Route>
      <Route path='map-dispatch-to-props' component={MapDispatchToProps}></Route>
      <Route path='change-state-reference-type-data' component={ChangeStateTreeRefData}></Route>
      <Route path='async-action-in-componentWillReceiveProps'
        component={AsyncActionInComponentWillReceiveProps}></Route>
      <Route path='auto-complete-page' component={AutoCompletePage} />
      <Route path='es6-component-inherit-es5-component' component={Es6ComponentInheritEs5Component}></Route>
      <Route path='connect-multiple-nested-components' component={ConnectMultipleNestedComponents} />
      <Route path='inject-state-to-es5-component-mixins' component={InjectStateToEs5ComponentMixins} />
      <Route path='test-api-middleware' component={TestApiMiddleware} />
    </Route>
    <Route path='redux-saga' components={{ sidebar: Sidebar, main: Main }}>
      <IndexRoute component={ArticleList} />
      <Route path='beginning' component={ReduxSagaBeginnning}></Route>
    </Route>
    <Route path='mini-projects' components={{ sidebar: Sidebar, main: Main }}>
      <IndexRoute component={ArticleList} />
      <Route path='adorable-avatar' component={AdorableAvatars}></Route>
      <Route path='file-io' component={FileIO}></Route>
      <Route path='todoList' component={TodoList}></Route>
      <Route path='i18n' component={i18n} />
      <Route path='mini-app' component={MiniApp}></Route>
      <Route path="hack" component={Hack}>
        <IndexRoute component={HackList} />
        <Route path="detail/:repo" component={HackDetail} />
        <Route path="user/:username" component={HackUser}></Route>
      </Route>
    </Route>

    <Route path='redux-api-middware' component={ReduxAPIMiddleware}></Route>

    <Route path='*' component={NoMatch}></Route>
  </Route>
);

//路由改造: 一，JS原始对象的形式,同步加载方式
// const routes = {
//     path: '/',
//     component: App,
//     childRoutes: [
//         {path: 'table', component: Table},
//         {path: 'form', component: Form}
//     ]
// };

//路由改造：二，同步加载方式，不同于改造前静态import, 静态import，打包后的代码要马上执行很多__webpack_require__(moduleid),
// 改造后，代码打包后的__webpack_require__(moduleid)不执行，而是延后到具体路由加载的时候执行
//打包的js文件没有[id].chunk.js，还是一次性将所有代码打包到一个文件，所以下载也是下载整个bundle文件，这点和异步加载生成单独chunk.js文件的方式不同。

// import App from './pages/App.react';
// const routes = {
//     path: '/',
//     component: App,
//     childRoutes: [
//         {
//             path: 'table',
//             getComponent: (nextState, cb) => {
//                 const tableComponent = require('./pages/Table.react');
//                 cb(null, tableComponent);
//             }
//         },
//         {
//             path: 'Form',
//             getComponent: (nextState, cb) => cb(null, require('./pages/Form.react'))
//         }
//     ]
// }

//路由改造：三，异步加载方式，每个异步加载的模块生成单独的[id].chunk.js，根据路由动态加载（向服务器请求并下载）该模块的路由和组件文件(chunk.js)
// import App from './pages/App.react';
// const routes = {
//     path: '/',
//     component: App,
//     getChildRoutes(partialNextState, cb) {
//         //partialNextState是react-router的Link的{pathname, query, state}中的state
//         //使用partialNextState做一些逻辑处理，决定加载哪个route
//         require.ensure([], require => {
//             const tableRoute = require('./routes/Table');
//             cb(null, [
//                 tableRoute,
//                 require('./routes/Form')
//             ]);
//         })
//     }
// }


export default routes;
