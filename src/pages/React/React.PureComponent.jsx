class Item extends React.PureComponent {
  static propTypes = {
    item: React.PropTypes.number.isRequired
  }
  render() {
    console.count('item render');
    return <div>
      {this.props.item}
    </div>
  }
}

export default class extends React.PureComponent {
  state = {
    items: []
  }
  componentDidMount() {
    this._isMounted = true;
    this.fetchData().then(data => {
      if (this._isMounted) {
        this.setState((prevState, props) => ({ items: prevState.items.concat(data) }));
      }
    });
  }
  fetchData() {
    return new Promise((resolve, reject) => {
      this.timeoutId = setTimeout(() => {
        resolve([1, 2, 3, 4, 5]);
      }, 2000);
    });
  }
  componentWillUnmount() {
    this._isMounted = false;
    if (this.timeoutId) {
      clearInterval(this.timeoutId);
    }
  }

  handleClick() {
    this.fetchData().then(data => {
      if (this._isMounted) {
        this.setState((prevState, props) => ({ items: prevState.items.concat(data) }));
      }
    });
  }
  render() {
    const { items } = this.state;
    const itemNodes = items.map((item, index) => {
      return <Item key={index} item={item}></Item>
    })
    return <div>
      <button onClick={() => this.handleClick()}>fetch data</button>
      <p>React.PureComponent几点说明：</p>
      <ul>
        <li>浅比较</li>
        <li>实现了shouldComponentUpdate方法，有助于提升性能</li>
        <li>React 15.3.0 添加了该方法</li>
      </ul>
      <div>{itemNodes}</div>
    </div>

  }
}
