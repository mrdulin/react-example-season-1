const META_DATA = {
  "items": {
    "react-demos": {
      "send-ajax-within-constructor-of-component": "在React组件的constructor中发起Ajax请求",
      "ways-of-function-bind-within-component": "React组件类中函数绑定的方式",
      "component-with-es5-es6-es7-syntax": "ES5-ES6-ES7语法下React组件的各自写法",
      "dynamic-inline-style": "React组件动态设置行内样式",
      "ref": "React组件的ref属性",
      "SFC": "React无状态组件",
      "children-of-component-props": "React组件包含子元素探究——this.props.children",
      "inherit-of-component": "React组件继承",
      "iterate-children-and-set-childen-css-style": "设置this.props.children遍历出的每个ReactElement的样式",
      "insert-an-element-on-mouseover": "当鼠标悬浮在一个元素上时，插入一个元素",
      "render-jsx-array": "渲染JSX数组",
      "communication-between-components": "React组件间通信",
      "filter-bar": "React实现的筛选条",
      'count-down': "React实现的倒计时",
      "get-child-component-state": "在父组件中获取子组件的state",
      "form-control": "React表单控件",
      'createClass': 'React.createClass-创建一个组件',
      'createElement': 'React.createElement用法',
      'initialize-props-and-state': '初始化组件的props和state',
      'lifecycle-methods-of-component': '组件生命周期方法初探',
      'escape': '使用dangerouslySetInnerHTML属性对插入的内容进行转义',
      'call-setState-multiple-times': '在不同的位置多次调用setState，测试组件的render次数',
      'pureComponent': 'React.PureComponent测试',
      'setState-in-componentWillMount': 'componentWillMount中异步请求回调函数中调用setState',
      "static-method-in-component-class": "React组件中的静态方法",
      'cancel-fetch-data-when-componentWillUnmount': '在组件componentWillUnmount时取消请求',
      'component-namespace': 'React组件命名空间',
      'react-children': 'React.Children用法',
      "HOC": "高阶组件",
      "download-all": "React实现的\"下载全部\"的例子",
      "logical-operators": "逻辑运算符插值探究",
      "horizontal-infinite-scroll": "React实现的水平无缝滚动",
      "composable-component": "复合组件",
      'nested-component': '组件嵌套',
      "pass-async-data-to-child-component": "组件获取异步数据更新问题",
      'immutable-helper': '使用immutable-helper进行数据更新',
      'renderToStaticMarkup': 'ReactDOMServer.renderToStaticMarkup初探',
      'spread-oprator-with-props': '使用spread操作符给组件props传递属性',
      'tree': 'React实现简单的tree',
      'replace-img-src-within-component': '替换组件内部包含的img标签的src',
      'component-instantiate-once': '组件只实例化一次',
      'ios-scroll-event-block-js-thread': "移动端ios设备滚动事件阻塞JS线程",
      "mobile-input-focus-vistual-keybroad": "移动设备路由切换时设置input聚焦，唤起虚拟键盘",
      "set-modal-window-position-on-input-focus": "移动端模态框中input聚焦虚拟键盘弹出后，重新设置模态框位置",
      'dynamic-jsx': '动态jsx标签',
      'scroll-top': 'scrollTop测试',
      "scroll-end-event": "移动端常用的水平滚动",
      "componentDidUpdate-input-focus": "input的onBlur, onFocus事件与删除按钮的onMouseDown，onClick事件的触发的先后顺序。",
      'mobile-fixed-layout': '移动端fixed布局'
    },
    "react-router-demos": {
      'get-each-type-parameters': "获取url上的各种参数",
      "router-will-leave": "路由跳转前确认",
      "navigate": "路由跳转的N种方法",
      "createPath": "react-router的createPath方法",
      "event-listen": "路由事件监听",
      "tab": "react-router实现标签页效果",
      "crumb": "react-router实现面包屑效果"
    },
    "redux": {
      'redux-beginning': 'redux初探',
      'create-store-in-component-compare-with-connect-state': '在component中createStore，并与connect注入的store比较',
      "check-data-in-state-and-new-createStore-state-is-same-when-dispatch-action": "当dispatch一个action修改state树上的数据后，检查通过connect注入的现有state树上的数据和通过createStore新创建state的数据是否同步修改"
    },
    "react-redux": {
      "init-store-data-in-componentWillMount-when-go-back": "在componentWillMount中初始化state树问题",
      "define-redux-state-data-structure": "定义redux的state树的数据结构，避免组件在render的时候出错(一个天气查询例子)",
      "map-state-to-props": "mapStateToProps探究",
      "inject-action-creators-to-component-props": "向组件的props注入action creators",
      "map-dispatch-to-props": "mapDispatchToProps探究",
      "change-state-reference-type-data": "直接修改state树上引用类型数据的某个字段的值",
      "async-action-in-componentWillReceiveProps": "在componentWillReceiveProps中进行dispatch异步action，各项数据引用一致性探究",
      "auto-complete-page": "一个搜索下拉列表的例子",
      "es6-component-inherit-es5-component": "es6写法的组件能否继承es5写法的组件",
      "connect-multiple-nested-components": "connect多层嵌套组件, 观察各个组件的render次数",
      "inject-state-to-es5-component-mixins": "HOC connect 可以注入store到mixins的方法中",
      "test-api-middleware": "测试自定义api中间件"
    },
    "react-dom-demos": {
      "call-react-dom-render-in-parent-component": "在父组件的componentDidMount生命周期内使用ReactDOM.render渲染子组件"
    },
    "mini-projects": {
      "adorable-avatar": "Adorable Avatars —— Generate random cartoon avatars",
      "file-io": "file.io —— Ephemeral file sharing Convenient, anonymous and secure",
      "todoList": "TodoList",
      "i18n": "React 国际化",
      "mini-app": '迷你应用',
      "hack": 'github hack'
    }
  }
};

const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const loadMetaData = (dirname, excludes = []) => {
  if (!dirname || !META_DATA.items[dirname]) return [];
  const keyMap = META_DATA.items[dirname];
  dirname = capitalizeFirstLetter(dirname);
  const mods = Object.keys(keyMap).map((key) => {
    const isFound = excludes.indexOf(key) !== -1;
    if (!isFound) {
      return {
        filepath: `${dirname}/${key}`,
        routePath: key
      };
    }
  }).filter(x => x);
  return mods;
};

export {
  META_DATA,
  loadMetaData
};
