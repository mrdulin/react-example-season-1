/*import React, {Component} from 'react';

class AComponent extends Component{
    constructor() {
        super();
        this.handleClick = ::this.handleClick;
        this.state = {message: ''}
    }
    render() {
        console.count('AComponent render')
        return <div style={{border: '1px solid red', margin: '20px'}}>
            <p>A component {this.state.message}</p>
            <BComponent onClick={this.handleClick}></BComponent>
        </div>
    }

    handleClick(data) {
        const {onClick} = this.props;
        this.setState({message: data.messageA});
        //中间层组件产生的额外的数据，一并返回给顶层组件
        const dataExt = {
            ext: 'css is awesome'
        }
        onClick && onClick(Object.assign({}, data, dataExt));
    }
}

class BComponent extends Component{
    constructor() {
        super();
        this.handleClick = ::this.handleClick;
        this.state = {message: ''}
    }
    render() {
        console.count('BComponent render')
        return <div style={{border: '1px solid blue', margin: '20px'}}>
            <p>B component {this.state.message}</p>
            <button type='button' onClick={this.handleClick}>emit</button>
        </div>
    }

    handleClick(e) {
        const {onClick} = this.props;
        const data = {
            messageA: 'react is awesome',
            messageB: 'angular is awesome',
            message: 'jquery is awesome'
        }
        this.setState({message: data.messageB});
        onClick && onClick(data);
    }
}

class ComponentCommunication extends Component{
    constructor() {
        super();
        this.handleClick = ::this.handleClick;
        this.state = {message : '', ext: ''};
    }
    render() {
        console.count('ComponentCommunication render')
        return <div style={{border: '1px solid green', margin: '20px'}}>
            <p>container component {this.state.message}</p>
            <p>ext: {this.state.ext}</p>
            <AComponent onClick={this.handleClick}></AComponent>
        </div>
    }

    handleClick(data) {
        this.setState({message: data.message, ext: data.ext});
    }
}

export default ComponentCommunication;

*/

// 直属父子组件间通信

// 1.
class A extends React.Component {
  static defaultProps = {
    name: 'react',
    onClick: () => {}
  };
  handleClick = (e) => {
    const {onClick, name} = this.props;
    onClick(name);
  };
  render() {
    return (
      <div>
        <button type='button' onClick={this.handleClick}>A按钮</button>
      </div>
    )
  }
}

class B extends React.Component {
  state = {
    title: 'default title'
  }
  static defaultProps = {
    name: 'angular'
  };
  getName() {
    return this.props.name;
  }
  updateTitleView(title) {
    this.setState({title});
  }
  render() {
    return (
      <div>
        <h1>{this.state.title}</h1>
        <button type='button' onClick={this.handleClick}>B按钮</button>
      </div>
    )
  }
}

export default class extends React.Component {
  handleClick = (name) => {
    //拿到A组件的props上的name属性值
    console.log(name);
  };

  componentDidMount() {
    const name = this._b.getName();
    this._b.updateTitleView('汉堡王');
    console.log(name);
  }

  render() {
    return (
      <div>
        {/*通过props给A组件传递数据*/}
        <A onClick={this.handleClick} data='fxxk'/>

        <B onClick={this.handleClick} ref={ref => this._b = ref}/>
      </div>
    )
  }
}
