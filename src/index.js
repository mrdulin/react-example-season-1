import Perf from 'react-addons-perf'
window.Perf = Perf;
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, browserHistory, RouterContext, hashHistory } from 'react-router';
import { Provider } from 'react-redux';
import 'whatwg-fetch';

import './sass/index.scss';

import AppRoute from './routes';
import store from './store';

util.setTitle(__TITLE__);

browserHistory.listen(function (ev) {
  console.log('listen', ev);
});

ReactDOM.render(
  <Provider store={store}>
    <Router history={__DEV__ ? browserHistory : hashHistory}
      createElement={(Component, props) => {
        // console.log(Component, props);
        return <Component {...props} />
      }}
      render={props => {
        return <RouterContext {...props} />
      }}>

      {AppRoute}
    </Router>
  </Provider>,
  document.getElementById('container'),
  (...args) => {
    console.log('ReactDOM.render callback', ...args);
  }
);

/**
 * componentDidMount
 * Invoked when the component has been mounted and has a DOM representation.
 * However, there is no guarantee that the DOM node is in the document.
 *
 * 下面这种情况就是，组件虽然挂载到了rootElement中，但是由于rootElement还没有被添加到document中，所以componentDidMount执行过后，
 * 并不能保证组件的DOM元素就已经在document中
 */

class MyComponent extends React.Component {
  componentDidMount() {
    console.log('componentRootElement', this.componentRootElement);   //<div data-reactroot="" id="my-component">my component</div>

    const componentRootElement = document.getElementById('my-component');
    console.log('componentRootElement', componentRootElement);  //null
  }

  render() {
    return <div id='my-component' ref={ref => this.componentRootElement = ref}>my component</div>
  }
}

const rootElement = document.createElement('div');
ReactDOM.render(<MyComponent />, rootElement);
