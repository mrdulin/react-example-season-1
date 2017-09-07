export default class extends React.Component {
  static propTypes = {
    name: React.PropTypes.string
  }
  static defaultProps = {
    name: 'react',
    cities: {
      sh: '上海',
      hz: '杭州',
      sz: '深圳',
      gz: '广州'
    },
    visiable: true
  }
  constructor(props) {
    super(props);

    this.state = {
      cool: false,
      city: ''
    };

    this.handleClick = e => {
      this.setState({ cool: !this.state.cool });
    };

    this.handleCityChange = e => {
      this.setState({ city: e.target.value });
    };

    this.handleCitySumit = e => {
      e.preventDefault();
      alert(this.citySubmitMessage);
    };
  }
  get citySubmitMessage() {
    let msg = '';
    if (this.state.city) {
      msg = '你选择的城市是:' + this.props.cities[this.state.city];
    } else {
      msg = '你还没有选择城市';
    }
    return msg;
  }
  get message() {
    return this.state.cool ? ' is cool' : '';
  }

  get content() {
    return this.props.visiable ? <p>测试getter函数能否访问props</p> : null;
  }
  render() {
    const { cities } = this.props;

    return <div>
      <button onClick={this.handleClick}>cool</button>
      <p>{this.props.name}{this.message}</p>
      <br />
      <form onSubmit={this.handleCitySumit}>
        <select name="city" value={this.state.city} onChange={this.handleCityChange}>
          <option value="">-- 请选择城市 --</option>
          {
            Object.keys(cities).map((key, index) => {
              return <option value={key} key={index}>{cities[key]}</option>
            })
          }
        </select>
        <input type="submit" value='提交' />
      </form>
      {this.content}
    </div>
  }
}
