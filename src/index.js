import './sass/index.scss';
import './pages/Mini-projects';

import Perf from 'react-addons-perf'

window.Perf = Perf;

import React from 'react';
import ReactDOM from 'react-dom';
import {Router, browserHistory, RouterContext, hashHistory} from 'react-router';
import {Provider} from 'react-redux';
import 'whatwg-fetch';

import routes from './routes';
import store from './store';

const createElement = (Component, props) => {
    // console.log(Component, props);
    return <Component {...props} />
};

util.setTitle(__TITLE__);

var pathHistory = [];

browserHistory.listen(function(ev) {
    console.log('listen', ev);

});

ReactDOM.render(
    <Provider store={store}>
        <Router history={__DEV__ ? browserHistory : hashHistory} routes={routes} createElement={createElement} render={props => {
            return <RouterContext {...props}/>
        }}>
            {/**或者将routes当作chilren插入也可以 */}
            {/*routes*/}
            {/*这里的注释只能这样写，//这种方式的注释会报错*/}
        </Router>
    </Provider>,
    document.getElementById('container')
);


/**
 * componentDidMount
 * Invoked when the component has been mounted and has a DOM representation.
 * However, there is no guarantee that the DOM node is in the document.
 * 
 * 下面这种情况就是，组件虽然挂载到了rootElement中，但是由于rootElement还没有被添加到document中，所以componentDidMount执行过后，
 * 并不能保证组件的DOM元素就已经在document中
 */

class MyComponent extends React.Component{
    componentDidMount() {
        console.log('componentRootElement', this.componentRootElement);
    }
    render() {
        return <div ref={ref => this.componentRootElement = ref}>my component</div>
    }
}

const rootElement = document.createElement('div');
ReactDOM.render(<MyComponent/>, rootElement);
