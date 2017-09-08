import React, { Component } from 'react';
import Child from './child';

class GrabChildComponentState extends Component {

  constructor() {
    super();
    this.childRef = null;
  }

  componentDidMount() {
    // console.log('getChildState', this.getChildState);
    const childState = this.getChildState();
    //do something with childRef's state
    const childFns = this.getChildFns();
    // console.log(childFns);
    childFns.fn1();
    childFns.fn2();
    console.log(this.childRef);
    console.log(this.childRef.state === childState);    //true
    console.log(this.childRef.setState === childFns.setState);    //true
    setTimeout(() => {
      this.GrabStateByParentComponent.setState({ name: 'WTF' });
      //下面报错
      // childFns.setState({name: 'WTF'});
      childFns.setState = this.childRef::childFns.setState;
      childFns.setState({ job: 'fuck off' });
    }, 2000);
  }

  render() {
    return <div>
      <Child ref={ins => this.childRef = ins} getChildState={fn => this.getChildState = fn}
        getChildFns={fns => this.getChildFns = fns} />
    </div>
  }
}

export default GrabChildComponentState;
