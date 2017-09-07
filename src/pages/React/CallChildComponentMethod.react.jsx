import React, { Component } from 'react';

class ChildComponent extends Component {
  render() {
    return <div>
      child component
        </div>
  }

  method1() {
    alert('child component method1');
  }

  method2() {
    alert('child component method2');
  }
}

class CallChildComponentMethod extends Component {

  componentDidMount() {
    //拿到的是子组件的类的实例
    console.log(this._childComponentInstance);
    this._childComponentInstance.method1();
    this._childComponentInstance.method2();
  }
  render() {
    return <div>
      parent component
            <ChildComponent ref={ref => this._childComponentInstance = ref}></ChildComponent>
      {/*<childComponent ref='child'></childComponent>*/}
    </div>
  }
}

export default CallChildComponentMethod;
