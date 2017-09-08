import React, { Component } from 'react';
import Child from './child';

class Parent extends Component {

  componentDidMount() {
    //拿到的是子组件的类的实例
    console.log(this._childComponentInstance);
    this._childComponentInstance.method1();
    this._childComponentInstance.method2();
  }

  render() {
    return <div>
      parent component
        <Child ref={ref => this._childComponentInstance = ref}></Child>
      {/*<Child ref='child'></Child>*/}
    </div>
  }
}

export default Parent;

