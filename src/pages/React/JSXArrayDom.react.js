import React, {Component} from 'react';
import createFragment from 'react-addons-create-fragment';
import update from 'immutability-helper';

const SC = () => (
  <p>sc</p>
)

class CA extends Component {
  componentDidMount() {
    console.log('CA mounted');
  }

  componentWillUnmount() {
    console.log('CA unmounted');
  }

  render() {
    return <div>CA</div>
  }
}

class CB extends Component {
  componentDidMount() {
    console.log('CB mounted');
  }

  componentWillUnmount() {
    console.log('CB unmounted');
  }

  render() {
    return <div>CB</div>
  }
}

class JSXArrayDom extends Component {
  constructor() {
    super();
    this.state = {
      change1: false,
      change2: false
    }
  }

  _reorderChilren() {
    this.setState(update(this.state, {
      change1: {$set: !this.state.change1}
    }))
  }

  _reorderChildren2() {
    this.setState(update(this.state, {
      change2: {$set: !this.state.change2}
    }))
  }

  render() {
    //Warning: Each child in an array or iterator should have a unique "key" prop. Check the render method of `ArrayDom`. See https://fb.me/react-warning-keys for more information.
    const doms = [
      <p>下楼取快递，在A座</p>,
      <p>地狱之轮</p>,
      <p>优化代码</p>
    ];

    const arr = [];
    const arr2 = [];

    const Coun = <div>2<SC></SC></div>;
    const Coua = <div>1<SC></SC></div>;
    arr.push(Coun, Coua);
    arr2.push(SC, SC);
    console.log(arr, arr2)
    //数组中包含一组组件
    //如果要排序，直接操作数组中组件的顺序，会触发组件的mount和unmount，这可能不是我们想要的
    let children;
    if (this.state.change1) {
      children = [<CA></CA>, <CB></CB>];
    } else {
      children = [<CB></CB>, <CA></CA>];
    }
    console.log(children);

    //使用react-addons-create-fragment可以解决这个问题
    let children2;
    if (this.state.change2) {
      children2 = createFragment({
        'ca': <CA></CA>,
        'cb': <CB></CB>
      });
    } else {
      children2 = createFragment({
        'cb': <CB></CB>,
        'ca': <CA></CA>
      })
    }
    return <div>
      {doms}
      {arr.map(c => c)}
      <p>children</p>
      {children}
      <p>children2</p>
      {children2}
      <button type="button" onClick={() => this._reorderChilren()}>重新排序children中的组件</button>
      <button type="button" onClick={() => this._reorderChildren2()}>重新排序children中的组件</button>
    </div>
  }
}

export default JSXArrayDom;
