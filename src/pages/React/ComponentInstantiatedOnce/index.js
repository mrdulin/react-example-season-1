import ChildA from './ChildA';
import ChildB from './ChildB';

export default class extends React.Component{
    state = {
        showA: false,
        showB: false
    }
    render() {
        return <div>
            <ChildA show={this.state.showA}/>
            {this.state.showB ? <ChildB/> : null}
            <button type='button' onClick={::this.handleA}>handle A</button>
            <button type='button' onClick={::this.handleB}>handle B</button>
            <p>ChildA组件通过show属性控制了其实际显示的内容，仅仅实例化了一次。</p>
            <p>ChildB组件通过三目运算符来控制其是否挂载和卸载，所以，会实例化多次。</p>
            <p>两个组件经历的生命周期方法是有区别的，因此在实际项目中，使用某一种方式，需要在不同的生命周期方法里做处理。</p>
        </div>
    }

    handleA() {
        this.setState({showA: !this.state.showA});
    }

    handleB() {
        this.setState({showB: !this.state.showB});
    }
}