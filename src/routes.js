import React from 'react';
import { Route, IndexRoute, IndexRedirect } from 'react-router';
import { compose } from 'redux';

import { loadMetaData } from './metadata';

import App from './pages/App/App';
import Sidebar from './pages/App/Sidebar';
import Main from './pages/App/Main';
import NoMatch from './pages/App/NoMatch';
import ArticleList from './pages/App/ArticleList/index';

import Tab, { One, Two, Three } from './pages/React-router-demos/tab';
import BreadCrumb, { CrumbOne, CrumbTwo, CrumbThree } from './pages/React-router-demos/crumb';
import { Hack, HackDetail, HackList, HackUser } from './pages/Mini-projects/hack';

const loadComponent = (name) => {
  let componentClass = null;
  try {
    componentClass = require(`./pages/${name}/index.js`);
  } catch (e) {
    componentClass = require(`./pages/${name}/index.jsx`);
  }
  return componentClass;
};
const createRoute = (indexRouteComponent) => (mods) => {
  const routes = mods.map((mod, idx) => <Route path={mod.routePath} key={idx} component={loadComponent(mod.filepath)} />)
  routes.unshift(<IndexRoute key='indexRoute' component={indexRouteComponent} />)
  return routes;
}
const loadRoute = compose(createRoute(ArticleList), loadMetaData);
const layoutNamedComponent = { sidebar: Sidebar, main: Main };

const AppRoute = (
  <Route path='/' component={App}>
    <IndexRedirect to='/react-demos' />

    <Route path='react-demos' components={layoutNamedComponent}>
      {loadRoute('react-demos')}
    </Route>

    <Route path='react-dom-demos' components={layoutNamedComponent}>
      {loadRoute('react-dom-demos')}
    </Route>

    <Route path='react-router-demos' components={layoutNamedComponent}>
      {loadRoute('react-router-demos', ['tab', 'crumb'])}
      <Route path='tab' component={Tab}>
        <Route path='page1' component={One} />
        <Route path='page2' component={Two} />
        <Route path='page3' component={Three} />
      </Route>
      <Route path="crumb" component={BreadCrumb}>
        <Route name='RouteName1' path='level1' component={CrumbOne}>
          <Route name="RouteName2" path="level2" component={CrumbTwo}>
            <Route name="RouteName3" path='level3' component={CrumbThree}></Route>
          </Route>
        </Route>
      </Route>
    </Route>

    <Route path='redux' components={layoutNamedComponent}>
      {loadRoute('redux')}
    </Route>

    <Route path='react-redux-demos' components={layoutNamedComponent}>
      {loadRoute('react-redux-demos')}
    </Route>

    <Route path='mini-projects' components={layoutNamedComponent}>
      {loadRoute('mini-projects', ['hack'])}
      <Route path="hack" component={Hack}>
        <IndexRoute component={HackList} />
        <Route path="detail/:repo" component={HackDetail} />
        <Route path="user/:username" component={HackUser}></Route>
      </Route>
    </Route>

    <Route path='*' component={NoMatch}></Route>
  </Route>
)
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


export default AppRoute;
