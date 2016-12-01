/**
 * @desc  
 * 操作：进入当前页面，然后导航到其他页面，这时候异步数据返回，this.setState报如下错误。
 * Warning: setState(...): Can only update a mounted or mounting component. This usually means you called setState() on an unmounted component. 
 * This is a no-op. Please check the code for the _class2 component.
 * 
 * isMounted方法，用来判断组件挂载与否。但这个方法是一个反模式。已经被弃用。
 * 在一个已经卸载的组件上调用setState()方法意味着应用仍然对这个组件保持着引用，会导致内存泄露。
 * 
 * 下面的例子就是组件在异步请求响应前被卸载，响应回来后，调用setState()方法的例子
 * 
 */
// export default class extends React.Component{
//     state = {
//         data: ''
//     }
//     componentDidMount() {
//         this.fetchData().then(data => {
//             this.setState({data});
//         })
//     }
//     fetchData() {
//         return new Promise((resolve, reject) => {
//             setTimeout(() => {
//                 resolve('server data');
//             }, 5000);
//         })
//     }
//     render() {
//         return <div>
//             <h3>组件在异步请求响应回来前被卸载</h3>
//             {this.state.data}
//         </div>
//     }
// }


/**
 * 解决方案1：使用自定义变量来判断标志组件是否被卸载
 */
// export default class extends React.Component{
//     state = {
//         data: ''
//     }
//     componentDidMount() {
//         this._isMounted = true;
//         this.fetchData().then(data => {
//             if(this._isMounted) {
//                 this.setState({data});
//             }
//         })
//     }
//     componentWillUnmount() {
//         this._isMounted = false;
//     }
//     fetchData() {
//         return new Promise((resolve, reject) => {
//             setTimeout(() => {
//                 resolve('server data');
//             }, 5000);
//         })
//     }
//     render() {
//         return <div>
//             <h3>组件在异步请求响应回来前被卸载</h3>
//             {this.state.data}
//         </div>
//     }
// }

/**
 * 解决方案2: 使用cancelable promise
 */
export default class extends React.Component{
    state = {
        data: ''
    }
    componentDidMount() {
        this._fetchDataPromise = util.makeCancelable(this.fetchData());
        
        this._fetchDataPromise.promise.then(data => {
            this.setState({data});
        }).catch(err => {
            console.log('isCanceled', err.isCanceled);
            // throw new Error();
        })
    }
    fetchData() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve('server data');
            }, 5000);
        })
    }
    componentWillUnmount() {
        this._fetchDataPromise.cancel();
    }
    render() {
        return <div>
            <h3>组件在异步请求响应回来前被卸载</h3>
            {this.state.data}
        </div>
    }
}

