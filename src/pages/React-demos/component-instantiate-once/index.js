import React from 'react';

import ChildA from './ChildA';
import ChildB from './ChildB';
import Content from './Content';
import LoadMore from './LoadMore';

export default class extends React.Component {
  state = {
    showA: false,
    showB: false,
    contentElement: null
  }

  componentDidMount() {
    const contentElement = this.contentInstance.el;
    this.setState({contentElement});
  }

  render() {
    return <div>
      <p>例1：</p>
      <ChildA show={this.state.showA}/>
      {this.state.showB ? <ChildB/> : null}
      <button type='button' onClick={::this.handleA}>handle A</button>
      <button type='button' onClick={::this.handleB}>handle B</button>
      <p>ChildA组件通过show属性控制了其实际显示的内容，仅仅实例化了一次。</p>
      <p>ChildB组件通过三目运算符来控制其是否挂载和卸载，所以，会实例化多次。</p>
      <p>两个组件经历的生命周期方法是有区别的，因此在实际项目中，使用某一种方式，需要在不同的生命周期方法里做处理。</p>

      <p>例2：</p>
      <Content ref={ref => this.contentInstance = ref}/>
      {/*1. 直接给LoadMore组件传Content组件的实例，第一次render的时候，this.contentInstace不存在，会报错。只有Content组件挂载后，才会拿到Content组件的实例(this.contentInstance)*/}
      {/*2. 添加三木运算符判断，不报错了，但是由于父组件没有再次render，LoadMore组件并没有挂载*/}
      {/*解决方案1： 可以给父组件的state上定义一个属性，如componentDidMount中所示，让父组件再次render*/}
      {/*TODO: 寻找能避免使用state的方案*/}
      {/*解决方案2： 将Content组件作为LoadMore的children，见例3*/}
      {this.contentInstance ? <LoadMore element={this.contentInstance.el}/> : null}

      <p>例3：</p>
      <LoadMore>
        <Content ref={ref => this.contentInstance2 = ref}/>
      </LoadMore>
    </div>
  }

  handleA() {
    this.setState({showA: !this.state.showA});
  }

  handleB() {
    this.setState({showB: !this.state.showB});
  }
}
