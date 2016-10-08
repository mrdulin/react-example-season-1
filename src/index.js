import './sass/index.scss';
import './pages/Mini-projects';

import React from 'react';
import ReactDOM from 'react-dom';
import {Router, browserHistory, RouterContext, hashHistory} from 'react-router';
import {Provider} from 'react-redux';
import 'whatwg-fetch';

import routes from './routes';
import store from './store';

import {IntlProvider, addLocaleData} from 'react-intl';
import en from 'react-intl/locale-data/en';
import zh from 'react-intl/locale-data/zh';
import en_US from './pages/Mini-projects/i18n/lang/en_US';
import zh_CN from './pages/Mini-projects/i18n/lang/zh_CN';

addLocaleData([...en, ...zh]);

const createElement = (Component, props) => {
    // console.log(Component, props);
    return <Component {...props} />
}

util.setTitle(__TITLE__);

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