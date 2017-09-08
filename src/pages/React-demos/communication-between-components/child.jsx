import React, { Component } from 'react';

class Child extends Component {
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

export default Child;


