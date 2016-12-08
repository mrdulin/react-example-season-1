export default class extends React.Component{
    state = {
        key1: '',
        key2: '',
        key3: '',
        test: 0
    }
    componentWillMount() {
        setTimeout(() => {
            this.setState({key1: '1'});
            this.setState({key2: '2'});
            this.setState({key3: '3'});
        }, 2000) 
    }
    componentDidMount() {
        document.getElementById('fuck-btn').addEventListener('click', e => {
            this.setState({key1: '1'});
            this.setState({key2: '2'});
            this.setState({key3: '3'});
        }, false);
    }
    componentDidUpdate(prevProps, prevState) {
        if(this.state.test) {
            this.setState({key1: '4'});
            this.setState({key2: '5'});
            this.setState({key3: '6'});
            this.setState({test: 0});
        }
    }
    render() {
        console.count('render count');
        return <div>
            <p>测试：在不同情况下多次调用setState，组件render次数.</p>
            <p>结论：在react合成事件(onClick)或者生命周期方法内多次调用setState，react会等方法执行完后，调用render方法一次。</p>
            <p>但是在异步操作方法，原生事件方法中多次调用setState，react会调用render多次。</p>
            <button onClick={() => this.handleClick()} type='button'>多次调用setState</button>
            <button onClick={() => this.reset()}>重置</button>
            <button id='fuck-btn'>绑定原生事件的button</button>
            <ul>
                {
                    Object.keys(this.state).map((key,index) => {
                        return <li key={index}>{this.state[key]}</li>
                    })
                }
            </ul>
        </div>
    }
    handleClick() {
        this.setState({key1: '1'});
        this.setState({key2: '2'});
        this.setState({key3: '3'});
    }

    reset() {
        this.setState({
            key1: '',
            key2: '',
            key3: '',
            test: 1
        })
    }
}